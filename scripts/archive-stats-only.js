'use strict';

// Archive / category / tag headers: show post count (no cheers / keep_on)

const formatPostCount = (count) => (
  count === 0 ? '暂无日志。' : `目前共计 ${count} 篇日志。`
);

const normalizePath = (p) => String(p || '')
  .replace(/\\/g, '/')
  .replace(/\/page\/\d+(?=\/)/g, '')
  .replace(/\/index\.html$/, '/')
  .replace(/\/?$/, '/');

hexo.extend.filter.register('after_render:html', (html, data) => {
  const path = normalizePath(data.path || '');
  const archiveDir = normalizePath(hexo.config.archive_dir || 'archives');
  const categoryDir = normalizePath(hexo.config.category_dir || 'categories');
  const tagDir = normalizePath(hexo.config.tag_dir || 'tags');

  if (path.startsWith(archiveDir)) {
    const text = formatPostCount(hexo.locals.get('posts').length);
    return html.replace(
      /(<span class="collection-header">)[\s\S]*?(<\/span>)/,
      `$1${text}$2`
    );
  }

  // Skip taxonomy index pages (categories/, tags/)
  if (path === categoryDir || path === tagDir) return html;

  let count = null;
  if (path.startsWith(categoryDir)) {
    const item = hexo.locals.get('categories').toArray()
      .find((c) => normalizePath(c.path) === path);
    if (item) count = item.length;
  } else if (path.startsWith(tagDir)) {
    const item = hexo.locals.get('tags').toArray()
      .find((t) => normalizePath(t.path) === path);
    if (item) count = item.length;
  }

  if (count === null) return html;

  const text = formatPostCount(count);
  return html.replace(
    /(<div class="collection-title">\s*<h1 class="collection-header">)([\s\S]*?)(<\/h1>)/,
    (full, open, inner, close) => {
      if (inner.includes('collection-taxonomy-count')) return full;
      return `${open}${inner}<span class="collection-taxonomy-count">${text}</span>${close}`;
    }
  );
});

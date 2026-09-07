'use strict';

// Archive header: stats only (no cheers / keep_on)
hexo.extend.filter.register('after_render:html', (html, data) => {
  const path = data.path || '';
  if (!path.includes('archives')) return html;

  const count = hexo.locals.get('posts').length;
  const text = count === 0
    ? '暂无日志。'
    : `目前共计 ${count} 篇日志。`;

  return html.replace(
    /(<span class="collection-header">)[\s\S]*?(<\/span>)/,
    `$1${text}$2`
  );
});

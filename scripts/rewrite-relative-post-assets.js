'use strict';

/**
 * 正文可写相对资源路径（如 image/foo.svg，便于 Typora 预览）。
 * 文章 permalink 为 posts/<hash>.html 时，浏览器会把相对路径解析到 /posts/image/，
 * 因此在渲染后改写为 /posts/<hash>/image/...（与 PostAsset 输出目录一致）。
 */
hexo.extend.filter.register('after_post_render', (data) => {
  if (!data || !data.content || !data.path) return data;

  const path = String(data.path).replace(/\\/g, '/').replace(/^\//, '');
  // posts/477c80a9697e.html → /posts/477c80a9697e
  // posts/477c80a9697e/index.html → /posts/477c80a9697e
  // posts/477c80a9697e/ → /posts/477c80a9697e
  const assetRoot = `/${path
    .replace(/\/index\.html?$/i, '')
    .replace(/\.html?$/i, '')
    .replace(/\/$/, '')}`;

  data.content = data.content.replace(
    /(\s(?:src|href)=["'])(?!\/|https?:|data:|#|mailto:)((?:image|images|assets|img)\/[^"']+)(["'])/gi,
    (_, pre, rel, post) => `${pre}${assetRoot}/${rel}${post}`
  );

  return data;
});

'use strict';

/**
 * Hexo 默认把 post_asset_folder 指到与 md 同名的目录：
 *   foo.md → foo/
 *   dir/foo.md → dir/foo/
 * 对「文章与资源同目录」结构（dir/foo.md + dir/image/...，且目录名与 md 主名相同，
 * 或 dir/index.md），在生成前把 md 所在目录下的非 md 文件注册为 PostAsset。
 *
 * Windows 上 Hexo processAsset 用 path.sep（\\）去匹配多为 / 的 id，
 * 可能误挂 slug；此处以相对 md 目录的路径为准覆盖 slug。
 */
const fs = require('fs');
const path = require('path');

function listFiles(dir, base, skipDirName, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('.')) continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      // 跳过 Hexo 原生同名资源夹（dir/foo/ 或 dir/index/）
      if (skipDirName && name === skipDirName) continue;
      listFiles(full, base, skipDirName, out);
    } else if (!/\.md$/i.test(name)) {
      out.push(path.relative(base, full).replace(/\\/g, '/'));
    }
  }
  return out;
}

function toId(abs, baseDir) {
  return abs.substring(baseDir.length).replace(/\\/g, '/').replace(/^\//, '');
}

/** @returns {string|null} 同目录资源模式时返回应跳过的原生资源夹名 */
function colocatedSkipDir(src) {
  const parts = src.split('/');
  if (parts.length < 2) return null;
  const file = parts[parts.length - 1];
  const parent = parts[parts.length - 2];
  if (!/\.md$/i.test(file)) return null;
  const base = file.replace(/\.md$/i, '');
  // dir/index.md 或 dir/dir.md
  if (base === 'index' || base === parent) return base;
  return null;
}

hexo.extend.filter.register('before_generate', async () => {
  if (!hexo.config.post_asset_folder) return;

  const Post = hexo.model('Post');
  const PostAsset = hexo.model('PostAsset');
  const baseDir = hexo.base_dir;
  const sourceDir = hexo.config.source_dir;
  const sourceDirLen = sourceDir.length;

  for (const post of Post.toArray()) {
    const src = String(post.source || '').replace(/\\/g, '/');
    const skipDirName = colocatedSkipDir(src);
    if (!skipDirName) continue;

    const postDir = path.dirname(post.full_source);
    const saves = listFiles(postDir, postDir, skipDirName).map((item) => {
      const abs = path.join(postDir, item);
      const id = toId(abs, baseDir);
      const renderablePath = id.substring(sourceDirLen + 1);
      return PostAsset.save({
        _id: id,
        post: post._id,
        slug: item,
        modified: true,
        renderable: hexo.render.isRenderable(renderablePath)
      });
    });

    await Promise.all(saves);
  }
}, 100);

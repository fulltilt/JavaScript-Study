// #68. get DOM tags
/* Given a DOM tree, please return all the tag names it has.

Your function should return a unique array of tags names in lowercase, order doesn't matter.
*/
function getTags(tree) {
  if (!tree) return [];
  let tags = new Set();

  function dfs(root) {
    if (!root) return;
    tags.add(root.tagName);
    let children = Array.from(root.children);
    children.forEach((child) => dfs(child));
  }
  dfs(tree);

  return Array.from(tags);
}

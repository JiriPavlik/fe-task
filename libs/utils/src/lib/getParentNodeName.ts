export const getParentNodeName = (childname, separator = '>') => {
  let parentName = '';

  if (childname) {
    const lastSeparatorPosition = childname.lastIndexOf(separator);
    parentName =
      lastSeparatorPosition !== -1
        ? childname.slice(0, lastSeparatorPosition - 1)
        : '';
  }

  return parentName;
};

export const getRootNodeName = (childname, separator = '/') => {
  let rootNode = '';

  if (childname) {
    const lastSeparatorPosition = childname.lastIndexOf(separator);
    rootNode =
      lastSeparatorPosition !== -1
        ? childname.slice(lastSeparatorPosition + 1, childname.length)
        : childname;
  }

  return rootNode;
};

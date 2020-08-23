export const getNodeName = nodeName => {
  const name = nodeName.split('>');
  return name[name.length - 1];
};

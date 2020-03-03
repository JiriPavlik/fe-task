import { getNodeName } from './getNodeName';
import { getParentNodeName } from './getParentNodeName';

export const createTreeViewData = dataset => {
  let hashTable = {};
  dataset.forEach(item => {
    hashTable[item.name] = {
      id: item.name,
      key: `${item.name}`,
      name: getNodeName(item.name),
      value: item.size,
      children: []
    };
  });

  let dataTree = [];

  dataset.forEach(item => {
    const parentName = getParentNodeName(item.name);
    if (parentName && hashTable[parentName])
      hashTable[parentName].children.push(hashTable[item.name]);
    else dataTree.push(hashTable[item.name]);
  });
  return dataTree;
};

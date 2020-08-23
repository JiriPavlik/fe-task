import { getNodeName } from './getNodeName';
import { getParentNodeName } from './getParentNodeName';

export const createDataTree = dataset => {
  let hashTable = Object.create(null);
  dataset.forEach(item => {
    if (hashTable[item.name] === undefined) {
      hashTable[item.name] = {
        ...item,
        key: `${item.name}`,
        label: `${getNodeName(item.name)} (${item.size})`,
        nodes: []
      };
    }
  });

  let dataTree = [];

  dataset.forEach((item, index) => {
    const parentName = getParentNodeName(item.name);

    if (parentName) hashTable[parentName].nodes.push(hashTable[item.name]);
    else dataTree.push(hashTable[item.name]);
  });
  return dataTree;
};

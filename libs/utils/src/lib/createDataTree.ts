import { getNodeName } from './getNodeName';
import { getParentNodeName } from './getParentNodeName';

export const createDataTree = dataset => {
  const hashTable = Object.create(null);
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

  const dataTree = [];

  dataset.forEach(item => {
    const parentName = getParentNodeName(item.name);

    if (parentName) hashTable[parentName].nodes.push(hashTable[item.name]);
    else dataTree.push(hashTable[item.name]);
  });
  return dataTree;
};

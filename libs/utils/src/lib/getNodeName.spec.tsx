import * as cut from './getParentNodeName';

describe('getParentNodeName', () => {
  it('null childname', () => {
    expect(cut.getParentNodeName(null)).toEqual('');
  });

  it('Root node', () => {
    expect(cut.getParentNodeName('rootNode')).toEqual('');
  });

  it('Valid single level child', () => {
    expect(cut.getParentNodeName('rootNode > child')).toEqual('rootNode');
  });

  it('Valid multiple level child', () => {
    expect(
      cut.getParentNodeName('rootNode > child1 > child2 > child3')
    ).toEqual('rootNode > child1 > child2');
  });
});

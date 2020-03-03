import React from 'react';
import styled from 'styled-components';
import TreeMenu from 'react-simple-tree-menu';
import { getRootNodeName } from '@panoramic/utils';

export type TreeDataType = {
  key: string;
  label: string;
  nodes?: TreeDataType[] | [];
  onClickItem: (key: string) => void;
};

const styledTreeViewWidth = '30rem';

const StyledTreeView = styled.div`
  .rstm-toggle-icon {
    display: inline-block;
    &-symbol {
      width: 2rem;
      height: 2rem;
      text-align: center;
      line-height: 2rem;
    }
  }

  .rstm-tree-item-group {
    list-style-type: none;
    padding-left: 0;
    text-align: left;
    width: fit-content;
    min-width: ${styledTreeViewWidth};
  }

  .rstm-tree-item {
    padding: 0.5rem;
    cursor: pointer;
    color: ${props => props.theme.colors.black};
    background: none;
    border-bottom: 1px solid ${props => props.theme.colors.grey1};
    box-shadow: none;
    position: relative;

    &--active {
      color: ${props => props.theme.colors.white};
      background: ${props => props.theme.colors.primary1};
      border-bottom: none;
    }

    &--focused {
      box-shadow: 0 0 5px 0 #383838;
    }
  }

  .search {
    padding: 1rem 1rem;
    min-width: ${styledTreeViewWidth};
  }
`;

type TreeProps = {
  activeKey: string;
  data: TreeDataType[];
  onClickItem?: (obj: TreeDataType) => void;
};

export const Tree = (props: TreeProps) => {
  const { data, onClickItem } = props;

  const handleClickItem = ({ key }) => {
    const nodeName = getRootNodeName(key);
    onClickItem(nodeName);
  };

  return (
    <StyledTreeView>
      <TreeMenu
        data={data}
        disableKeyboard={true}
        onClickItem={handleClickItem}
        hasSearch={false}
      />
    </StyledTreeView>
  );
};

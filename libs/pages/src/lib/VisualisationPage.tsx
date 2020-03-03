import React, { useState } from 'react';
import styled from 'styled-components';
import { Tree } from '@panoramic/tree';
import { TreeView } from '@panoramic/charts';
import { createDataTree } from '@panoramic/utils';

/* eslint-disable-next-line */
export interface VisualisationPageProps {
  data: any;
}

const StyledVisualisationPage = styled.div`
  display: flex;
  flex-direction: row;
`;

export const VisualisationPage = (props: VisualisationPageProps) => {
  const [selected, setSelectedNode] = useState('ImageNet 2011 Fall Release');

  const handleOnItemClick = (key: string) => {
    setSelectedNode(key);
  };

  return (
    <StyledVisualisationPage>
      <Tree
        data={createDataTree(props.data)}
        onClickItem={handleOnItemClick}
        activeKey={selected}
      />
      <TreeView root={selected} />
    </StyledVisualisationPage>
  );
};

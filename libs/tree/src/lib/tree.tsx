import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface TreeProps {}

const StyledTree = styled.div`
  color: pink;
`;

export const Tree = (props: TreeProps) => {
  return (
    <StyledTree>
      <h1>Welcome to tree component!</h1>
    </StyledTree>
  );
};

export default Tree;

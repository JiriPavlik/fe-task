import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ChartsProps {}

const StyledCharts = styled.div`
  color: pink;
`;

export const Charts = (props: ChartsProps) => {
  return (
    <StyledCharts>
      <h1>Welcome to charts component!</h1>
    </StyledCharts>
  );
};

export default Charts;

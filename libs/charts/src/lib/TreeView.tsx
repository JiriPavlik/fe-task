import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';

import styled from 'styled-components';
import axios from 'axios';
import { createTreeViewData } from '@panoramic/utils';

/* eslint-disable-next-line */
export interface ChartsProps {
  root: string;
}

const StyledTreeView = styled.div``;

const getLevelOption = () => {
  return [
    {
      itemStyle: {
        borderWidth: 0,
        gapWidth: 5
      }
    },
    {
      itemStyle: {
        gapWidth: 1
      }
    },
    {
      colorSaturation: [0.35, 0.5],
      itemStyle: {
        gapWidth: 1,
        borderColorSaturation: 0.6
      }
    }
  ];
};

export const TreeView = (props: ChartsProps) => {
  const [data, setData] = useState();
  const { root } = props;

  useEffect(() => {
    axios
      .post(
        'http://localhost:4000/childrens',
        {
          parent: root
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => setData(createTreeViewData(res.data)));
  }, [root]);

  return (
    <StyledTreeView>
      {data && (
        <ReactEcharts
          style={{ height: '800px', width: '1600px' }}
          option={{
            series: [
              {
                type: 'treemap',
                data: data,
                levels: getLevelOption()
              }
            ]
          }}
        />
      )}
    </StyledTreeView>
  );
};

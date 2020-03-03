import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';

/* eslint-disable-next-line */
export interface InputProps {
  onClick: (value: string) => void;
}

const StyledInput = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  .MuiOutlinedInput-input {
    padding: 1rem;
    min-width: 50rem;
  }

  button {
    margin-left: 1rem;
    background-color: ${props => props.theme.colors.primary1};
    color: ${props => props.theme.colors.white};
  }
`;

export const SearchInput = (props: InputProps) => {
  const { onClick } = props;
  const [value, setValue] = useState('');

  return (
    <StyledInput>
      <OutlinedInput
        value={value}
        onChange={event => {
          setValue(event.target.value);
        }}
      />
      <Button variant="contained" onClick={() => onClick(value)}>
        Search
      </Button>
    </StyledInput>
  );
};

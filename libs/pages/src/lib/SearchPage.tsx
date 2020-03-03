import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchInput } from '@panoramic/input';
import axios from 'axios';

/* eslint-disable-next-line */
export interface SearchPageProps {
  data: any;
}

const StyledSearchPage = styled.div``;

export const SearchPage = (props: SearchPageProps) => {
  const [searchResult, setSearchResult] = useState();

  const searchNodes = (substring = 'sauce') => {
    axios
      .post(
        'http://localhost:4000/search',
        {
          substring: substring
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => setSearchResult(res.data));
  };

  const handleSearch = val => {
    if (val) {
      searchNodes(val);
    }
  };

  return (
    <StyledSearchPage>
      <SearchInput onClick={handleSearch} />
      <div>Search Results:</div>
      {searchResult &&
        searchResult.map((item, index) => (
          <div key={index}>{`${item.name}, ${item.size}`}</div>
        ))}
    </StyledSearchPage>
  );
};

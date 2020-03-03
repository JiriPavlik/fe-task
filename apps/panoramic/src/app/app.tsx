import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { SearchPage, VisualisationPage } from '@panoramic/pages';
import { Route, Switch, Link } from 'react-router-dom';

const StyledApp = styled.div`
  padding: 1rem;
`;

const StyledPageTitle = styled.h1`
  color: ${props => props.theme.colors.secondary2};
`;

const StyledLinks = styled.div`
  display: flex;
`;

const StyledLink = styled(Link)`
  padding: 0 0.6rem;
  text-decoration: none;
  cursor: pointer;
`;

export const App = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios.get('http://localhost:4000/data').then(res => {
      setData(res.data);
    });
  }, []);

  return (
    <StyledApp>
      <StyledLinks>
        <StyledLink to={'/'}>Home</StyledLink>
        <StyledLink to={'/search'}>Search</StyledLink>
      </StyledLinks>
      <StyledPageTitle>ImageNet synsets browser</StyledPageTitle>

      {data ? (
        <Switch>
          <Route
            path="/"
            exact
            render={() => <VisualisationPage data={data} />}
          />
          <Route path="/search" render={() => <SearchPage data={data} />} />
        </Switch>
      ) : (
        <div>Loading...</div>
      )}
    </StyledApp>
  );
};

export default App;

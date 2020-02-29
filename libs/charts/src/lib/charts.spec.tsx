import React from 'react';
import { render } from '@testing-library/react';

import Charts from './charts';

describe(' Charts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Charts />);
    expect(baseElement).toBeTruthy();
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import UshpizinDisplay from './UshpizinDisplay';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UshpizinDisplay />, div);
});

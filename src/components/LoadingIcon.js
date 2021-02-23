import React from 'react';
import { css } from '@emotion/core';
import { PulseLoader } from 'react-spinners';

function LoadingIcon() {
  // Can be a string as well. Need to ensure each key-value pair ends with ;
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  return <div>Loading...;</div>;
}

export default LoadingIcon;

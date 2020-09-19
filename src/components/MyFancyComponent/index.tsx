import React, { useState } from 'react';

import { css } from '@emotion/core';

const MyFancyComponent = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div
      css={css`
        background: hotpink;
      `}
    >
      <button onClick={() => setCounter(counter => counter + 1)}>
        Hi, {counter}
      </button>
    </div>
  );
};

export default MyFancyComponent;

import React from 'react';
import { hot } from 'react-hot-loader/root';

import MyFancyComponent from '../../components/MyFancyComponent';

const App = () => {
  return (
    <div>
      <MyFancyComponent />
    </div>
  );
};

export default hot(App);

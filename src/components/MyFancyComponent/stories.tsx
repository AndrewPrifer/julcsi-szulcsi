import React from 'react';
import { action } from '@storybook/addon-actions';

import MyFancyComponent from '.';

export default {
  component: MyFancyComponent,
  title: 'MyFancyComponent',
};

export const normal = () => (
  <MyFancyComponent />
);

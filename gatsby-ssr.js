import * as React from 'react';
import { GlobalDocStyle, GlobalFontsStyle } from './src/theme/global.theme';

export const wrapRootElement = ({ element }) => (
  <>
    <GlobalDocStyle />
    <GlobalFontsStyle />
    {element}
  </>
);

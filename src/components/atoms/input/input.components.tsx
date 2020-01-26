import styled from 'styled-components';
import { DesktopTheme } from 'src/theme/global.theme';

const { borders, colors, fontFamilies, fontSizes } = DesktopTheme;

export const Input = styled.input`
  display: inline-block;
  padding: 4px 8px;
  border-width: 2px;
  border-style: solid;
  border-color: ${borders.bezelNormal};
  background: ${colors.bkgInputEnabled};
  font-family: ${fontFamilies.vcr};
  font-size: ${fontSizes.button};
  color: black;

  :focus {
    background: ${colors.bkgInputFocused};
  }
  :disabled {
    background: ${colors.bkgDisabled};
  }
`;

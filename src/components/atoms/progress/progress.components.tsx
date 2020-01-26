import styled from 'styled-components';
import { DesktopTheme } from 'src/theme/global.theme';

const { borders, colors } = DesktopTheme;

export const Progress = styled.progress<{ value: number; max: number }>`
  appearance: none;

  display: block;
  width: auto;
  height: 24px;

  border-width: 2px;
  border-style: solid;
  border-color: ${borders.bezelNormal};

  ::-webkit-progress-bar {
    background: ${colors.bkg};
  }

  ::-webkit-progress-value {
    background: ${colors.bkgProgressBar};
    border: 2px solid ${colors.bkgProgressBar};
  }

  ::-moz-progress-bar {
    background: ${colors.bkgProgressBar};
    border: 2px solid ${colors.bkgProgressBar};
  }

  ${({ value, max }) =>
    value === max &&
    `
    ::-webkit-progress-value {
        background: ${colors.bkgProgressBarFull};
        border: 2px solid ${colors.bkgProgressBarFull};
    }

    ::-moz-progress-bar {
        background: ${colors.bkgProgressBarFull};
        border: 2px solid ${colors.bkgProgressBarFull};
    }
    `}
`;

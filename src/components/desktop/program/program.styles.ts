import styled from 'styled-components';

import { ProgramWrapperProps } from './program.types';
import { GlobalTheme, DesktopTheme } from '../../../theme/global.theme';

const { pageTransitions } = GlobalTheme;

export const ProgramWrapper = styled.section<ProgramWrapperProps>`
  transition: opacity ${pageTransitions.durationFn} ease-in-out 0s,
    transform ${pageTransitions.durationFn} ease-in-out 0s;

  ${({ transitionStatus }) =>
    transitionStatus === 'entered' || transitionStatus === 'POP'
      ? `
        opacity: 1;
        transform: scale(1);
        `
      : `
        opacity: 0;
        transform: scale(0.95);
        `}

  width: fit-content;
  border: 4px solid black;

  grid-column: span 1;
  grid-row: span 1;

  display: flex;
  flex-direction: column;
  background: ${DesktopTheme.colors.bkgProgram};
  box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 20px;

  @media print {
    box-shadow: none;
    background: transparent;
    margin: 0;
  }

  @media screen and (min-width: ${DesktopTheme.breakpoints.desktop}) {
    grid-column: span ${({ gridColSpan = 1 }) => gridColSpan};
    grid-row: span ${({ gridRowSpan = 1 }) => gridRowSpan};
  }
`;

export const PTitleBar = styled.header`
  font-family: ${DesktopTheme.fontFamilies.vcr};
  font-size: ${DesktopTheme.fontSizes.titlebar};
  color: white;
  line-height: 2;
  text-transform: uppercase;
  background: ${DesktopTheme.colors.titlebar1};
  background: linear-gradient(
    90deg,
    ${DesktopTheme.colors.titlebar1},
    ${DesktopTheme.colors.titlebar2}
  );
  padding: 0 ${DesktopTheme.spacing.paddingProgram};

  @media print {
    color: black;
    background: transparent;
  }

  & > * {
    line-height: 1;
  }
`;

export const PContent = styled.div<{ nopadding?: boolean }>`
  font-family: ${DesktopTheme.fontFamilies.dejavu};
  font-size: ${DesktopTheme.fontSizes.body};
  padding: ${({ nopadding }) =>
    nopadding ? 0 : DesktopTheme.spacing.paddingProgram};

  @media print {
    background: transparent;
  }

  & > :first-child {
    margin-top: 0;
  }
  & > :last-child {
    margin-bottom: 0;
  }

  table {
    th {
      text-align: left;
    }

    th:nth-child(n + 2),
    td:nth-child(n + 2) {
      padding-left: 8px;
    }
  }

  iframe {
    display: block;
    border: 0;
  }

  @media screen and (max-width: ${DesktopTheme.breakpoints.desktop}) {
    iframe {
      max-width: 100%;
    }
  }
`;

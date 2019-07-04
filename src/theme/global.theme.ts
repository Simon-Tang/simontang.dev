import { createGlobalStyle } from 'styled-components';
import {
  DejaVuSansMono,
  DejaVuSansMonoBold,
  DejaVuSansMonoOblique,
  DejaVuSansMonoBoldOblique,
} from '../assets/fonts/dejavu';
import { VCR } from '../assets/fonts/vcr';

export const GlobalDocStyle = createGlobalStyle`
  html {
    font-size: 14px;
  }
  @media screen {
    body {
      margin: 0;
    }
  }
`;

export const GlobalFontsStyle = createGlobalStyle`
  @font-face {
    font-family: VCR;
    src: url('${VCR}') format('truetype');
  }
  
  @font-face {
    font-family: 'DejaVu Sans Mono';
    font-style: normal;
    font-weight: normal;
    src: url('${DejaVuSansMono}') format('truetype');
  }
  
  @font-face {
    font-family: 'DejaVu Sans Mono';
    font-style: normal;
    font-weight: bold;
    src: url('${DejaVuSansMonoBold}') format('truetype');
  }

  @font-face {
    font-family: 'DejaVu Sans Mono';
    font-style: oblique;
    src: url('${DejaVuSansMonoOblique}') format('truetype');
  }
  
  @font-face {
    font-family: 'DejaVu Sans Mono';
    font-style: oblique;
    font-weight: bold;
    src: url('${DejaVuSansMonoBoldOblique}') format('truetype');
  }
`;

export { DesktopTheme } from './desktop.theme';
export { ResumeTheme } from './resume.theme';

export const GlobalTheme = {
  zIndexes: {
    nav: 900,
  },
  pageTransitions: {
    duration: 0.25,
    durationFn: ({
      transitionStatus,
    }: {
      transitionStatus: TransitionStatus;
    }) => (transitionStatus === 'POP' ? '0s' : '250ms'),
  },
};

export type TransitionStatus =
  | 'entering'
  | 'entered'
  | 'exiting'
  | 'exited'
  | 'POP';

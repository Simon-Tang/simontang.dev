import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { CustomTransitionState } from '../../layouts/page-content';
import { GlobalTheme, TransitionStatus } from '../../theme/global.theme';

type DocSheetProps = {
  overflowY?: boolean;
  className?: string;
  children: any;
};

const DocSheetWrapper = styled.section<
  DocSheetProps & { transitionStatus: TransitionStatus }
>`
  width: 216mm;
  ${({ overflowY }) =>
    overflowY
      ? `
        /* Setting max-width because of gatsby-plugin-transition-link layout */
        max-width: 100%;
        min-height: 279mm;
      `
      : `
        height: 279mm;
        overflow-y: hidden;
      `}
  margin: 0;
  box-sizing: border-box;
  page-break-after: always;

  transition: opacity ${GlobalTheme.pageTransitions.durationFn} ease-in-out 0s;
  ${({ transitionStatus }) =>
    transitionStatus === 'entered' || transitionStatus === 'POP'
      ? `opacity: 1;`
      : `opacity: 0;`}

  @media screen {
    background: white;
    box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.6);
    margin: 0 auto 2.25mm auto;
  }

  @media print {
    width: 216mm;
  }
`;

const GlobalResumeStyles = createGlobalStyle`
  @page {
    margin: 0;
    size: letter portrait;
  }
  @media print {
    body {
      margin: 0;
    }
  }
`;

export const DocSheet = ({ overflowY, className, children }: DocSheetProps) => (
  <CustomTransitionState>
    {({ transitionStatus }) => (
      <>
        <GlobalResumeStyles />
        <DocSheetWrapper
          className={className}
          overflowY={overflowY}
          transitionStatus={transitionStatus}
        >
          {children}
        </DocSheetWrapper>
      </>
    )}
  </CustomTransitionState>
);

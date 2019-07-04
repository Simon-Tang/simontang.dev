import * as React from 'react';
import styled from 'styled-components';
import {
  TransitionStatus,
  GlobalTheme,
  DesktopTheme,
} from '../theme/global.theme';
import {
  TransitionState,
  TransitionStateProps,
} from 'gatsby-plugin-transition-link';
import { ProgramWrapper } from 'src/components/desktop/program/program.styles';

export type BasePageProps = {
  transitionStatus: TransitionStatus;
  entry: any;
  exit: any;
  children: React.ReactNode;
};

/**
 * Manually sets the 'entering' transitionStatus for a duration of
 * `GlobalTheme.pageTransitions.duration`, as a drop-in replacement for
 * TransitionState from `gatsby-plugin-transition-link`.
 */
export class CustomTransitionState extends React.Component<
  TransitionStateProps,
  { isEnteringOverride: boolean }
> {
  constructor(props: TransitionStateProps) {
    super(props);
    this.state = {
      isEnteringOverride: true,
    };
  }

  public componentDidMount() {
    setTimeout(
      () => this.setState({ isEnteringOverride: false }),
      GlobalTheme.pageTransitions.duration * 1000,
    );
  }

  public render() {
    const { children: childFn } = this.props;
    return (
      <TransitionState>
        {({ transitionStatus, ...rest }) => {
          const canOverride =
            this.state.isEnteringOverride &&
            transitionStatus !== 'exiting' &&
            transitionStatus !== 'exited';

          return childFn({
            ...rest,
            transitionStatus: canOverride ? 'entering' : transitionStatus,
          });
        }}
      </TransitionState>
    );
  }
}

type ProgramsProps = {
  gridFlow?: 'row' | 'column';
  columns?: number;
};

export const Programs = styled.div<ProgramsProps>`
  display: grid;
  grid-gap: ${DesktopTheme.spacing.programGap};
  max-width: ${DesktopTheme.widths.maxPrograms};
  height: fit-content;

  grid-template-columns: auto;
  grid-template-rows: max-content;

  ${ProgramWrapper} {
    height: fit-content;
  }

  @media screen and (min-width: ${DesktopTheme.breakpoints.desktop}) {
    ${({ columns = 1, gridFlow = 'row' }) => `
      grid-auto-flow: ${gridFlow};
      grid-template-columns: repeat(${columns}, auto);
    `}
  }
`;

import * as React from 'react';
import { CustomTransitionState } from '../../../layouts/page-content';
import { ProgramWrapper, PTitleBar, PContent } from './program.styles';
import { ProgramProps } from './program.types';

export class Program extends React.Component<ProgramProps> {
  public render() {
    const {
      style,
      title,
      children,
      nopadding,
      gridColSpan,
      gridRowSpan,
    } = this.props;
    return (
      <CustomTransitionState>
        {({ transitionStatus }) => (
          <ProgramWrapper
            style={style}
            transitionStatus={transitionStatus}
            gridColSpan={gridColSpan}
            gridRowSpan={gridRowSpan}
          >
            {title && <PTitleBar>{title}</PTitleBar>}
            <PContent nopadding={nopadding}>{children}</PContent>
          </ProgramWrapper>
        )}
      </CustomTransitionState>
    );
  }
}

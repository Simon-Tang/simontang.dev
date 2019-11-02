import * as React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { CustomTransitionState } from '../../../layouts/page-content';
import { PContent, ProgramWrapper, PTitleBar } from './program.styles';
import {
  ProgramRichTextDocumentRendererProps,
  ProgramProps,
} from './program.types';
import { PROGRAM_RICH_TEXT_RENDER_OPTIONS } from './program.utils';

export class Program extends React.Component<ProgramProps> {
  public render() {
    const {
      className,
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
            className={className}
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

export class ProgramRichTextDocumentRenderer extends React.Component<
  ProgramRichTextDocumentRendererProps
> {
  public render() {
    const { richTextDocument } = this.props;
    return documentToReactComponents(
      richTextDocument,
      PROGRAM_RICH_TEXT_RENDER_OPTIONS,
    );
  }
}

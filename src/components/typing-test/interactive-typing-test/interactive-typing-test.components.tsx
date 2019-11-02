import * as React from 'react';
import { Program } from 'src/components/desktop/program/program.components';
import { StyledInteractiveTypingTest } from './interactive-typing-test.styles';
import {
  InteractiveTypingTestProps,
  PassageRendererProps,
} from './interactive-typing-test.types';

export class InteractiveTypingTest extends React.Component<
  InteractiveTypingTestProps
> {
  constructor(props: InteractiveTypingTestProps) {
    super(props);
  }

  public render() {
    const { typingTest } = this.props;
    return (
      <StyledInteractiveTypingTest>
        <Program
          className='passage'
          title={`Typing Test: "${typingTest.title}"`}
          gridColSpan={3}
        >
          <PassageRenderer passage={typingTest.passage} />
        </Program>
        <Program className='sponsored A' title='Sponsored' nopadding={true}>
          <img src='https://via.placeholder.com/1000x100?text=(coming soon)' />
        </Program>
        <Program className='input-window' title='Control Panel'>
          <input></input>
        </Program>
        <Program className='sponsored B' title='Sponsored' nopadding={true}>
          <img src='https://via.placeholder.com/400?text=(coming soon)' />
        </Program>
        <Program className='sponsored C' title='Sponsored' nopadding={true}>
          <img src='https://via.placeholder.com/400?text=(coming soon)' />
        </Program>
        <Program className='sponsored D' title='Sponsored' nopadding={true}>
          <img src='https://via.placeholder.com/400?text=(coming soon)' />
        </Program>
        <Program className='sponsored E' title='Sponsored' nopadding={true}>
          <img src='https://via.placeholder.com/400?text=(coming soon)' />
        </Program>
        <Program className='sponsored F' title='Sponsored' nopadding={true}>
          <img src='https://via.placeholder.com/400?text=(coming soon)' />
        </Program>{' '}
        <Program className='sponsored G' title='Sponsored' nopadding={true}>
          <img src='https://via.placeholder.com/400?text=(coming soon)' />
        </Program>
        <Program className='sponsored H' title='Sponsored' nopadding={true}>
          <img src='https://via.placeholder.com/1000x100?text=(coming soon)' />
        </Program>
      </StyledInteractiveTypingTest>
    );
  }
}

const PassageRenderer = ({ passage }: PassageRendererProps) => (
  <div>{passage}</div>
);

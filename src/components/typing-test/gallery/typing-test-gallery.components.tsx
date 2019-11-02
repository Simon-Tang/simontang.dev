import * as React from 'react';
import { ButtonLink } from 'src/components/atoms/button/button.components';
import {
  StyledTypingTestGallery,
  StyledTypingTestPreview,
} from './typing-test-gallery.styles';
import {
  TypingTestGalleryProps,
  TypingTestPreviewProps,
} from './typing-test-gallery.types';

export class TypingTestGallery extends React.Component<TypingTestGalleryProps> {
  public render() {
    const { heading, typingTests } = this.props;
    return (
      <StyledTypingTestGallery>
        <h1>
          {heading} ({typingTests.length})
        </h1>
        <ul>
          {typingTests.map(typingTest => (
            <li key={typingTest.slug}>
              <TypingTestPreview typingTest={typingTest} />
            </li>
          ))}
        </ul>
      </StyledTypingTestGallery>
    );
  }
}

const TypingTestPreview = ({ typingTest }: TypingTestPreviewProps) => (
  <StyledTypingTestPreview>
    <h1>{typingTest.title}</h1>
    <p className='preview'>{typingTest.preview}</p>
    <ButtonLink to={'/terrible-online-typing-tests/' + typingTest.slug}>
      View Test
    </ButtonLink>
  </StyledTypingTestPreview>
);

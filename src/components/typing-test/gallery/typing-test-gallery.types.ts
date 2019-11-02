import { TypingTest } from '../typing-test.types';

export type TypingTestGalleryProps = {
  heading: string;
  typingTests: TypingTest[];
};

export type TypingTestPreviewProps = {
  typingTest: TypingTest;
};

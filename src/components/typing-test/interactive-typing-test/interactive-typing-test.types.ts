import { TypingTest } from 'src/components/typing-test/typing-test.types';

export type InteractiveTypingTestProps = {
  typingTest: TypingTest;
};

export type InteractiveTypingTestState = {
  isTestActive: boolean;
  lineIndex: number;
  inputValue: string;
  overallWordIndex: number;
  passage: Passage;
  testResults: TestResults | null;
  testStartTimeMs: number;
  totalCharsSubmitted: number;
  wordIndex: number;
};

export type PassageRendererProps = {
  lineIndex: number;
  passage: Passage;
  wordIndex: number;
};

export type Passage = {
  lines: PassageLine[];
  totalWordCount: number;
};

export type PassageLine = {
  id: string;
  isParagraphStart: boolean;
  words: PassageWord[];
};

export type PassageWord = {
  id: string;
  text: string;
  hasError: boolean;
  hasHadError: boolean;
};

export type TestResults = {
  wpm: number;
};

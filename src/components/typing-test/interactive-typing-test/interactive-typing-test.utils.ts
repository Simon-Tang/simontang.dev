import { TypingTest } from 'src/components/typing-test/typing-test.types';
import {
  Passage,
  PassageLine,
  PassageWord,
  TestResults,
} from './interactive-typing-test.types';

/**
 * Algorithm (https://www.speedtypingonline.com/typing-equations):
 * Net WPM = (
 *  ((totalCharsSubmitted / 5) - incorrectWordsCount)
 *    / (time in minutes)
 *  )
 */
export const computeTestResults = ({
  totalCharsSubmitted,
  incorrectWordsCount,
  durationInMinutes,
}: {
  totalCharsSubmitted: number;
  incorrectWordsCount: number;
  durationInMinutes: number;
}): TestResults => ({
  wpm: (totalCharsSubmitted / 5 - incorrectWordsCount) / durationInMinutes,
});

export const mapTypingTestToPassage = (
  test: TypingTest,
  { charsPerLine }: { charsPerLine: number },
): Passage => {
  const lines = test.passage
    .replace(/\n+/g, '\n')
    .trim()
    .split('\n')
    .map(paragraph => splitStringIntoWords(paragraph))
    .reduce(
      (acc, words) => [
        ...acc,
        ...partitionWordsIntoLinesByWidth(words, charsPerLine),
      ],
      [] as PassageLine[],
    );
  const totalWordCount = lines.reduce(
    (count, line) => count + line.words.length,
    0,
  );
  return {
    lines,
    totalWordCount,
  };
};

const getUUID = (() => {
  let prefix = Math.random() * 1024;
  let id = 0;
  return () => `${prefix}-${id++}`;
})();

const splitStringIntoWords = (line: string): PassageWord[] =>
  line
    .trim()
    .split(/\s+/)
    .map(word => ({
      id: getUUID(),
      hasError: false,
      hasHadError: false,
      text: word.trim(),
    }));

const partitionWordsIntoLinesByWidth = (
  words: PassageWord[],
  charsPerLine: number,
): PassageLine[] =>
  words
    .reduce(
      (lines, word) => {
        const current = lines[lines.length - 1] || [];
        const rest = lines.slice(0, lines.length - 1);
        if (computeLineLength(current) + word.text.length >= charsPerLine) {
          return [...rest, current, [word]];
        } else {
          return [...rest, [...current, word]];
        }
      },
      [] as PassageWord[][],
    )
    .map((words, lineIndex) => ({
      id: getUUID(),
      isParagraphStart: !lineIndex,
      words,
    }));

const computeLineLength = (words: PassageWord[]) =>
  words.reduce((acc, word) => acc + word.text.length, 0);

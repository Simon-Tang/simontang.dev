import * as React from 'react';
import { Program } from 'src/components/desktop/program/program.components';
import { Button } from 'src/components/atoms/button/button.components';
import { Input } from 'src/components/atoms/input/input.components';
import { Progress } from 'src/components/atoms/progress/progress.components';
import {
  StyledInteractiveTypingTest,
  StyledControlPanel,
  StyledPassageRenderer,
  StyledPassageLine,
  StyledPassageWord,
  StyledTestResults,
} from './interactive-typing-test.styles';
import {
  InteractiveTypingTestProps,
  InteractiveTypingTestState,
  PassageRendererProps,
  PassageLine,
  TestResults,
} from './interactive-typing-test.types';
import {
  computeTestResults,
  mapTypingTestToPassage,
} from './interactive-typing-test.utils';

export class InteractiveTypingTest extends React.Component<
  InteractiveTypingTestProps,
  InteractiveTypingTestState
> {
  static readonly LINE_LENGTH = 36;

  testInput: HTMLInputElement | null = null;

  constructor(props: InteractiveTypingTestProps) {
    super(props);
    this.state = {
      isTestActive: true,
      lineIndex: 0,
      inputValue: '',
      overallWordIndex: 0,
      passage: { lines: [], totalWordCount: 0 },
      testStartTimeMs: 0,
      testResults: null,
      totalCharsSubmitted: 0,
      wordIndex: 0,
    };
  }

  public componentDidMount() {
    this.restartTest();
  }

  public componentDidUpdate(
    prevProps: InteractiveTypingTestProps,
    prevState: InteractiveTypingTestState,
  ) {
    if (prevProps.typingTest !== this.props.typingTest) {
      this.restartTest();
    }
    if (prevState.isTestActive && !this.getCurrentWord()) {
      this.handleTestOver();
    }
  }

  public render() {
    const { typingTest } = this.props;
    const {
      inputValue,
      isTestActive,
      lineIndex,
      passage,
      testResults,
      wordIndex,
    } = this.state;
    return (
      <StyledInteractiveTypingTest>
        <Program
          className='passage'
          title={typingTest.title}
          gridColSpan={3}
          style={{ margin: '0 auto' }}
        >
          <PassageRenderer
            lineIndex={lineIndex}
            passage={passage}
            wordIndex={wordIndex}
          />
        </Program>
        <Program className='input-window' title='Control Panel'>
          <StyledControlPanel>
            <Input
              ref={input => (this.testInput = input)}
              className='input'
              autoFocus={true}
              placeholder={
                isTestActive
                  ? lineIndex || wordIndex
                    ? undefined
                    : 'Type to start...'
                  : '[Enter] to restart...'
              }
              value={inputValue}
              onChange={e => this.handleInputChange(e)}
              onKeyPress={e => this.handleKeyPress(e)}
            />
            <Button
              className='restart'
              onClick={() => this.restartTestWithConfirmation()}
            >
              Restart Test
            </Button>
            <Progress
              className='progress'
              value={this.state.overallWordIndex}
              max={passage.totalWordCount}
            />
            <TestResultsRenderer
              className='results'
              testResults={testResults}
            />
          </StyledControlPanel>
        </Program>
        {/* <Program className='sponsored A' title='Sponsored' nopadding={true}>
          <img src='https://via.placeholder.com/400?text=(coming soon)' />
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
        </Program>
        <Program className='sponsored G' title='Sponsored' nopadding={true}>
          <img src='https://via.placeholder.com/1000x100?text=(coming soon)' />
        </Program>
        <Program className='sponsored H' title='Sponsored' nopadding={true}>
          <img src='https://via.placeholder.com/1000x100?text=(coming soon)' />
        </Program> */}
      </StyledInteractiveTypingTest>
    );
  }

  private commitWord(word: string) {
    this.setState(
      ({
        lineIndex,
        overallWordIndex,
        passage,
        testStartTimeMs,
        totalCharsSubmitted,
        wordIndex,
      }) => {
        const { lines } = passage;
        const currentLine = lines[lineIndex];
        const currentWord = currentLine.words[wordIndex];
        const isAtEndOfLine = wordIndex >= currentLine.words.length - 1;
        return {
          inputValue: '',
          passage: {
            ...passage,
            lines: [
              ...lines.slice(0, lineIndex),
              {
                ...lines[lineIndex],
                words: [
                  ...lines[lineIndex].words.slice(0, wordIndex),
                  {
                    ...currentWord,
                    hasError: word !== currentWord.text,
                    hasHadError:
                      currentWord.hasHadError || word !== currentWord.text,
                  },
                  ...lines[lineIndex].words.slice(wordIndex + 1),
                ],
              },
              ...lines.slice(lineIndex + 1),
            ],
          },
          overallWordIndex: overallWordIndex + 1,
          lineIndex: isAtEndOfLine ? lineIndex + 1 : lineIndex,
          wordIndex: isAtEndOfLine ? 0 : wordIndex + 1,
          testStartTimeMs: overallWordIndex ? testStartTimeMs : Date.now(),
          totalCharsSubmitted: totalCharsSubmitted + word.length,
        };
      },
    );
  }

  private currentWordIsLastWord() {
    return (
      this.state.lineIndex >= this.getPassageLineCount() - 1 &&
      this.state.wordIndex >= this.getCurrentLineLength() - 1
    );
  }

  private getCurrentLine() {
    return this.state.passage.lines[this.state.lineIndex];
  }

  private getCurrentLineLength() {
    return this.getCurrentLine().words.length;
  }

  private getPassageLineCount() {
    return this.state.passage.lines.length;
  }

  private getCurrentWord() {
    const line = this.getCurrentLine();
    return line ? line.words[this.state.wordIndex] : null;
  }

  private handleInputChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = changeEvent;
    const currentWord = this.getCurrentWord();

    if (!currentWord) {
      return;
    }

    // Do not require trailing whitespace at end of test
    if (this.currentWordIsLastWord() && currentWord.text === value) {
      this.commitWord(value);
      return;
    }

    // Submit word when there is trailing whitespace
    const whitespaceMatch = value.match(/(\S+)(?=\s)+/);
    if (whitespaceMatch) {
      this.commitWord(whitespaceMatch[1]);
    } else {
      this.setState({ inputValue: value.trim() });
    }
  }

  private handleKeyPress(keyPressEvent: React.KeyboardEvent) {
    if (!this.state.isTestActive && keyPressEvent.key === 'Enter') {
      this.restartTest();
    }
  }

  private handleTestOver() {
    this.setState(({ passage, testStartTimeMs, totalCharsSubmitted }) => {
      const incorrectWordsCount = passage.lines.reduce(
        (acc, line) =>
          acc +
          line.words
            .filter(word => word.hasError)
            .reduce((acc, word) => acc + word.text.length, 0),
        0,
      );
      return {
        isTestActive: false,
        lineIndex: -1,
        wordIndex: -1,
        testResults: computeTestResults({
          totalCharsSubmitted,
          incorrectWordsCount,
          durationInMinutes: (Date.now() - testStartTimeMs) / 1000 / 60,
        }),
      };
    });
  }

  private restartTest() {
    this.setState(
      {
        inputValue: '',
        isTestActive: true,
        lineIndex: 0,
        overallWordIndex: 0,
        passage: mapTypingTestToPassage(this.props.typingTest, {
          charsPerLine: InteractiveTypingTest.LINE_LENGTH,
        }),
        testResults: null,
        totalCharsSubmitted: 0,
        wordIndex: 0,
      },
      () => this.testInput!.focus(),
    );
  }

  private restartTestWithConfirmation() {
    if (window.confirm('Are you sure you want to restart the test?')) {
      this.restartTest();
    }
  }
}

// NOTE - adding paragraph spacing -> need to fix this styling
const PassageRenderer = ({
  lineIndex,
  passage,
  wordIndex,
}: PassageRendererProps) => {
  const numLinesToDisplay = 10;
  const displayStartIndex = Math.min(
    // 0-4 lines above active line
    Math.max(0, lineIndex - 4),
    // The final {numLinesToDisplay} lines
    Math.max(0, passage.lines.length - numLinesToDisplay),
  );
  const activeLineIterIndex = lineIndex - displayStartIndex;
  return (
    <StyledPassageRenderer maxLines={numLinesToDisplay}>
      {passage.lines
        .slice(displayStartIndex, displayStartIndex + numLinesToDisplay)
        .map((line, lineIterIndex) => (
          <PassageLineRenderer
            key={line.id}
            line={line}
            isActive={lineIterIndex === activeLineIterIndex}
            wordIndex={lineIterIndex === activeLineIterIndex ? wordIndex : -1}
          />
        ))}
    </StyledPassageRenderer>
  );
};

const PassageLineRenderer = ({
  isActive,
  line,
  wordIndex,
}: {
  isActive: boolean;
  line: PassageLine;
  wordIndex: number;
}) => (
  <StyledPassageLine isParagraphStart={line.isParagraphStart}>
    {line.words.map((word, wordIterIndex) => (
      <React.Fragment key={word.id}>
        <StyledPassageWord
          hasError={word.hasError}
          isActive={isActive && wordIterIndex === wordIndex}
        >
          {word.text}
        </StyledPassageWord>{' '}
      </React.Fragment>
    ))}
  </StyledPassageLine>
);

const TestResultsRenderer = ({
  className,
  testResults,
}: {
  className: string;
  testResults: TestResults | null;
}) =>
  testResults && (
    <StyledTestResults className={className}>
      WPM: {Math.round(testResults.wpm)}
    </StyledTestResults>
  );

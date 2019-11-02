import { TypingTest } from 'src/components/typing-test/typing-test.types';

export const getRelatedTypingTests = (
  typingTest: TypingTest,
  allTypingTests: TypingTest[],
) =>
  allTypingTests.filter(
    test =>
      test.slug !== typingTest.slug &&
      test.categories.some(category =>
        typingTest.categories.includes(category),
      ),
  );

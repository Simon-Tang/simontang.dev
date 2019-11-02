import { StaticQuery, graphql } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';
import { ButtonLink } from 'src/components/atoms/button/button.components';
import { Program } from 'src/components/desktop/program/program.components';
import { InteractiveTypingTest } from 'src/components/typing-test/interactive-typing-test/interactive-typing-test.components';
import { getRelatedTypingTests } from 'src/components/typing-test/typing-test.utils';
import { TypingTest } from 'src/components/typing-test/typing-test.types';
import { Programs } from 'src/layouts/page-content';

type TypingTestPageProps = {
  typingTest: TypingTest;
  relatedTypingTests: TypingTest[];
};

type TypingTestPageWrapperProps = {
  pageContext: {
    typingTest: TypingTest;
  };
};

const TypingTestPage = ({
  typingTest,
  relatedTypingTests,
}: TypingTestPageProps) => (
  <>
    <Helmet>
      <title>{`${typingTest.title} | Terrible Online Typing Tests`}</title>
    </Helmet>
    <Programs>
      <InteractiveTypingTest typingTest={typingTest} />
      <Program title='About Terrible Online Typing Tests'>
        <p>
          <strong>These are the worst typing tests online!</strong>
        </p>
        <p>
          There's a test for everybody, from impossibly complex literary works
          to marathon-like endurance tests. Challenge yourself for hours!
        </p>
        <p>
          <ButtonLink to='/terrible-online-typing-tests'>
            Browse all typing tests
          </ButtonLink>
        </p>
      </Program>
      {!!relatedTypingTests.length && (
        <Program title='See Also'>
          <p>More typing tests like this:</p>
          <ul>
            {relatedTypingTests.map(typingTest => (
              <li key={typingTest.slug}>
                <ButtonLink
                  to={`/terrible-online-typing-tests/${typingTest.slug}`}
                >
                  {typingTest.title}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </Program>
      )}
    </Programs>
  </>
);

export default ({
  pageContext: { typingTest },
}: TypingTestPageWrapperProps) => (
  <StaticQuery
    query={graphql`
      query InteractiveTypingTestQuery {
        allContentfulTypingTest {
          edges {
            node {
              title
              slug
              categories
              preview
              passage {
                passage
              }
            }
          }
        }
      }
    `}
    render={data => {
      console.log({ data });
      const allTypingTests = data.allContentfulTypingTest.edges.map(
        ({ node }) => ({ ...node, passage: node.passage.passage }),
      );
      const relatedTypingTests = getRelatedTypingTests(
        typingTest,
        allTypingTests,
      );
      return (
        <TypingTestPage
          typingTest={typingTest}
          relatedTypingTests={relatedTypingTests}
        />
      );
    }}
  />
);

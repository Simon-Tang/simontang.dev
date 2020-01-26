import { DiscussionEmbed } from 'disqus-react';
import { StaticQuery, graphql } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';
import {
  ButtonLink,
  TwitterSocialLink,
} from 'src/components/atoms/button/button.components';
import { Program } from 'src/components/desktop/program/program.components';
import { InteractiveTypingTest } from 'src/components/typing-test/interactive-typing-test/interactive-typing-test.components';
import { getRelatedTypingTests } from 'src/components/typing-test/typing-test.utils';
import { TypingTest } from 'src/components/typing-test/typing-test.types';
import { Programs } from 'src/layouts/page-content';

type TypingTestPageProps = {
  typingTest: TypingTest;
  relatedTypingTests: TypingTest[];
  path: string;
  location: { href: string };
};

type TypingTestPageWrapperProps = {
  pageContext: {
    typingTest: TypingTest;
  };
  path: string;
  location: { href: string };
};

const TypingTestPage = ({
  typingTest,
  relatedTypingTests,
  path,
  location,
}: TypingTestPageProps) => (
  <>
    <Helmet>
      <title>{`${typingTest.title} | Terrible Online Typing Tests`}</title>
    </Helmet>
    <Programs columns={2}>
      <div style={{ gridColumn: '1 / -1' }}>
        <InteractiveTypingTest typingTest={typingTest} />
      </div>
      <Program title='About Terrible Online Typing Tests' gridColSpan={2}>
        <p>
          <strong>These are the worst typing tests online!</strong>
        </p>
        <p>
          There's a test for everybody, from impossibly complex literary works
          to marathon-like endurance tests. Challenge yourself for hours!
        </p>
      </Program>

      <Program title='See Also'>
        {!!relatedTypingTests.length && (
          <>
            <p>More typing tests like this:</p>
            <ul>
              {relatedTypingTests.map(typingTest => (
                <li key={typingTest.slug}>
                  <ButtonLink
                    multiline={true}
                    to={`/terrible-online-typing-tests/${typingTest.slug}`}
                  >
                    {typingTest.title}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </>
        )}
        <p>
          <ButtonLink to='/terrible-online-typing-tests'>
            Browse all typing tests
          </ButtonLink>
        </p>
      </Program>

      <Program title='Do Also'>
        <TwitterSocialLink
          tweet='This is the worst/best typing test ever!'
          url={location.href}
          hashtags={['TerribleTypingTest']}
        >
          Hate-Tweet This!
        </TwitterSocialLink>
      </Program>

      {/* TODO: reusable Disqus component */}
      <Program
        title='Freeform Practice'
        style={{ gridColumn: '1 / -1', width: 'auto' }}
      >
        <DiscussionEmbed
          shortname='simontang'
          config={{
            identifier: path,
            title: `${typingTest.title} | Terrible Online Typing Tests`,
            url: `https://simontang.dev/${path}`,
          }}
        />
      </Program>
    </Programs>
  </>
);

export default ({
  pageContext: { typingTest },
  path,
  location,
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
          path={path}
          location={location}
        />
      );
    }}
  />
);

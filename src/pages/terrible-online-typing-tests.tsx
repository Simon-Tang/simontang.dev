import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import * as React from 'react';
import { Program } from '../components/desktop/program/program.components';
import { TypingTest } from 'src/components/typing-test/typing-test.types';
import { TypingTestGallery } from 'src/components/typing-test/gallery/typing-test-gallery.components';
import { BasePageProps, Programs } from 'src/layouts/page-content';

export default (props: BasePageProps) => (
  <StaticQuery
    query={graphql`
      query TypingTestQuery {
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
      const staticTypingTests: TypingTest[] = data.allContentfulTypingTest.edges.map(
        ({ node }) => ({ ...node, passage: node.passage.passage }),
      );
      const sections = getSortedSectionsByCategory(staticTypingTests);

      return (
        <>
          <Helmet>
            <title>Terrible Online Typing Tests</title>
          </Helmet>
          <Programs columns={1}>
            <Program title='Instructions'>
              <p>
                <strong>Welcome to the worst typing tests online!</strong>
              </p>
              <p>
                Some people can type as many as <em>360 words per minute</em>!
                Crazy! How fast can you type?
              </p>
              <p>Take the tests below and challenge yourself for hours!</p>
            </Program>
            <Program title='Select a Typing Test' style={{ maxWidth: 550 }}>
              {sections.map(({ category, typingTests }) => (
                <TypingTestGallery
                  key={category}
                  heading={category}
                  typingTests={typingTests}
                />
              ))}
            </Program>
          </Programs>
        </>
      );
    }}
  />
);

function getSortedSectionsByCategory(typingTests: TypingTest[]) {
  const categoryMap: { [key: string]: TypingTest[] } = {};

  typingTests.forEach(test => {
    test.categories.forEach(category => {
      if (!categoryMap[category]) {
        categoryMap[category] = [];
      }
      categoryMap[category].push(test);
    });
  });

  const sections = Object.entries(categoryMap).map(
    ([category, typingTests]) => ({
      category,
      typingTests,
    }),
  );

  sections.sort(({ category: k1 }, { category: k2 }) => k1.localeCompare(k2));

  sections.forEach(({ typingTests }) =>
    typingTests.sort(({ title: k1 }, { title: k2 }) => k1.localeCompare(k2)),
  );

  return sections;
}

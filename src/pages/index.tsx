import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import * as React from 'react';
import { ButtonLink } from '../components/atoms/button/button.components';
import { Program } from '../components/desktop/program/program.components';
import { BasePageProps, Programs } from 'src/layouts/page-content';

export default (props: BasePageProps) => (
  <StaticQuery
    query={graphql`
      query HomePageQuery {
        allContentfulPerson {
          edges {
            node {
              firstName
              lastName
              welcomeBlurb {
                json
              }
            }
          }
        }
      }
    `}
    render={data => {
      return (
        <>
          <Helmet>
            <title>Home</title>
          </Helmet>
          <Programs columns={3}>
            <Program title='Programs'>
              <p>
                <ButtonLink to='/code/terrible-hack-bot'>
                  TerribleHack Bot
                </ButtonLink>
              </p>
              <p>
                <ButtonLink to='/terrible-online-typing-tests'>
                  Terrible Online Typing Tests
                </ButtonLink>
              </p>
              <p>
                <ButtonLink to='/terrible-tic-tac-toe'>
                  Terrible Tic-Tac-Toe
                </ButtonLink>
              </p>
            </Program>
            <Program
              title='Easy Explanations of Things for Developers'
              gridColSpan={3}
            >
              {/* TODO: Contentful query */}
              <p>
                <ButtonLink
                  to='/posts/msdos-compilation-in-linux'
                  multiline={true}
                >
                  An Easy Explanation of MS-DOS Compilation for the Liberated
                  Linux Developer
                </ButtonLink>
              </p>
            </Program>
          </Programs>
        </>
      );
    }}
  />
);

import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import * as React from 'react';
import { ButtonLink } from '../components/atoms/button/button.components';
import {
  Program,
  ProgramRichTextDocumentRenderer,
} from '../components/desktop/program/program.components';
import { BasePageProps, Programs } from 'src/layouts/page-content';
import badge_www from '../assets/images/badge_www.gif';
import badge_netscape from '../assets/images/badge_netscape.gif';
import badge_noframes from '../assets/images/badge_noframes.gif';

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
      const { node: person } = data.allContentfulPerson.edges.find(
        ({ node: { firstName, lastName } }) =>
          firstName === 'Simon' && lastName === 'Tang',
      );
      const welcomeBlurb =
        person && person.welcomeBlurb && person.welcomeBlurb.json;
      return (
        <>
          <Helmet>
            <title>Home</title>
          </Helmet>
          <Programs columns={3}>
            {/* <Program title='Welcome' gridColSpan={3}>
              <p>
                <strong>
                  {person.firstName} {person.lastName}
                </strong>
              </p>
              <ProgramRichTextDocumentRenderer
                richTextDocument={welcomeBlurb}
              />
            </Program> */}
            <Program title='Badges'>
              <p style={{ whiteSpace: 'nowrap' }}>
                <img src={badge_www} alt='World Wide Web badge' />
                <img src={badge_netscape} alt='Netscape 3.0 badge' />
                <img
                  src={badge_noframes}
                  alt='"Campaign against frames" badge'
                />
              </p>
            </Program>
            <Program title='Programs'>
              <p>
                <ButtonLink to='/code/terrible-hack-bot'>
                  TerribleHack Bot
                </ButtonLink>
              </p>
              <p>
                <ButtonLink to='/typing-test'>Typing Test</ButtonLink>
              </p>
            </Program>
            <Program
              title='Easy Explanations of Things for Developers'
              gridColSpan={3}
            >
              {/* TODO: Contentful query */}
              <p>
                <ButtonLink
                  to='/posts/tfsa-limits-in-javascript'
                  multiline={true}
                >
                  An Easy Explanation of TFSA Contribution Limits for the Modern
                  JavaScript Developer
                </ButtonLink>
              </p>
              <p>
                <ButtonLink
                  to='/posts/msdos-compilation-in-linux'
                  multiline={true}
                >
                  An Easy Explanation of MS-DOS Compilation for the Liberated
                  Linux Developer
                </ButtonLink>
              </p>
              <p>
                <em>
                  Coming soon: An Easy Explanation of UWaterloo Residence Meal
                  Plans for the Enlightened Racket Developer
                </em>
              </p>
            </Program>
          </Programs>
        </>
      );
    }}
  />
);

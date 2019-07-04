import { INLINES } from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import * as React from 'react';
import { ButtonLink } from '../components/controls/button/button.components';
import { Program } from '../components/desktop/program/program.components';
import { BasePageProps, Programs } from 'src/layouts/page-content';
import badge_www from '../assets/images/badge_www.gif';
import badge_netscape from '../assets/images/badge_netscape.gif';
import badge_noframes from '../assets/images/badge_noframes.gif';

const homeRendererOptions: Options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      const uri = node.data.uri;
      if (
        Array.isArray(children) &&
        children.length === 1 &&
        typeof children[0] === 'string'
      ) {
        // Link text: [label]
        const m = (children[0] as string).match(/^\[(.*)]$/);
        if (m) {
          const label = m[1];
          return <ButtonLink to={uri}>{label}</ButtonLink>;
        }
      }
      return (
        <a href={uri} target='_blank' rel='noopener'>
          {children}
        </a>
      );
    },
  },
};

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
            <Program title='Welcome' gridColSpan={3}>
              <p>
                <strong>
                  {person.firstName} {person.lastName}
                </strong>
              </p>
              {documentToReactComponents(welcomeBlurb, homeRendererOptions)}
            </Program>
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
            </Program>
            <Program
              title='Easy Explanations of Things for Developers'
              gridColSpan={3}
            >
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
                <em>
                  Coming soon: An Easy Explanation of UWaterloo Residence Meal
                  Plans for the Enlightened Racket Developer
                </em>
              </p>
              <p>
                <em>
                  Coming soon: An Easy Explanation of MS-DOS Compilation for the
                  Liberated Linux Developer
                </em>
              </p>
            </Program>
          </Programs>
        </>
      );
    }}
  />
);

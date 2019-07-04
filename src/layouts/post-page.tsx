import { INLINES, MARKS, Document } from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Program } from 'src/components/desktop/program/program.components';
import { Programs } from 'src/layouts/page-content';
import { ButtonLink } from 'src/components/controls/button/button.components';
import { ContentTheme } from 'src/theme/content.theme';
import { DesktopTheme } from 'src/theme/desktop.theme';

type PostPageProps = {
  pageContext: {
    slug: string;
    title: string;
    bodyJson: Document;
  };
};

const postRendererOptions: Options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      const uri: string = node.data.uri;
      if (
        Array.isArray(children) &&
        children.length === 1 &&
        typeof children[0] === 'string'
      ) {
        // If link text is "[label]""
        const m = (children[0] as string).match(/^\[(.*)]$/);
        if (m) {
          const label = m[1];
          const icon = uri.includes('github.com') ? (
            <>
              <FontAwesomeIcon icon={faGithub} />{' '}
            </>
          ) : null;
          return (
            <ButtonLink to={uri}>
              {icon}
              {label}
            </ButtonLink>
          );
        }
      }
      return (
        <a href={uri} target='_blank' rel='noopener'>
          {children}
        </a>
      );
    },
  },
  renderMark: {
    [MARKS.CODE]: text => {
      const isBlock = typeof text === 'string' && text.includes('\n');
      return <code className={isBlock ? 'isBlock' : ''}>{text}</code>;
    },
  },
};

const PostBodyWrapper = styled.main`
  & > :first-child {
    margin-top: ${DesktopTheme.spacing.paddingProgram};
  }
  & > :last-child {
    margin-bottom: ${DesktopTheme.spacing.paddingProgram};
  }
  h2 {
    font-size: 1.3em;
  }
  code {
    background-color: ${ContentTheme.colors.bkgCodeInline};
  }
  code.isBlock {
    display: block;
    padding: 1em;
    white-space: pre-wrap;
    background-color: ${ContentTheme.colors.bkgCodeBlock};
  }
  @media print {
    code,
    code.isBlock {
      background-color: white;
      outline: 1px black solid;
    }
  }
`;

const PostPage = ({ pageContext: { title, bodyJson } }: PostPageProps) => {
  const pageTitle = title.replace('An Easy Explanation of ', '');
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Programs>
        <Program title={title}>
          <PostBodyWrapper>
            {documentToReactComponents(bodyJson, postRendererOptions)}
          </PostBodyWrapper>
        </Program>
      </Programs>
    </>
  );
};

export default PostPage;

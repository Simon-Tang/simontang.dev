import { INLINES, MARKS, Document } from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import * as React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { AspectIframe } from 'src/components/controls/aspect-iframe';
import { ButtonLink } from 'src/components/controls/button/button.components';
import { Program } from 'src/components/desktop/program/program.components';
import { Programs } from 'src/layouts/page-content';
import { ContentTheme } from 'src/theme/content.theme';
import { DesktopTheme } from 'src/theme/desktop.theme';

type ProjectPageProps = {
  pageContext: {
    title: string;
    projectIframeUrl: string;
    layout: 'narrow-frame' | 'theatre-frame';
    descriptionTitle: string;
    descriptionBodyJson: Document;
    linksBodyJson: Document;
  };
};

const projectRendererOptions: Options = {
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
  renderMark: {
    [MARKS.CODE]: text => {
      const isBlock = typeof text === 'string' && text.includes('\n');
      return <code className={isBlock ? 'isBlock' : ''}>{text}</code>;
    },
  },
};

const ProjectBodyWrapper = styled.main`
  & > :first-child {
    margin-top: 0;
  }
  & > :last-child {
    margin-bottom: 0;
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

const ProjectPage = ({
  pageContext: {
    title,
    projectIframeUrl,
    layout,
    descriptionTitle,
    descriptionBodyJson,
    linksBodyJson,
  },
}: ProjectPageProps) => {
  let cols;
  let flow: 'column' | 'row';
  if (layout === 'narrow-frame') {
    flow = 'column';
    cols = 2;
  } else {
    flow = 'row';
    cols = 3;
  }

  const titleElement = projectIframeUrl.includes('terriblehack.website') ? (
    <span
      style={{
        color: '#00efff',
        fontFamily: DesktopTheme.fontFamilies.comic,
        fontSize: '1.125em',
        textTransform: 'none',
      }}
    >
      {title}
    </span>
  ) : (
    title
  );

  let iframeProgram;
  if (layout === 'narrow-frame') {
    iframeProgram = (
      <Program title={titleElement} gridColSpan={1} gridRowSpan={2} nopadding>
        <iframe
          style={{
            maxHeight: 'calc(100vh - 150px)',
            width: 375,
            height: 600,
          }}
          src={projectIframeUrl}
          sandbox='allow-scripts'
        ></iframe>
      </Program>
    );
  } else {
    iframeProgram = (
      <Program
        title={titleElement}
        gridColSpan={3}
        gridRowSpan={1}
        nopadding
        style={{ width: '100vw', maxWidth: 700 }}
      >
        <AspectIframe
          ratio={4 / 3}
          src={projectIframeUrl}
          iframeProps={{ sandbox: 'allow-scripts' }}
        />
      </Program>
    );
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Programs columns={cols} gridFlow={flow}>
        {layout !== 'narrow-frame' && iframeProgram}
        <Program title={descriptionTitle}>
          <ProjectBodyWrapper>
            {documentToReactComponents(
              descriptionBodyJson,
              projectRendererOptions,
            )}
          </ProjectBodyWrapper>
        </Program>
        <Program title='Links'>
          <ProjectBodyWrapper>
            {documentToReactComponents(linksBodyJson, projectRendererOptions)}
          </ProjectBodyWrapper>
        </Program>
        {layout === 'narrow-frame' && iframeProgram}
      </Programs>
    </>
  );
};

export default ProjectPage;

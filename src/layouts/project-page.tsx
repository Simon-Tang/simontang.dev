import { Document } from '@contentful/rich-text-types';
import * as React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { AspectIframe } from 'src/components/atoms/aspect-iframe';
import {
  Program,
  ProgramRichTextDocumentRenderer,
} from 'src/components/desktop/program/program.components';
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
            <ProgramRichTextDocumentRenderer
              richTextDocument={descriptionBodyJson}
            />
          </ProjectBodyWrapper>
        </Program>
        <Program title='Links'>
          <ProjectBodyWrapper>
            <ProgramRichTextDocumentRenderer richTextDocument={linksBodyJson} />
          </ProjectBodyWrapper>
        </Program>
        {layout === 'narrow-frame' && iframeProgram}
      </Programs>
    </>
  );
};

export default ProjectPage;

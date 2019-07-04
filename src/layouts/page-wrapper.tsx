import { StaticQuery, graphql } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';
import { DesktopWrapper, DesktopBodyWrapper } from '../components/desktop';
import { Navbar } from '../components/desktop/navbar/navbar.components';

type PageWrapperProps = {
  children: React.ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => (
  <StaticQuery
    query={graphql`
      query PageWrapperQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <DesktopWrapper>
        <Helmet
          defaultTitle={data.site.siteMetadata.title}
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
        >
          <html lang='en' />
        </Helmet>
        <Navbar />
        <DesktopBodyWrapper>{children}</DesktopBodyWrapper>
      </DesktopWrapper>
    )}
  />
);

export default PageWrapper;

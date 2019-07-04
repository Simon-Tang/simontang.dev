import Helmet from 'react-helmet';
import * as React from 'react';
import { ButtonLink } from 'src/components/controls/button/button.components';
import { Program } from 'src/components/desktop/program/program.components';
import { BasePageProps, Programs } from 'src/layouts/page-content';

export default (props: BasePageProps) => (
  <>
    <Helmet>
      <title>Page not found</title>
    </Helmet>
    <Programs>
      <Program title='Page not found'>
        <p>
          This site has encountered a broken URL. <br />
          We are sorry for the inconvenience.
        </p>
        <p style={{ display: 'flex' }}>
          <div style={{ margin: 'auto' }}>
            <ButtonLink to='mailto:simon-tang@outlook.com'>
              Send Error Report
            </ButtonLink>
            &nbsp;
            <ButtonLink to='/'>Don't Send</ButtonLink>
          </div>
        </p>
      </Program>
    </Programs>
  </>
);

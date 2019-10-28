import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { Options } from '@contentful/rich-text-react-renderer';
import * as React from 'react';
import { ButtonLink } from '../../atoms/button/button.components';

export const PROGRAM_RICH_TEXT_RENDER_OPTIONS: Options = {
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

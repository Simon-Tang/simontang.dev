import TransitionLink from 'gatsby-plugin-transition-link';
import * as React from 'react';
import { GlobalTheme } from '../../theme/global.theme';

type PageTransitionLinkProps = {
  children: React.ReactNode;
  className: string;
  to: string;
};

const { pageTransitions } = GlobalTheme;

export const PageTransitionLink = ({
  children,
  className,
  to,
}: PageTransitionLinkProps) => (
  <TransitionLink
    className={className}
    to={to}
    entry={{
      length: pageTransitions.duration,
      delay: pageTransitions.duration,
    }}
    exit={{ length: pageTransitions.duration }}
  >
    {children}
  </TransitionLink>
);

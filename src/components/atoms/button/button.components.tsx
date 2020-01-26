import { OutboundLink } from 'gatsby-plugin-google-analytics';
import styled from 'styled-components';
import * as React from 'react';
import { DesktopTheme } from 'src/theme/global.theme';
import { PageTransitionLink } from '../utils';

const { borders, colors, fontFamilies, fontSizes } = DesktopTheme;

export const Button = styled.button<{ multiline?: boolean }>`
  display: inline-block;
  padding: 4px 8px;
  border-width: 2px;
  border-style: solid;
  border-color: ${borders.bezelNormal};
  background: ${colors.bkg};
  font-family: ${fontFamilies.vcr};
  font-size: ${fontSizes.button};
  color: black;

  ${({ multiline }) =>
    multiline
      ? `display: block;`
      : `
      // HACK - mitigate effect of FOUC on navigation
      height: 26px;
      white-space: nowrap;
    `}

  :focus {
    background: ${colors.bkgHighlight};
  }
  :active {
    background: ${colors.bkgActive};
  }
  :disabled {
    background: ${colors.bkgDisabled};
  }
`;

type ButtonLinkProps = { to: string; multiline?: boolean };

const OuterLink = ({
  children,
  className,
  to,
}: {
  children: any;
  className: string;
  to: string;
}) => (
  <OutboundLink
    className={className}
    href={to}
    rel='noopener noreferrer'
    target={to.startsWith('mailto:') ? '_self' : '_blank'}
  >
    {children}
  </OutboundLink>
);

export const ButtonLink = styled(Button).attrs<ButtonLinkProps>(({ to }) => ({
  as:
    to.startsWith('http') || to.startsWith('mailto:')
      ? OuterLink
      : PageTransitionLink,
}))<ButtonLinkProps>`
  text-decoration: none;
  &:active {
  }

  ${({ multiline }) =>
    multiline
      ? ``
      : `
        // HACK - mitigate effect of FOUC on navigation
        height: 14px;
      `}
`;

export const TwitterSocialLink = ({
  children,
  tweet,
  url,
  hashtags = [],
}: {
  children: string;
  tweet: string;
  url: string;
  hashtags?: string[];
}) => {
  const textE = encodeURIComponent(tweet);
  const urlE = encodeURIComponent(url);
  const hashtagsE = encodeURIComponent(hashtags.join(','));
  return (
    <ButtonLink
      to={`https://twitter.com/share?text=${textE}&url=${urlE}/&hashtags=${hashtagsE}`}
    >
      {children}
    </ButtonLink>
  );
};

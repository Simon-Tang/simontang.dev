import styled from 'styled-components';
import { ResumeTheme, DesktopTheme } from '../../../theme/global.theme';
import { DocSheet } from '../docsheet';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

const { colors, fontWeights, spacing } = ResumeTheme;

const BaseHeading = styled.span`
  display: flex;
  font-weight: ${fontWeights.heavy};
`;

export const RH1 = styled(BaseHeading).attrs({ as: 'h1' })`
  margin: 0.125in 0 0 0;
  font-size: 1.875rem;
`;

export const RH2 = styled(BaseHeading).attrs({ as: 'h2' })`
  margin: 0.125in 0 0.0625in 0;
  font-size: 1.15rem;

  ${RH1} + & {
    margin-top: 0;
  }
`;

export const RH3 = styled(BaseHeading).attrs({ as: 'h3' })`
  margin: 0.125in 0 0.0625in 0;
  font-size: 1rem;
`;

export const RP = styled.p`
  display: flex;
  line-height: 1;
  margin: 0 0 0.5rem 0;
`;

export const RHDivider = styled.span.attrs({
  role: 'presentation',
})`
  padding: 0 0.5rem;
  ::before {
    content: '|';
  }
`;

export const ResumeSheetWrapper = styled(DocSheet).attrs({
  overflowY: true,
})`
  font-family: ${ResumeTheme.fontFamily};

  @media screen {
    &:not(:last-child) {
      margin-bottom: ${DesktopTheme.spacing.programGap};
    }
  }
`;

export const RColumn = styled.div<{ split: number }>`
  width: ${({ split }) => split * 100}%;
  padding: 0 0.15in 0 0;
  & + & {
    width: ${({ split }) => 100 - split * 100}%;
    padding: 0 0 0 0.15in;
  }
`;

export const RHeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  background: ${colors.primary};
  color: white;
  padding: ${spacing.pageGutterY} ${spacing.pageGutterX};
`;

export const RHeaderName = styled.div`
  font-size: 3.5rem;
  line-height: 1.15;
`;

export const RHeaderSubtitle = styled.div`
  font-size: 1.3rem;
`;

export const RHeaderContactLinkHighlight = styled.span`
  font-weight: ${fontWeights.heavy};
`;

export const RAddressLink = styled(OutboundLink).attrs(({ href }) => ({
  target: href && href.startsWith('mailto:') ? '_self' : '_blank',
  rel: 'noopener noreferrer',
}))`
  display: block;
  font-style: normal;
  font-size: 1rem;
  line-height: 1.2;
  text-decoration: none;
  color: ${colors.primaryHighlight};

  &:first-child {
    padding-top: 0.1in;
  }

  &:last-child {
    margin-top: 1em;
    position: absolute;
  }

  svg {
    color: ${colors.primaryHighlight};
    margin-right: 0.25rem;
  }

  :hover > * {
    color: white;
    transition: color 0.15s ease;
  }

  @media screen {
    .print {
      display: none;
    }
  }

  @media print {
    .screen {
      display: none;
    }
  }
`;

export const RAddressText = styled.span<{ short: string }>`
  margin-left: 0.25rem;
`;

export const RMainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  background: white;
  color: ${colors.primary};
  padding: 0.125in ${spacing.pageGutterX} ${spacing.pageGutterY}
    ${spacing.pageGutterX};
`;

export const RExperienceTitleWrapper = styled(RH2)`
  a {
    color: ${colors.bodyLink};
    text-decoration: none;
  }
  a:hover {
    color: ${colors.bodyLinkHover};
  }
  [role='presentation'] {
    white-space: pre;
  }
  .position {
  }
  .range {
    font-size: 1.1rem;
    font-weight: ${fontWeights.regular};
    margin-left: auto;
  }
`;

export const RExperienceCaptionP = styled(RP)`
  margin: 0;
  line-height: normal;
`;

export const RExperienceTitleLink = styled(OutboundLink).attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  color: ${colors.bodyLink};
  text-decoration: none;
  transition: color 0.15s ease;
  :hover {
    color: ${colors.bodyLinkHover};
  }
`;

export const RExperienceListWrapper = styled.ul`
  margin: 0;
  padding-left: 0.3in;
`;

export const RExperienceListItem = styled.li`
  margin-right: 0.55in;
`;

export const RExperienceListItemLink = styled(RExperienceTitleLink)`
  font-weight: ${fontWeights.heavy};
`;

export const REducationItemWrapper = styled.div`
  display: flex;
  align-items: baseline;
  ${RH3} {
    margin: 0 0 0.25rem 0;
  }
  & > div {
    margin-left: 1rem;
  }
`;

export const REducationListItem = styled.li`
  font-size: 0.9rem;
  line-height: 1.2;
  display: inline-block;
  text-transform: capitalize;

  :not(:last-child)::after {
    content: '·';
    padding: 0 0.25rem;
  }
`;

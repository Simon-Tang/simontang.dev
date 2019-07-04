import styled from 'styled-components';
import { DesktopTheme, GlobalTheme } from '../../../theme/global.theme';
import { ButtonLink, Button } from '../../controls/button/button.components';

const { fontFamilies, fontSizes } = DesktopTheme;

export const NavbarWrapper = styled.nav`
  position: sticky;
  top: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: ${GlobalTheme.zIndexes.nav};
  display: flex;

  font-family: ${fontFamilies.dejavu};

  @media print {
    display: none;
  }
`;

export const NavSpacer = styled.div`
  flex: 1;
`;

export const NavLinkList = styled.ul`
  margin: 0;
  padding: 0;
`;

export const NavLi = styled.li`
  list-style: none;
  display: inline;
`;

export const NavButton = styled(Button)`
  font-size: ${fontSizes.navbar};
`;

export const NavButtonLink = styled(ButtonLink)`
  font-size: ${fontSizes.navbar};
`;

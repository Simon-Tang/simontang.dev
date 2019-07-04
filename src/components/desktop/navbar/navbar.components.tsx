import * as React from 'react';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  NavbarWrapper,
  NavSpacer,
  NavLinkList,
  NavLi,
  NavButton,
  NavButtonLink,
} from './navbar.styles';
import { NavLinkProps } from './navbar.types';

const NavLink = ({ children, to }: NavLinkProps) => (
  <NavLi>
    <NavButtonLink to={to} children={children} />
  </NavLi>
);

export const Navbar = () => (
  <NavbarWrapper>
    <NavLinkList>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/resume/'>Resume</NavLink>
    </NavLinkList>
    <NavSpacer />
    <NavButton onClick={() => window.print()}>
      <FontAwesomeIcon icon={faPrint} /> PDF
    </NavButton>
  </NavbarWrapper>
);

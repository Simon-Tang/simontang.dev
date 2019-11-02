import styled from 'styled-components';
import { PContent } from 'src/components/desktop/program/program.styles';
import { Programs } from 'src/layouts/page-content';
import { DesktopTheme } from 'src/theme/global.theme';

export const StyledInteractiveTypingTest = styled(Programs)`
  grid-template-areas:
    'passage passage passage'
    'sponsoredA sponsoredA sponsoredA'
    'input input input'
    'sponsoredB sponsoredC sponsoredD'
    'sponsoredE sponsoredF sponsoredG'
    'sponsoredH sponsoredH sponsoredH';

  .passage {
    grid-area: passage;
  }

  .input-window {
    width: auto;
    grid-area: input;
  }

  .sponsored {
    img {
      width: 100%;
      vertical-align: bottom;
    }
    &.A {
      grid-area: sponsoredA;
    }
    &.B {
      grid-area: sponsoredB;
    }
    &.C {
      grid-area: sponsoredC;
    }
    &.D {
      grid-area: sponsoredD;
    }
    &.E {
      grid-area: sponsoredE;
    }
    &.F {
      grid-area: sponsoredF;
    }
    &.G {
      grid-area: sponsoredG;
    }
    &.H {
      grid-area: sponsoredH;
    }
  }

  @media screen and (min-width: ${DesktopTheme.breakpoints.desktopWide}) {
    grid-template-rows: repeat(5, auto) 1fr;
    grid-template-areas:
      'passage passage passage passage'
      'sponsoredA sponsoredA sponsoredA sponsoredA'
      'sponsoredB input input sponsoredE'
      'sponsoredB sponsoredC sponsoredD sponsoredE'
      'sponsoredF sponsoredC sponsoredD sponsoredG'
      'sponsoredF sponsoredH sponsoredH sponsoredG';
    .sponsored.H {
      width: auto;
      height: auto;
      ${PContent} {
        height: 100%;
      }
      img {
        max-width: 100%;
        height: 100%;
      }
    }
  }
`;

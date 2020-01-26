import styled from 'styled-components';
import { PContent } from 'src/components/desktop/program/program.styles';
import { Programs } from 'src/layouts/page-content';
import { DesktopTheme } from 'src/theme/global.theme';

export const StyledInteractiveTypingTest = styled(Programs)`
  grid-template-areas:
    'passage passage passage'
    'input input input'
    /*
    'sponsoredA sponsoredB sponsoredC'
    'sponsoredD sponsoredE sponsoredF'
    'sponsoredG sponsoredG sponsoredG'
    'sponsoredH sponsoredH sponsoredH'*/;

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
    grid-template-areas:
      'passage passage passage passage'
      'sponsoredA input input sponsoredD'
      /*'sponsoredA sponsoredB sponsoredC sponsoredD'
      'sponsoredE sponsoredB sponsoredC sponsoredF'
      'sponsoredE sponsoredG sponsoredG sponsoredF'
      'sponsoredH sponsoredH sponsoredH sponsoredH'*/;
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

export const StyledControlPanel = styled.div`
  display: grid;
  grid-gap: ${DesktopTheme.spacing.paddingProgram};
  grid-template-areas:
    'input input input input restart'
    'progress progress progress progress progress'
    'results results results results results';
  grid-template-columns: repeat(4, 1fr) min-content;

  .input {
    grid-area: input;
  }

  .restart {
    grid-area: restart;
  }

  .progress {
    grid-area: progress;
  }

  .results {
    grid-area: results;
  }
`;

export const StyledPassageWord = styled.span<{
  hasError: boolean;
  isActive: boolean;
}>`
  ${({ isActive }) => isActive && `background: black; color: white;`}
  ${({ hasError }) => hasError && `background: #c01234; color: white;`}
`;

export const StyledPassageLine = styled.div<{ isParagraphStart: boolean }>`
  white-space: nowrap;
  ${({ isParagraphStart }) =>
    isParagraphStart &&
    `
    // &:not(:first-child) {
    //   margin-top: 2ex;
    // }
    `}
`;

export const StyledPassageRenderer = styled.div<{ maxLines: number }>`
  overflow: hidden;
  height: ${({ maxLines }) => maxLines * 2.1}ex;
`;

export const StyledTestResults = styled.div``;

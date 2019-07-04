import styled from 'styled-components';

export const DesktopWrapper = styled.div`
  @media screen {
    min-height: 100vh;
    background-attachment: fixed;
    background-image: radial-gradient(rgb(238, 238, 238), rgb(136, 136, 136));
  }
  display: flex;
  flex-direction: column;
`;

export const DesktopBodyWrapper = styled.div`
  @media screen {
    padding: 15mm 0;
  }
  flex: 1;
  display: flex;

  /* Workaround: gatsby-plugin-transition-link */
  & > .tl-edges {
    /* Center in screen */
    margin: auto;

    /* Prevent layout bug during browser popevent */
    > :nth-child(2) {
      display: none;
    }
  }

  @media screen {
    & > .tl-edges {
      /* Display box-shadows */
      padding: 20px;
    }
  }

  @media print {
    .tl-edges,
    .tl-wrapper {
      margin: 0;
      padding: 0;
    }
  }
`;

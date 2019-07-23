import * as React from 'react';
import styled from 'styled-components';

const RatioDiv = styled.div<{ ratio: number; width?: number }>`
  padding-top: ${({ ratio }) => 100 / ratio}%;
  position: relative;
  ${({ width }) => (width ? `width: ${width}px` : '')};
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
`;

type AspectIframeProps = {
  ratio: number;
  width?: number;
  src: string;
  iframeProps: React.IframeHTMLAttributes<Element>;
};

export class AspectIframe extends React.Component<AspectIframeProps> {
  render() {
    const { ratio, width, src, iframeProps } = this.props;
    return (
      <RatioDiv ratio={ratio} width={width}>
        <Iframe src={src} {...iframeProps} />
      </RatioDiv>
    );
  }
}

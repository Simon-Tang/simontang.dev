declare module 'gatsby-plugin-transition-link' {
  export type TransitionStateChildProps = {
    transitionStatus: 'entering' | 'entered' | 'exiting' | 'exited';
  };

  export interface TransitionStateProps {
    children: (props: TransitionStateChildProps) => React.ReactNode;
  }

  export class TransitionState extends React.Component<TransitionStateProps> {}

  export interface TransitionLinkProps {
    children: React.ReactNode;
  }

  export class TransitionLink extends React.Component<TransitionLinkProps> {}
}

export type ProgramWrapperProps = {
  gridColSpan?: number;
  gridRowSpan?: number;
  transitionStatus: TransitionStatus;
};

export type ProgramProps = {
  style?: React.CSSProperties;
  title: React.ReactNode;
  children: React.ReactNode;
  nopadding?: boolean;
  gridColSpan?: number;
  gridRowSpan?: number;
};

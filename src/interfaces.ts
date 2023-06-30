export interface BlinkProps {
  elements: Array<string>;
  color?: string; // default red
  radiusNodes?: {
    radius: number; // default 100
    isAPercentage: boolean; // is a percentage or an absolute
  };
  widthEdges?: {
    width: number; // default 10
    isAPercentage: boolean; // is a percentage or an absolute
  };
  duration?: number; // default 1 second
  times?: number; // default 3
  selectAtTheEnd?: boolean; // default true
}

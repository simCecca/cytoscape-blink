export interface BlinkProps {
  nodes: Array<string>;
  color?: string; // default red
  radius?: number; // default 100
  duration?: number; // default 1 second
  times?: number; // default 3
}

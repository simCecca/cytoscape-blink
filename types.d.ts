import "cytoscape";
import cytoscape from "cytoscape";
import { BlinkProps } from "./src/interfaces";

declare module "cytoscape" {
  interface Core {
    blink: (props: BlinkProps) => cytoscape.Core;
  }
}

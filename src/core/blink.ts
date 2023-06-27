import { Core, ElementDefinition, NodeSingular } from "cytoscape";
import { BlinkProps } from "../interfaces";

function blink(props: BlinkProps): Core {
  const cy: Core = this;
  // do your functionality here
  const cyNodes: Array<ElementDefinition> = [];
  for (const nodeId of props.nodes) {
    const cyNode: NodeSingular = cy.$("#" + nodeId);
    if (cyNode) {
      const cyPositions = cyNode.position();
      const fakeNode = cy.$("#fakeNode" + nodeId);
      if ((!fakeNode || fakeNode.length == 0) && cyPositions) {
        cyNodes.push({
          data: { id: "fakeNode" + nodeId },
          position: { x: cyPositions.x, y: cyPositions.y },
          css: { "z-compound-depth": "bottom" },
        });
      }
    }
  }
  const color = props.color || "red";
  const animate = {
    style: {
      "background-color": color,
      width: 100,
      height: 100,
    },
    duration: 1000,
  };
  cy.add(cyNodes)
    .animate(animate)
    .animate(animate)
    .animate(animate, {
      complete: () => {
        cy.startBatch();
        cyNodes.forEach((node) => {
          const cyN = cy.$("#" + node.data.id);
          cy.remove(cyN);
        });
        cy.endBatch();
      },
    });

  return this;
}

export default blink;

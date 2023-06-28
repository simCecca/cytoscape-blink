import { Core, ElementDefinition, NodeSingular } from "cytoscape";
import { BlinkProps } from "../interfaces";

function blink({ nodes, color, radius, duration }: BlinkProps): Core {
  const cy: Core = this;
  // do your functionality here
  const cyNodes: Array<ElementDefinition> = [];
  const cyNodesInGraph: Array<NodeSingular> = [];
  for (const nodeId of nodes) {
    const cyNode: NodeSingular = cy.$("#" + nodeId);
    if (cyNode) {
      cyNodesInGraph.push(cyNode);
      const cyPositions = cyNode.position();
      const fakeNode = cy.$("#fakeNode" + nodeId);
      if ((!fakeNode || fakeNode.length == 0) && cyPositions) {
        cyNodes.push({
          data: { id: "fakeNode" + nodeId },
          position: cyPositions,
        });
      }
    }
  }
  const cColor = color || "red";
  const animate = {
    style: {
      "background-color": cColor,
      width: radius || 100,
      height: radius || 100,
    },
    duration: duration | 1000,
  };

  cy.add(cyNodes)
    .style({ "z-compound-depth": "bottom", label: ".", "font-size": 0 })
    .animate(animate)
    .animate(animate)
    .animate(animate, {
      complete: () => {
        cy.startBatch();
        cyNodes.forEach((node) => {
          const cyN = cy.$("#" + node.data.id);
          cy.remove(cyN);
        });
        cyNodesInGraph.forEach((node) => {
          node.select();
        });
        cy.endBatch();
      },
    });

  return this;
}

export default blink;

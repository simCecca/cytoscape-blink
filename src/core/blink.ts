import { Core, EdgeSingular, ElementDefinition, NodeSingular } from "cytoscape";
import { BlinkProps } from "../interfaces";

let inExecution = false;

const updateGeneralExecution = (nodes, edges) => {
  if (!nodes && !edges) {
    inExecution = false;
  }
};

function blink({
  elements,
  color,
  radiusNodes,
  radiusEdges,
  duration,
  selectAtTheEnd,
  times,
}: BlinkProps): Core {
  try {
    if (inExecution) {
      return;
    }
    inExecution = true;

    const cy: Core = this;
    // do your functionality here
    const cTimes = times | 3;
    const cyNodes: Array<ElementDefinition> = [];
    const cyNodesInGraph: Array<NodeSingular> = [];
    const cyEdgesInGraph: Array<EdgeSingular> = [];
    for (const elementId of elements) {
      const cyElement: NodeSingular | EdgeSingular = cy.$("#" + elementId);
      if (cyElement) {
        const fakeDataCreation: ElementDefinition = {
          data: { id: "fakeElement" + elementId },
        };
        const fakeElement = cy.$("#fakeElement" + elementId);
        if (!fakeElement || fakeElement.length == 0) {
          if (cyElement.isNode()) {
            cyNodesInGraph.push(cyElement);
            const cyPositions = cyElement.position();
            fakeDataCreation.position = cyPositions;
            cyNodes.push(fakeDataCreation);
          } else {
            cyEdgesInGraph.push(cyElement);
          }
        }
      }
    }
    const cColor = color || "red";
    const animateNodes = {
      style: {
        "background-color": cColor,
        "line-color": cColor,
        width: radiusNodes.radius || 100,
        height: radiusNodes.radius || 100,
      },
      duration: duration | 1000,
    };

    let nodesInExecution = cyNodes.length > 0;
    let edgesInExecution = cyEdgesInGraph.length > 0;
    cy.add(cyNodes)
      .style({ "z-compound-depth": "bottom", label: ".", "font-size": 0 })
      .animate(animateNodes)
      .animate(animateNodes)
      .animate(animateNodes, {
        complete: () => {
          cy.startBatch();
          cyNodes.forEach((element) => {
            const cyN = cy.$("#" + element.data.id);
            cy.remove(cyN);
          });
          if (selectAtTheEnd != undefined && selectAtTheEnd) {
            cyNodesInGraph.forEach((element) => {
              element.select();
            });
          }
          nodesInExecution = false;
          updateGeneralExecution(nodesInExecution, edgesInExecution);
          cy.endBatch();
        },
      });

    cy.startBatch();
    cyEdgesInGraph.forEach((edge) => {
      const style = edge.style();
      const width = style.width;
      const color = style["line-color"];
      const splitted = (width || "").split(/(\d+)/);
      let radius = 20 + (splitted[1] || 1);
      if (
        radiusEdges &&
        splitted.length >= 3 &&
        radiusEdges.radius != undefined
      ) {
        if (radiusEdges.isAPercentage) {
          radius = (1 + radiusEdges.radius / 100) * splitted[1];
        } else if (!radiusEdges.isAPercentage) {
          radius = radiusEdges.radius + splitted[1];
        }
      }
      if (splitted[2]) {
        radius += splitted[2];
      }
      const animateEdges = {
        style: {
          "line-color": cColor,
          width: radius,
        },
        duration: duration | 1000,
      };
      edge
        .animate(animateEdges)
        .animate(animateEdges)
        .animate(animateEdges, {
          complete: () => {
            edge.style("width", width);
            edge.style("line-color", color);
            edgesInExecution = false;
            updateGeneralExecution(nodesInExecution, edgesInExecution);
          },
        });
    });
    cy.endBatch();

    return this;
  } catch (e) {
    console.error("Error in blinking: ", e);
    return this;
  }
}

export default blink;

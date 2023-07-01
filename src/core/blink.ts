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
  widthEdges,
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
    const cTimes = times || 3;
    const cyNodes: Array<ElementDefinition> = [];
    const id2cyNodeInGraph: Map<string, NodeSingular> = new Map();
    const cyEdgesInGraph: Array<EdgeSingular> = [];
    for (const elementId of elements) {
      const cyElement: NodeSingular | EdgeSingular = cy.$("#" + elementId);
      if (cyElement) {
        const fakeDataCreation: ElementDefinition = {
          data: { id: "fakeElement" + elementId, comingFrom: elementId },
        };
        const fakeElement = cy.$("#fakeElement" + elementId);
        if (!fakeElement || fakeElement.length == 0) {
          if (cyElement.isNode()) {
            id2cyNodeInGraph.set(elementId, cyElement);
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

    let nodesInExecution = cyNodes.length > 0;
    let edgesInExecution = cyEdgesInGraph.length > 0;
    cy.startBatch();
    cyNodes.forEach((cyNode) => {
      const cNodeInGraph = id2cyNodeInGraph?.get(cyNode?.data?.comingFrom);
      const style = cNodeInGraph.style();
      const width = style.width;
      const splitted = (width || "").split(/(\d+)/);
      const cWidth = Number(splitted[1] || 1);
      let radius = 100 + cWidth;
      if (
        radiusNodes &&
        splitted.length >= 3 &&
        radiusNodes.radius != undefined
      ) {
        if (radiusNodes.isAPercentage) {
          radius = (1 + radiusNodes.radius / 100) * cWidth;
        } else if (!radiusNodes.isAPercentage) {
          radius = radiusNodes.radius + cWidth;
        }
      }
      if (splitted[2]) {
        radius += splitted[2];
      }
      const animateNodes = {
        style: {
          "background-color": cColor,
          "line-color": cColor,
          width: radius,
          height: radius,
        },
        duration: duration | 1000,
      };
      const prNode = cy
        .add(cyNode)
        .style({ "z-compound-depth": "bottom", label: ".", "font-size": 0 });
      for (let i = 0; i < cTimes; i++) {
        if (i + 1 == cTimes) {
          prNode.animate(animateNodes, {
            complete: () => {
              const cyN = cy.$("#" + cyNode.data.id);
              cy.remove(cyN);

              if (
                selectAtTheEnd != undefined &&
                selectAtTheEnd &&
                cNodeInGraph
              ) {
                cNodeInGraph.select();
              }
              nodesInExecution = false;
              updateGeneralExecution(nodesInExecution, edgesInExecution);
            },
          });
        } else {
          prNode.animate(animateNodes);
        }
      }
    });
    cy.endBatch();
    cy.startBatch();
    cyEdgesInGraph.forEach((edge) => {
      const style = edge.style();
      const width = style.width;
      const color = style["line-color"];
      const splitted = (width || "").split(/(\d+)/);
      const cWidth = Number(splitted[1] || 1);
      let radius = 20 + cWidth;
      if (widthEdges && splitted.length >= 3 && widthEdges.width != undefined) {
        if (widthEdges.isAPercentage) {
          radius = (1 + widthEdges.width / 100) * cWidth;
        } else if (!widthEdges.isAPercentage) {
          radius = widthEdges.width + cWidth;
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
      for (let i = 0; i < cTimes; i++) {
        if (i + 1 == cTimes) {
          edge.animate(animateEdges, {
            complete: () => {
              edge.style("width", width);
              edge.style("line-color", color);
              if (selectAtTheEnd != undefined && selectAtTheEnd) {
                edge.select();
              }
              edgesInExecution = false;
              updateGeneralExecution(nodesInExecution, edgesInExecution);
            },
          });
        } else {
          edge.animate(animateEdges);
        }
      }
    });
    cy.endBatch();

    return this;
  } catch (e) {
    console.error("Error in blinking: ", e);
    return this;
  }
}

export default blink;

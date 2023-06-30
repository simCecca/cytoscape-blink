This is a Simple project created and maintained with the just for fun philosophy

We want to give cytoscape the possibility of blinking nodes and edges so as to highlight and distinguish them as a whole.
Given an array of ids, it blinds those nodes and edges on screen and finally highlights them

# usage

This is a core feature and can therefore be used directly from the cytoscape object
the method to call is called blink and takes the following parameters

```
elements: Array<string>; // id of the nodes and edges to blink
color?: string; // default red
radiusNodes?: { // radius to add to the nodes during the blink
  radius: number; // default 100
  isAPercentage: boolean; // specifies whether the radius to add is in percentage or in absolute value => default false
};
widthEdges?: { // width to add to the edges during the blink
  width: number; // default 10
  isAPercentage: boolean; // // specifies whether the width to add is in percentage or in absolute value => default false
};
duration?: number; // duration for each blink => default 1000 milliseconds
times?: number; // not implemented for now number of blinks for every node/edge => default 3 not implemented for now
selectAtTheEnd?: boolean; // if at the end of the blinking the nodes and edges are to be selected => default false

```

# Use it in an end application

```
import cytoscape from "cytoscape";
import blink from "cytoscape-blink;

cytoscape.use(blink);



const cy = cytoscape({
    ....
});

cy.blink({elements: [id1, id2, id3, id4], color: 'blue'});

```

If the final application uses types, then extend the Core class so as to add your functionality to the callable ones (only for typesctipt)

in this project there is a file called types.d.ts, so just bring this file into the final project to be able to extend Cytoscape Core

```
import "cytoscape";
import cytoscape from "cytoscape";
import { BlinkProps } from "cytoscape-blink";

declare module "cytoscape" {
  interface Core {
    blink: (props: BlinkProps) => cytoscape.Core;
  }
}

```

# develop mode

You can use the npm link logic for the develop mode, I think it's the easiest way, but there are many other ways.

- Inside this project, create the link

```
sudo npm link
```

- inside the project that use cytoscape with us extension

```
sudo npm link extensionPath
```

# deploy on npm

```
npm login
```

```
npm publish
```

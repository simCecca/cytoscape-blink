This is a Simple project created and maintained with the just for fun philosophy

We want to give cytoscape the possibility of blinking nodes and edges so as to highlight and distinguish them as a whole.
Given an array of ids, it blinds those nodes and edges on screen and finally highlights them

# usage

This is a core feature and can therefore be used directly from the cytoscape object
the method to call is called blink and takes the following parameters

elements: Array<string>;
color?: string; // default red
radiusNodes?: {
radius: number; // default 100
isAPercentage: boolean; // is a percentage or an absolute
};
radiusEdges?: {
radius: number; // default 10
isAPercentage: boolean; // is a percentage or an absolute
};
duration?: number; // default 1 second
times?: number; // default 3 not implemented for now
selectAtTheEnd?: boolean; // default true

Utilizzo in un applicazione finale

```
import cytoscape from "cytoscape";
import blink from "cytoscape-blink;

cytoscape.use(blink);



const cy = cytoscape({
    ....
});

cy.blink({elements: [id1, id2, id3, id4], color: 'blue'});

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

# end application

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

This is a Simple project created and maintained with the just for fun philosophy

This is a boilerplate to be able to develop an extension of type Core in cytoscape

# usage

- Clone/fork/download the repository

- Install the dependences

```
npm install
```

- Run the project

```
npm run dev
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

```
import cytoscape from "cytoscape";
import blink from "cytoscape-blink;

cytoscape.use(blink);



const cy = cytoscape({
    ....
});

cy.blink({nodes: [id1, id2, id3, id4], color: 'blue'});

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

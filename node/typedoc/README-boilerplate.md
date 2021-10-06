Project documentation. Configure at **typedoc.json**.

Use the **yarn build-docs** to build this docs.

The **MAINPAGE.md** file is the front page, not linked to any source code file.

Folders:

- **resources:** for any other additional assets like OmniGraffle, MindNode, or images. To reference them in the docs, use media://path/to/resource/image;

- **includes:** Markdown code that may be included into another files to lighten up the code files if needed. Include them with [[include:path/to/include.md]].

Add **gaID** and **gaSite** parameters to **typedoc.json** to enable Google Analytics tracking.

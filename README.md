# mindmap
A library to help my girlfriend create mindmaps from keywords for her design homework.

![Screenshot](https://raw.githubusercontent.com/dush-t/mindmap/master/screenshot.png)

## What this is.
Designers often need to create mind-maps to understand how they can make a product give a feeling (for example, Apple
products give a feeling of professionalism, sleekness). A mind-map is just a tree with the trigger word as the root. The
children of a word node are the words that come to mind on hearing the word.

This project provides a basic UI (a React app) and lets the user automatically create a mind map using some initial trigger
words. There's not much direct machine learning involved here - the code will just fetch a combination of synonyms/related words
of the parent word and use those as the children, thus continuing the process. The words are fetched from the Datamuse api

The tree is rendered using vis.js, a graph/network rendering library.

## To-do.
### Python - 
* Add option to specify depth of mind-map.
* Use multi-threading to populate branches concurrently.
* Figure out if there's a way to do this without using Datamuse.

### React - 
* Improve layout (I'm bad at CSS!)
* Add integer input to let the user specify mindmap depth.
* See if its possible to delete nodes from the graph, through the UI.


import React, { useState, useEffect } from "react";

import { AnnotationDisplay } from "../pages/annotation";
import { ConceptDisplay } from "../pages/concept";
import {
  AnnotationIndexPage,
  AnnotationIndex
} from "../pages/annotation_index";
import { ConceptIndexPage, ConceptIndex } from "../pages/concept_index";
import { OntologyIndexPage, OntologyIndex } from "../pages/ontology_index";
import { Annotation } from "../interfaces/annotation";
import { Concept } from "../interfaces/concept";

const isAnnotation = (node: any): node is Annotation =>
  node.language !== undefined && node.package !== undefined;
const isConcept = (node: any): node is Concept =>
  node.name !== undefined && !isAnnotation(node);
const isConceptIndex = (node: any): node is ConceptIndex =>
  Array.isArray(node) && node[0].letter !== undefined;
const isAnnotationIndex = (node: any): node is AnnotationIndex =>
  Array.isArray(node) && node[0].language !== undefined;
const isOntologyIndex = (node: any): node is OntologyIndex =>
  node.annotations !== undefined && node.concepts !== undefined;

const loadAndSetData = (path: string, setData: (d: any) => void) => () => {
  const run = async () => {
    const result = await fetch(`https://cloudflare-ipfs.com${path}`);
    const json = await result.json();

    setData(json);
  };

  run();
};

const Browser = ({ path }: { path: string }) => {
  const [data, setData] = useState();

  useEffect(loadAndSetData(path, setData), [path]);

  if (!data) return <></>;
  if (isAnnotation(data)) return <AnnotationDisplay data={data} />;
  if (isConcept(data)) return <ConceptDisplay data={data} />;
  if (isConceptIndex(data)) return <ConceptIndexPage data={data} />;
  if (isAnnotationIndex(data)) return <AnnotationIndexPage data={data} />;
  if (isOntologyIndex(data)) return <OntologyIndexPage data={data} />;
  return <></>;
};

export default Browser;

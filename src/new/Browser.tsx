import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

type Protocol = "ipfs" | "ipns" | "https" | "http";

const loadAndSetData = (url: string, setData: (d: any) => void) => () => {
  const run = async () => {
    const result = await fetch(url);
    const json = await result.json();

    setData(json);
  };

  run();
};

const url = (protocol: Protocol, path: string) =>
  protocol === "ipfs" || protocol === "ipns"
    ? `https://cloudflare-ipfs.com/${protocol}/${path}`
    : `${protocol}://${path}`;

const Content = ({ data }: any) => {
  if (!data) return <></>;
  if (isAnnotation(data)) return <AnnotationDisplay data={data} />;
  if (isConcept(data)) return <ConceptDisplay data={data} />;
  if (isConceptIndex(data)) return <ConceptIndexPage data={data} />;
  if (isAnnotationIndex(data)) return <AnnotationIndexPage data={data} />;
  if (isOntologyIndex(data)) return <OntologyIndexPage data={data} />;
  return <></>;
};

const Browser = ({ protocol, path }: { protocol: Protocol; path: string }) => {
  const [data, setData] = useState();

  useEffect(loadAndSetData(url(protocol, path), setData), [path]);

  return (
    <div>
      {data && data.ontology && (
        <p>
          <Link to={data.ontology["@id"]}>{data.ontology.name}</Link>
        </p>
      )}
      <Content data={data} />
    </div>
  );
};

export default Browser;

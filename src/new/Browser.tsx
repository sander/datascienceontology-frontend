import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { notDeepEqual } from "assert";

const loadAndSetData = (path: string, setData: (d: any) => void) => () => {
  const run = async () => {
    const result = await fetch(`https://cloudflare-ipfs.com${path}`);
    const json = await result.json();

    setData(json);
  };

  run();
};

const isAnnotation = (node: { language?: string; package?: string }) =>
  node.language && node.package;
const isConcept = (node: { "is-a"?: string; name?: string }) =>
  node["is-a"] && node.name;

interface Annotation {
  language: string;
  package: string;
  id: string;
  name: string;
  class: string;
  kind: "type" | "function";
  description: string;
  definition: any;
}

const Annotation = ({ node }: { node: Annotation }) => (
  <div>
    <h1>{node.name}</h1>
    <h2>
      A {node.kind} in the {node.language} {node.package} package
    </h2>
    <p>
      Class: <code>{node.class}</code>
    </p>
    <p>{node.description}</p>
    <p>
      Represents a{" "}
      <Link to={node.definition["@id"]}>{node.definition["name"]}</Link>
    </p>
  </div>
);

interface Concept {
  name: string;
  kind: "type" | "function";
  "is-a"?: any;
}

const Concept = ({ node }: { node: Concept }) => (
  <div>
    <h1>{node.name}</h1>
    <h2>A {node.kind}</h2>
    <p>Is a {JSON.stringify(node["is-a"], null, 2)}</p>
  </div>
);

const Browser = ({ path }: { path: string }) => {
  const history = useHistory();
  const [data, setData] = useState();

  useEffect(loadAndSetData(path, setData), [path]);

  return (
    <div>
      <input
        size={80}
        onChange={e => history.push(`/browser${e.target.value}`)}
        value={path}
      />
      <Link to="/browser/ipfs/QmXRhmUVp7EF7A9vxvRYYJAR13GpLx16Tf36jrgCqZTvZx/index.json">
        Index
      </Link>
      <Link to="/browser/ipfs/QmXRhmUVp7EF7A9vxvRYYJAR13GpLx16Tf36jrgCqZTvZx/concepts-alphabetical-by-name.json">
        Concepts
      </Link>
      <Link to="/browser/ipfs/QmXRhmUVp7EF7A9vxvRYYJAR13GpLx16Tf36jrgCqZTvZx/annotations-grouped-by-language-and-package.json">
        Annotations
      </Link>
      <Link to="/browser/ipfs/QmXRhmUVp7EF7A9vxvRYYJAR13GpLx16Tf36jrgCqZTvZx/concepts/agglomerative-clustering.json">
        agglomerative clustering
      </Link>
      <Link to="/browser/ipfs/QmXRhmUVp7EF7A9vxvRYYJAR13GpLx16Tf36jrgCqZTvZx/annotations/python/builtins/str.json">
        python builtins str
      </Link>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {data && isAnnotation(data) && <Annotation node={data} />}
      {data && isConcept(data) && <Concept node={data} />}
    </div>
  );
};

export default Browser;

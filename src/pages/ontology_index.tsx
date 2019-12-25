import React from "react";
import { Content } from "react-bulma-components";
import { Link } from "react-router-dom";

import { Symbol } from "../interfaces/symbol";

export interface OntologyIndex {
  annotations: Symbol;
  concepts: Symbol;
}

export const OntologyIndexPage = ({
  data: { annotations, concepts }
}: {
  data: OntologyIndex;
}) => (
  <Content>
    <h1>Browse the Data Science Ontology</h1>
    <p>
      You can browse the Data Science Ontology in several different ways, listed
      below. If you’re looking for a specific concept or annotation, try the
      search bar at the top of the page.
    </p>
    <h4>Indexes</h4>
    <ul>
      <li>
        <Link to={concepts["@id"]}>Index of concepts</Link>, alphabetical by
        name
      </li>
      <li>
        <Link to={annotations["@id"]}>Index of annotations</Link>, grouped by
        language and package
      </li>
    </ul>
  </Content>
);

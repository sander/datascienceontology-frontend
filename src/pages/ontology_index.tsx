import React from "react";
import { Content } from "react-bulma-components";
import { Link } from "react-router-dom";

import { Symbol } from "../interfaces/symbol";

export interface OntologyIndex {
  title: string;
  indices: Symbol[];
}

export const OntologyIndexPage = ({ title, indices }: OntologyIndex) => (
  <Content>
    <h1>Browse the {title}</h1>
    <p>
      You can browse the {title} in several different ways, listed below. If
      you’re looking for a specific concept or annotation, try the search bar at
      the top of the page.
    </p>
    <h4>Indexes</h4>
    <ul>
      {indices.map(i => (
        <li key={i["@id"]}>
          <Link to={i["@id"]}>{i.name}</Link>
        </li>
      ))}
    </ul>
  </Content>
);

import * as _ from "lodash";
import * as React from "react";
import { Heading } from "react-bulma-components";

import * as Concept from "../interfaces/concept";
import { displayResponseData } from "../components/higher-order";
import { ConceptFullName } from "./concept";
import { apiUrl } from "../config";
import { Symbol } from "../interfaces/symbol";

interface LetterWithConcepts {
  letter: string;
  concepts: Symbol[];
}

export type ConceptIndex = LetterWithConcepts[];

export const ConceptIndexPage = (props: { data: ConceptIndex }) => (
  <section id="concept-index">
    <Heading size={2}>Index of Concepts</Heading>
    <ul>
      {props.data.map(({ letter, concepts }) => (
        <li key={letter} className="has-margin-bottom-25">
          <Heading subtitle size={3}>
            <a id={letter} href={`#${letter}`} className="has-text-black">
              {letter.toUpperCase()}
            </a>
          </Heading>
          <ul>
            {concepts.map(concept => (
              <li key={concept["@id"]}>
                <ConceptFullName concept={concept} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </section>
);

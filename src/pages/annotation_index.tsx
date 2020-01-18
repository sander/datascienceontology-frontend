import _ from "lodash";
import * as React from "react";
import { Heading } from "react-bulma-components";

import { Symbol } from "../interfaces/symbol";
import { AnnotationFullName } from "./annotation";

export interface AnnotationIndex {
  languages: {
    language: string;
    packages: {
      package: [string, string];
      annotations: Symbol[];
    }[];
  }[];
}

export const AnnotationIndexPage = ({ languages }: AnnotationIndex) => (
  <section id="annotation-index">
    <Heading size={2}>Index of Annotations</Heading>
    <ul>
      {languages.map(({ language, packages }) => (
        <li key={language} className="has-margin-bottom-25">
          <Heading subtitle size={3}>
            <a
              id={`language-${language}`}
              href={`#language-${language}`}
              className="has-text-black"
            >
              {_.upperFirst(language)}
            </a>
          </Heading>
          <ul className="has-margin-left-50">
            {packages.map(({ package: pkg, annotations }) => (
              <li key={pkg.join("/")} className="has-margin-bottom-25">
                <Heading subtitle size={4}>
                  <a
                    id={`package-${pkg.join("/")}`}
                    href={`#package-${pkg.join("/")}`}
                    className="has-text-black"
                  >
                    {pkg[1]}
                  </a>
                </Heading>
                <ul>
                  {annotations.map(annotation => (
                    <li key={annotation["@id"]}>
                      <AnnotationFullName annotation={annotation} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </section>
);

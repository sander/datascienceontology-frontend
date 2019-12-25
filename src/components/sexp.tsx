import * as React from "react";
import * as Router from "react-router-dom";

import { SExp } from "../interfaces/expression";
import { Symbol, isSymbol } from "../interfaces/symbol";

import "../style/components/sexp.css";

interface SExpProps {
  /* S-expression to display. */
  sexp: SExp;

  /* Whether to display inline (instead of as block) (default false). */
  inline?: boolean;

  /* Whether the terminals refer to concepts in the ontology (default false). */
  ontology?: boolean;
}

/** Display an S-expression as a term tree.
 */
export class SExpComponent extends React.Component<SExpProps> {
  render() {
    const content = this.renderSExp(this.props.sexp);
    return this.props.inline ? (
      <span className="s-expression">{content}</span>
    ) : (
      <div className="s-expression">{content}</div>
    );
  }

  renderSExp(sexp: SExp): JSX.Element {
    if (isSymbol(sexp)) return this.renderSExpTerminal(sexp);
    return (
      <ol>
        {sexp.map((term, i) => {
          let content: JSX.Element | null = null;
          if (i === 0 && typeof term === "string") {
            content = this.renderSExpHead(term);
          } else {
            content = this.renderSExp(term);
          }
          return <li key={i}>{content}</li>;
        })}
      </ol>
    );
  }

  renderSExpHead(name: string): JSX.Element {
    return <span className="s-expression-head">{name}</span>;
  }

  renderSExpTerminal(value: Symbol): JSX.Element {
    return (
      <span className="s-expression-terminal">
        {this.props.ontology ? (
          <Router.Link to={value["@id"]}>{value.name}</Router.Link>
        ) : (
          value
        )}
      </span>
    );
  }
}

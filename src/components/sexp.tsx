import * as React from "react";
import * as Router from "react-router-dom";

import { SExp, SExpAtom, isAtom } from "../interfaces/expression";

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
    return isAtom(sexp) ? (
      this.renderSExpTerminal(sexp)
    ) : (
      <ol>
        <li>{this.renderSExpHead(sexp.operation)}</li>
        {sexp.arguments.map((term, i) => (
          <li key={i}>{this.renderSExp(term)}</li>
        ))}
      </ol>
    );
  }

  renderSExpHead(name: string): JSX.Element {
    return <span className="s-expression-head">{name}</span>;
  }

  renderSExpTerminal(value: SExpAtom): JSX.Element {
    return (
      <span className="s-expression-terminal">
        {this.props.ontology ? (
          <Router.Link to={value.atom["@id"]}>{value.atom.name}</Router.Link>
        ) : (
          value
        )}
      </span>
    );
  }
}

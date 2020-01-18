import { Symbol } from "./symbol";

/** S-expression in JSON-able format.

  The same definition is used in the database JSON schemas for concepts and
  annotations.
 */
export type SExp = SExpAtom | SExpList;

export interface SExpAtom {
  atom: Symbol;
}

export interface SExpList {
  operation: string;
  arguments: SExp[];
}

export const isAtom = (s: SExp): s is SExpAtom => "atom" in s;
export const isList = (s: SExp): s is SExpList => !isAtom(s);

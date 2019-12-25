export interface Symbol {
  "@id": string;
  name: string;
}

export const isSymbol = (v: any): v is Symbol =>
  v["@id"] !== undefined && v.name !== undefined;

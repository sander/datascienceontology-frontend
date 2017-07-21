import OpenWhisk = require("openwhisk");
import * as PouchDB from "pouchdb";

// OpenWhisk
export const whisk = OpenWhisk({
  apihost: "openwhisk.ng.bluemix.net",
  namespace: "evan.patterson@ibm.com_Open Discovery"
});

// CouchDB via PouchDB
const db_origin = "***REMOVED***";
const db_name = "data-science-ontology";
export const db_url = `${db_origin}/${db_name}`;
export const db = new PouchDB(db_url);

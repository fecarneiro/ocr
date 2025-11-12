// DD/MM/YYYY (basic)
const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

export const CARGO_VALUE_REGEX = /^\d{1,3}(?:\.\d{3})*,\d{2}$/;

export const UF_REGEX =
  /^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/;

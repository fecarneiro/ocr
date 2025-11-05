"use strict";
exports.__esModule = true;
exports.matchFieldsWithRegex = void 0;
var dtaRegex = {
    cnpjEmbarcador: /CNPJ(?:\/CPF)?\s+do\s+Beneficiário\s*:\s*([^\n]+)/i,
    nomeBeneficiario: /Nome\s+do\s+Beneficiário\s*:\s*([^\n]+)/i,
    valorCarga: /Valor\s+da\s+Carga\s+em\s+Moeda\s+Nacional\s*:\s*([^\n]+)/i,
    descricaoCarga: /Descrição\s+da\s+Carga\s+na\s+Fatura\s*:\s*([^\n]+)/i,
    origem: /Origem\s*[\s\S]*?Unidade\s+Local\s*:\s*([^\n]+)/i,
    destino: /Destino\s*[\s\S]*?Unidade\s+Local\s*:\s*([^\n]+)/i
};
function matchFieldsWithRegex(data) {
    var regexExtraction = {
        cnpjEmbarcador: '',
        nomeBeneficiario: '',
        valorCarga: '',
        descricaoCarga: '',
        origem: '',
        destino: ''
    };
    for (var _i = 0, _a = Object.entries(dtaRegex); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var fullMatch = data.match(value);
        var match = fullMatch ? fullMatch[1] : null;
        regexExtraction[key] = match;
    }
    return regexExtraction;
}
exports.matchFieldsWithRegex = matchFieldsWithRegex;

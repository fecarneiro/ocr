import fs from 'node:fs/promises';

// (async () => {
//   const data = await fs.readFile('extraction.txt', 'utf8');
//   console.log(data);
// })();

const text = `
Consulta Detalhada - Declaração No.:25/0358312-6 Page 1 of 1
Dados €voltar
Gerais

No. da Declaração : 25/0358312-6
Tipo : DTA - ENTRADA COMUM
Via de Transporte/Situação
Via de Transporte : RODOVIARIA
Declaração solicitada em 05/08/2025 às 11:08:56 hs, pelo CPF : 121.383.068-01
Declaração registrada em 08/08/2025 às 12:18:38 hs, pelo CPF : 121.383.068-01
Esta declaração ainda não tem veículo(s) informado(s)
Esta declaração possui dossiê(s) vinculado(s): 20250029432880-7
Origem
Unidade Local : 0817800 - PORTO DE SANTOS
Recinto Aduaneiro : 8931356 - IPA - SANTOS BRASIL PARTICIPACOES S.A.
Destino
Unidade Local : 0610600 - VARGINHA
Recinto Aduaneiro : 6553001 - CLIA - POUSO ALEGRE - ARMAZÉNS GERAIS SUL DAS GERAIS
Beneficiário/ Transportador
CNPJ/CPF do Beneficiário : 01.615.814/0045-14
Nome do Beneficiário: UNILEVER BRASIL INDUSTRIAL LTDA
CNPJ/CPF do Transportador : 13.657.062/0001-12
Nome do Transportador: LOGITIME TRANSPORTES LTDA
Identificação da Rota
Código da Rota : 00003
Descrição da Rota : SANTOS BRASIL, ROD. CONEGO DOMENICO RANGONI, RODOVIA ANCHIETA OU IMIGRANTES,
RODOANEL MARIO COVAS, RODOVIA PRESIDENTE DUTRA, RODOVIA FERNÃO DIAS (BR-381), KM 848, BAIRRO
IPIRANGA, POUSO ALEGRE MG, CLIA SUL DE MINAS - CLIA POUSO ALEGRE
Prazo da Rota : 48 horas
Modalidade de Transporte da Declaração
Tipo : UNIMODAL
Tratamento na Origem/Totais
Tipo : Armazenamento
Valor Total do Trânsito em Dólar : 54.049,31
Valor Total do Trânsito na Moeda Nacional : 295.314,61
Cargas da Declaração (1 a 1/Total : 1) - Página : 1/1
Carga 1)
Identificação da Carga : CEMERCANTE31032008152505230642216
Tipo de Documento : 12 - HBL
TC de Destino : Armazenamento
Esta carga NÃO TEM anuência
CNPJ/CPF do Importador : 01.615.814/0045-14
Nome do Importador : UNILEVER BRASIL INDUSTRIAL LTDA
Divergência da Carga na Origem : avaria e/ou falta com desistência de vistoria na origem
Modalidade de Embarque : Total
Peso Bruto da Carga : 4.132,000 Kg ESA OO
Tipo da Carga : 03 - Containerizada Brasiliense Com. Despachos Ltda.
Identificação do(s) Container(s) :
1) MRKUO65610
Valor FOB/FCA da Carga em Dólar : 54.049,31
Valor da Carga em Moeda Nacional : 295.314,61
Fatura(s) da Carga:
1) Número da Fatura : VV10109734
Valor da Fatura : 54.049,31
Moeda de Negociação : DOLAR AMERICANO
Descrição da Carga na Fatura : SUPLEM. ALIMEN.EM PÓ ACOND.P/ VENDA A RETAL. EM SACHE.OUTROS.INV.
SOINVV10109734
https://wwwd4.receita.fazenda.gov.br/236154/servlet/siscomex.transito.navegacao.Nav... 08/08/2025
`;

const regex = /Valor Total do Trânsito em Dólar :/;

const match = text.match(regex) || [];
console.log(match);

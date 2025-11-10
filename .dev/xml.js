import fs from 'node:fs';

function analisarPDF(pdfPath) {
  const buffer = fs.readFileSync(pdfPath);
  const texto = buffer.toString('latin1');

  // Verifica assinaturas conhecidas
  const checks = {
    'É PDF': texto.startsWith('%PDF'),
    'Tem XML': texto.includes('<?xml') || texto.includes('<nfe'),
    'Tem texto "NFe"': texto.includes('NFe') || texto.includes('NF-e'),
    'Tem "DANFE"': texto.includes('DANFE'),
    Tamanho: `${(buffer.length / 1024).toFixed(2)} KB`,
  };

  console.log('📊 Análise do PDF:\n');
  Object.entries(checks).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });

  // Procura por qualquer tag XML
  const xmlTags = texto.match(/<[a-zA-Z][^>]*>/g);
  if (xmlTags) {
    console.log('\n🏷️  Primeiras 10 tags XML encontradas:');
    console.log(xmlTags.slice(0, 10));
  } else {
    console.log('\n⚠️  Nenhuma tag XML encontrada - provavelmente é escaneado');
  }
}

analisarPDF('./data/input/nfe1.pdf');

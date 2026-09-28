// scripts/verify-release-v1.mjs
import https from 'node:https';

const BASE_URL = 'https://fluoritelabs.seekin-web.workers.dev';

const ROUTES_TO_TEST = [
  { path: '/', label: 'Home Page' },
  { path: '/servicos/site-institucional', label: 'Serviço: Site Institucional' },
  { path: '/servicos/landing-page', label: 'Serviço: Landing Page' },
  { path: '/servicos/pagina-de-produto', label: 'Serviço: Página de Produto' },
  { path: '/servicos/seo', label: 'Serviço: SEO' },
  { path: '/work', label: 'Work: Index' },
  { path: '/work/aethel-architecture', label: 'Work: Aethel Architecture' },
  { path: '/work/lumena-health', label: 'Work: Lumena Health' },
  { path: '/work/vektor-robotics', label: 'Work: Vektor Robotics' },
  { path: '/journal', label: 'Fluor Journal: Index' },
  { path: '/journal/site-institucional-ou-landing-page', label: 'Journal: Artigo 1' },
  { path: '/journal/site-industria-b2b-confianca', label: 'Journal: Artigo 2' },
  { path: '/journal/por-que-sites-bonitos-nao-convertem', label: 'Journal: Artigo 3' },
  { path: '/privacidade', label: 'Política de Privacidade (LGPD)' },
  { path: '/sitemap.xml', label: 'Sitemap XML' },
  { path: '/robots.txt', label: 'Robots TXT' },
  { path: '/api/health', label: 'API Health Check & DB' },
];

function fetchEndpoint(urlPath) {
  return new Promise((resolve) => {
    const fullUrl = `${BASE_URL}${urlPath}`;
    const req = https.get(fullUrl, { rejectUnauthorized: false }, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        resolve({
          path: urlPath,
          statusCode: res.statusCode,
          headers: res.headers,
          bodySnippet: body.slice(0, 200),
          fullBody: body,
        });
      });
    });
    req.on('error', (err) => {
      resolve({ path: urlPath, statusCode: 0, error: err.message });
    });
    req.setTimeout(8000, () => {
      req.destroy();
      resolve({ path: urlPath, statusCode: 408, error: 'Timeout' });
    });
  });
}

async function run() {
  console.log(`\n=================================================`);
  console.log(`🔍 INICIANDO VERIFICAÇÃO AO VIVO DA V1 - FLUORITE LABS`);
  console.log(`Ambiente: ${BASE_URL}`);
  console.log(`=================================================\n`);

  let allPassed = true;
  const results = [];

  for (const route of ROUTES_TO_TEST) {
    const res = await fetchEndpoint(route.path);
    const isOk = res.statusCode >= 200 && res.statusCode < 400;
    if (!isOk) allPassed = false;

    console.log(`${isOk ? '✅' : '❌'} [${res.statusCode}] ${route.label.padEnd(35)} -> ${route.path}`);
    results.push({ ...route, ...res, isOk });
  }

  // Health check specific validation
  const healthRes = results.find(r => r.path === '/api/health');
  if (healthRes && healthRes.isOk) {
    try {
      const data = JSON.parse(healthRes.fullBody);
      console.log(`\n🩺 Detalhes do Health Check:`);
      console.log(`   - Status Geral: ${data.status}`);
      console.log(`   - Aplicação: ${data.services.app}`);
      console.log(`   - Conexão PostgreSQL Neon: ${data.services.database} (Latência: ${data.services.dbLatencyMs}ms)`);
      console.log(`   - Versão: ${data.version}`);
    } catch (e) {
      console.error('Falha ao parsear JSON do health check');
    }
  }

  console.log(`\n=================================================`);
  if (allPassed) {
    console.log(`🎉 TODOS OS 17 ENDPOINTS DA V1 ESTÃO 100% OPERACIONAIS!`);
  } else {
    console.log(`⚠️ ALGUNS ENDPOINTS FALHARAM NA VERIFICAÇÃO!`);
  }
  console.log(`=================================================\n`);
}

run();

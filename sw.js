/* ============================================================
   sw.js — service worker do app de apontamento
   ------------------------------------------------------------
   Guarda os arquivos no aparelho para que o app abra sem sinal.
   IMPORTANTE: ao alterar o apontamento.html, mude o número da
   VERSAO abaixo. Sem isso o aparelho continua abrindo a versão
   antiga guardada no cache.
   ============================================================ */
const VERSAO = 'apontamento-v3';

const ARQUIVOS = [
  'apontamento.html',
  'manifest.webmanifest',
  'icone.svg'
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(VERSAO)
      .then((cache) => cache.addAll(ARQUIVOS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((chaves) => Promise.all(
        chaves.filter((c) => c !== VERSAO).map((c) => caches.delete(c))
      ))
      .then(() => self.clients.claim())
  );
});

/* Cache primeiro: subterrâneo não tem sinal, então nunca espera
   a rede. Quando há sinal, atualiza o cache em segundo plano. */
self.addEventListener('fetch', (evento) => {
  const req = evento.request;
  if (req.method !== 'GET') return;

  evento.respondWith(
    caches.match(req).then((guardado) => {
      const busca = fetch(req)
        .then((resp) => {
          if (resp && resp.ok) {
            const copia = resp.clone();
            caches.open(VERSAO).then((cache) => cache.put(req, copia));
          }
          return resp;
        })
        .catch(() => guardado || caches.match('apontamento.html'));

      return guardado || busca;
    })
  );
});

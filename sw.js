const VERSAO = 'apontamento-v1';

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

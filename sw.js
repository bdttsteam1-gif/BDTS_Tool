/* 오프라인 저장 설정
   - 인터넷이 되면 항상 서버의 최신 파일을 먼저 받고(받은 파일로 저장본도 갱신), 안 되면 저장본을 보여 줌.
   - 파일을 추가하면 FILES에 넣고 VERSION 숫자를 올린다. */
const VERSION = 'ts-tools-v3';
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/tool-spot.png',
  './icons/tool-control.png',
  './icons/tool-guide.png',
  './icons/tool-raw.png',
  './tools/spotcal.html',
  './tools/control.html',
  './tools/guideline.html',
  './tools/rawdata.html'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // 같은 주소의 파일: 최신 먼저, 실패하면 저장본
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      }).catch(() =>
        caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html'))
      )
    );
    return;
  }

  // 글꼴(Google Fonts): 한 번 받으면 저장해 두고 오프라인에서도 사용. 없으면 기기 기본 글꼴로 표시됨.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res;
      }).catch(() => new Response('', { status: 504 })))
    );
  }
});

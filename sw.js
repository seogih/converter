const CACHE_VERSION = '1.0.5';
const CACHE_NAME = `converter-v${CACHE_VERSION}`;
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './version.json'
];

// 설치 시 캐시 생성
self.addEventListener('install', event => {
  console.log('[SW] 설치 중... 버전:', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] 캐시 생성 완료:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[SW] skipWaiting 호출');
        return self.skipWaiting();
      })
  );
});

// 활성화 시 이전 캐시 삭제
self.addEventListener('activate', event => {
  console.log('[SW] 활성화 중... 버전:', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] 이전 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] clients.claim 호출');
      return self.clients.claim();
    })
  );
});

// 네트워크 요청 처리
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // version.json은 항상 네트워크에서 가져오기
  if (url.pathname.endsWith('version.json')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // HTML 파일은 Network-First 전략
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then(response => {
            if (response) return response;
            return new Response('오프라인 상태입니다.', {
              status: 503,
              headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
          });
        })
    );
    return;
  }

  // 기타 리소스는 Cache-First 전략
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          fetch(event.request).then(fetchResponse => {
            if (fetchResponse && fetchResponse.status === 200) {
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, fetchResponse);
              });
            }
          }).catch(() => {});
          return response;
        }
        return fetch(event.request).then(fetchResponse => {
          if (!fetchResponse || fetchResponse.status !== 200) {
            return fetchResponse;
          }
          const responseToCache = fetchResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return fetchResponse;
        });
      })
  );
});

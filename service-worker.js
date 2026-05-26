const CACHE_NAME = 'v2'; // 버전 변경 시마다 이 숫자를 올리세요
const urlsToCache = [
  '/',
  '/index.html',
  // 필요한 경우 여기에 추가 파일 경로를 넣으세요
];

// 서비스 워커 설치
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 이전 캐시 삭제 및 업데이트
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 네트워크 요청 시 캐시 우선 제공
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

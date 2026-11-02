// Stage Prompter service worker · © 2026 Geter Holdings LLC. All rights reserved.
// Network first, so updates show up right away; falls back to the cached copy when offline.
const C='stage-prompter-v3';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png']).catch(()=>{})));});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./'))));});

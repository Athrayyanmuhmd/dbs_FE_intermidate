import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  StaleWhileRevalidate,
  NetworkFirst,
  CacheFirst,
} from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

precacheAndRoute(self.__WB_MANIFEST);

// --- Caching Strategies ---

registerRoute(
  ({ url }) =>
    url.origin === "https://story-api.dicoding.dev" &&
    url.pathname.startsWith("/v1/stories"),
  new NetworkFirst({
    cacheName: "api-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
        // Clean up expired entries automatically in the background.
        purgeOnQuotaError: true,
      }),
    ],
    // Add a network timeout to ensure a quicker fallback to cache if the network is slow.
    networkTimeoutSeconds: 3,
  })
);

registerRoute(
  ({ url }) =>
    url.origin === "https://story-api.dicoding.dev" &&
    url.pathname.includes("/images/"),
  new StaleWhileRevalidate({
    cacheName: "story-images",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        purgeOnQuotaError: true,
      }),
    ],
    matchOptions: {
      ignoreSearch: true,
    },
    fallback: {
      image: "/favicon.png",
    },
  })
);

registerRoute(
  ({ url }) => url.hostname.includes("tile.openstreetmap.org"),
  new StaleWhileRevalidate({
    cacheName: "map-tiles",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 7 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

registerRoute(
  ({ url }) =>
    url.hostname.includes("unpkg.com") ||
    url.hostname.includes("cdnjs.cloudflare.com"),
  new CacheFirst({
    cacheName: "static-assets",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// --- Push Notification Handlers ---

self.addEventListener("push", (event) => {
  let notificationData = {};

  try {
    notificationData = event.data.json();
  } catch (error) {
    console.error(
      "Error parsing push notification data, using fallback:",
      error
    ); // Log the error
    notificationData = {
      title: "TuriturianSude",
      options: {
        body: event.data ? event.data.text() : "Ada story baru untuk Anda!",
        icon: "/favicon.png",
        badge: "/favicon.png",
        image: "/favicon.png",
        vibrate: [100, 50, 100],
        data: {
          url: "/#/home", // Default URL to open when notification is clicked
        },
        actions: [
          {
            action: "open",
            title: "Lihat Story",
          },
        ],
      },
    };
  }

  event.waitUntil(
    self.registration.showNotification(
      notificationData.title || "TuriturianSude",
      {
        ...notificationData.options,
        requireInteraction: true,
        tag: "turituriansude-notification",
      }
    )
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/#/";

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(urlToOpen) && "focus" in client) {
          return client.focus();
        }
      }
      // If no matching window is found, open a new one.
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

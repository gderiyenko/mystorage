/*
 * injected.js
 *
 * This script runs directly in the context of a specific web page,
 * It's programmatically added by content.js to a webpage to bypass
 * security "sandboxing" in order to allow the extension to interact
 * with the website's own JavaScript variables and functions.
*/

(() => {
  let requestId = 0;
  const pendingRequests = {};

  window.addEventListener('message', (event) => {
    if (event.source === window && event.data.type && event.data.type.endsWith('_RESPONSE')) {
      const { requestId, response } = event.data;
      if (pendingRequests[requestId]) {
        pendingRequests[requestId](response);
        delete pendingRequests[requestId];
      }
    }
  });

  window.mystorage = {
    set: (key, value) => {
      return new Promise((resolve) => {
        const currentId = requestId++;
        pendingRequests[currentId] = () => resolve();
        window.postMessage({ type: 'MYSTORAGE_SET', key, value, requestId: currentId }, '*');
      });
    },
    get: (key) => {
      return new Promise((resolve) => {
        const currentId = requestId++;
        pendingRequests[currentId] = (response) => {
            resolve(response ? response.value : undefined);
        };
        window.postMessage({ type: 'MYSTORAGE_GET', key, requestId: currentId }, '*');
      });
    },
    remove: (key) => {
      return new Promise((resolve) => {
        const currentId = requestId++;
        pendingRequests[currentId] = () => resolve();
        window.postMessage({ type: 'MYSTORAGE_REMOVE', key, requestId: currentId }, '*');
      });
    }
  };
})();

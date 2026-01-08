/*
 * content.js
 *
 * This script runs directly in the context of a specific web page,
 * allowing the extension to read or modify the DOM (in the content of the site you are visiting).
*/


const injectedScript = document.createElement('script');
injectedScript.src = chrome.runtime.getURL('injected.js');
(document.head || document.documentElement).appendChild(injectedScript);

window.addEventListener('message', (event) => {
  if (event.source === window && event.data.type && (event.data.type === 'MYSTORAGE_SET' || event.data.type === 'MYSTORAGE_GET')) {
    chrome.runtime.sendMessage(event.data, (response) => {
      window.postMessage({ type: `${event.data.type}_RESPONSE`, response, requestId: event.data.requestId }, '*');
    });
  }
});

/*
 * background.js
 *
 * This is the extension's service worker that runs in the background
 * to handle long-running tasks and browser-level events. It manages 
 * things like context menu, storage updates, and communication between 
 * different parts of the extension.
*/

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  switch (request.type) {
    case 'MYSTORAGE_SET':
      chrome.storage.local.set({ [request.key]: request.value }, () => {
        sendResponse({ status: 'success' });
      });
      return true; // Indicates that the response is sent asynchronously

    case 'MYSTORAGE_GET':
      chrome.storage.local.get(request.key, (result) => {
        sendResponse({ value: result[request.key] });
      });
      return true; // Indicates that the response is sent asynchronously

    case 'GET_ALL_STORAGE':
      chrome.storage.local.get(null, (items) => {
        sendResponse({ data: items });
      });
      return true;

    case 'MYSTORAGE_REMOVE':
      chrome.storage.local.remove(request.key, () => {
        sendResponse({ status: 'success' });
      });
      return true;

    default:
      // Optionally handle unknown message types
      return false;
  }
});
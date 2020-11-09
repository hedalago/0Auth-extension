window.addEventListener(
  'message',
  function (event) {
    // We only accept messages from ourselves
    if (event.source !== window) return;

    if (event.data.from && event.data.from === 'page') {
      let message;
      if (event.data.message !== undefined) {
        message = {...event.data, ...event.data.message};
      } else {
        message = {...event.data};
      }
      chrome.storage.local.get(['messageQueue'], async (data) => {
        let messageQueue = data.messageQueue || [];
        messageQueue.push(message);
        chrome.storage.local.set({messageQueue});
      })
    }
  },
  false,
);

chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  if (request.from && request.from === 'popup') {
    window.postMessage({from: 'content', data: request}, '*');
  }
});

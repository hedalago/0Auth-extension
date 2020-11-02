window.addEventListener('message', function(event) {
  // We only accept messages from ourselves
  if (event.source !== window)
    return;

  if (event.data.from && (event.data.from === 'page')) {
    chrome.runtime.sendMessage({
      from: 'content',
      data: event.data,
    });
  }
}, false);

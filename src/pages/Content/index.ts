import { handleMessage } from './eventHandlers';

const init = () => {
  console.log('test');
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    handleMessage(message).then((response) => {
      sendResponse(response);
    });
    return true;
  });
}

window.onload = () => init();

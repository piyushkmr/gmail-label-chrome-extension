import { LOCAL_STORAGE_LABEL_VARIABLE_NAME } from 'pages/constants';
import { handleMessage } from './eventHandlers';
import { updateLabelCss } from './labelUtils';

const injectStaticCss = () => {
  const cssTag = document.createElement('link');
  cssTag.setAttribute('href', chrome.runtime.getURL('assets/mdi/css/materialdesignicons.css'));
  cssTag.setAttribute('rel', 'stylesheet');
  document.head.appendChild(cssTag);
};

const setCssFromLocalStorage = () => {
  const localLabelData = localStorage.getItem(LOCAL_STORAGE_LABEL_VARIABLE_NAME);
  if (localLabelData) {
    const labelData = JSON.parse(localLabelData);
    updateLabelCss(labelData);
  }
};

const init = () => {
  console.log('test');
  setCssFromLocalStorage();
  injectStaticCss();
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    handleMessage(message).then((response) => {
      sendResponse(response);
    });
    return true;
  });
}

window.onload = () => init();

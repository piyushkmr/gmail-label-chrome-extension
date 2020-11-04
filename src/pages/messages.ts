export interface Message<T = any> {
  from: 'popup' | 'background' | 'content';
  action: typeof ACTIONS | number | string;
  payload?: T;
}

export enum ACTIONS {
  LABELS_FOUND,
  GET_LABELS,
  GET_THEME,
  UPDATE_LABELS_DATA,
}

const getActiveTab = (): Promise<chrome.tabs.Tab> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      tabs && tabs[0] ? resolve(tabs[0]) : reject();
    });
  });
};

export const sendMessageToTab = async <T = any>(message: Message, tabId?: number): Promise<T> => {
  const activeTab = await getActiveTab();
  tabId = tabId || activeTab.id;
  return new Promise((resolve, reject) => {
    if (tabId) {
      chrome.tabs.sendMessage(tabId, message, (response: T) => resolve(response));
    } else {
      reject();
    }
  });
}

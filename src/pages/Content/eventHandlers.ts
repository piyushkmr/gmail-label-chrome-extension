import { Message, ACTIONS } from 'pages/messages';
import { getAllLabelNamesFromPage, getStoredLabelData, updateLabelData } from './labelUtils';
import { getTheme } from './themeUtil';

/**
 * Message Handlers for all messages in the system for contentScript
 * @param message {Message} Message object
 * @returns Anything that can be sent as data, but primarily will be primitive data types
 */

export const handleMessage = async (message: Message): Promise<any> => {
  switch (message.action) {
    case ACTIONS.GET_LABELS:
      const labelNames = getAllLabelNamesFromPage()
      return labelNames;
    case ACTIONS.GET_THEME:
      const theme = getTheme();
      return theme;

    case ACTIONS.GET_STORED_LABELS_DATA:
      const storedLabelsData = getStoredLabelData();
      return storedLabelsData;

    case ACTIONS.UPDATE_LABELS_DATA:
      updateLabelData(message.payload);
      return;
  }
}

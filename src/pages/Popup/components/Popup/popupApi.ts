import { ACTIONS, sendMessageToTab } from 'pages/messages';
import { ThemeOptions } from 'pages/Content/themeUtil';
import { LabelData } from './Popup';

export const fetchLabelsFromPage = (): Promise<string[]> => {
  return sendMessageToTab<string[]>({
    from: 'popup',
    action: ACTIONS.GET_LABELS,
  });
};

export const fetchThemeFromPage = () => {
  return sendMessageToTab<ThemeOptions>({
    from: 'popup',
    action: ACTIONS.GET_THEME,
  });
};

export const sendUpdatedLabelsData = (labelsData: Record<string, LabelData>) => {
  return sendMessageToTab({
    from: 'popup',
    action: ACTIONS.UPDATE_LABELS_DATA,
    payload: labelsData,
  });
};

export const getStoredLabelsData = () => {
  return sendMessageToTab<Record<string, LabelData>>({
    from: 'popup',
    action: ACTIONS.GET_STORED_LABELS_DATA,
  });
}

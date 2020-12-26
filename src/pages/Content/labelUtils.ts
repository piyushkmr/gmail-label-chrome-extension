import { sprintf } from 'sprintf-js';
import { LabelData } from "pages/Popup/components/Popup";
import { LABEL_COLLAPSED_SELECTOR, LABEL_NAME_CSS_SELECTOR, LABEL_NODE_SELECTOR, LOCAL_STORAGE_LABEL_VARIABLE_NAME } from "../constants";

const getAllLabelNodes = () => {
  const labelNodes = document.querySelectorAll(LABEL_NODE_SELECTOR);
  return labelNodes;
}

const expandAllLabels = () => {
  const collapsedLabels = Array.from(document.querySelectorAll<HTMLDivElement>(LABEL_COLLAPSED_SELECTOR));
  collapsedLabels.forEach((collapsedLabel) => collapsedLabel.click())
}

const getLabelNamesFromData = (labelsData?: Record<string, LabelData>) => {
  if (labelsData) {
    return Object.keys(labelsData).filter((labelName) => !!labelsData[labelName].iconName);
  } else {
    return [];
  }
};

export const getAllLabelNamesFromPage = () => {
  expandAllLabels();
  const labelNodes = getAllLabelNodes();
  const labelNames = Array.from(labelNodes).map((labelNode) => labelNode.textContent);
  return labelNames;
}

const getOldLabelCss = (labelNames: string[]) => {
  const OLD_LABEL_CSS = `width: 1em; height: 1em; border: 0;`;
  const labelIconSelector = `${LABEL_NAME_CSS_SELECTOR}:before, ${LABEL_NAME_CSS_SELECTOR}:after`;
  const oldLabelCssSelector = labelNames.map((labelName) => sprintf(labelIconSelector, { labelName })).join(', ');
  let oldLabelCssFix = `${oldLabelCssSelector} { ${OLD_LABEL_CSS} }`;
  oldLabelCssFix += `${LABEL_NAME_CSS_SELECTOR} { border-color: transparent; font-size: 1.25em }`;
  return oldLabelCssFix;
};

export const getLabelIconCss = (labelsData: Record<string, LabelData>) => {
  const labelNames = getLabelNamesFromData(labelsData);
  const oldLabelCssFix = getOldLabelCss(labelNames);

  const newLabelCss = labelNames.map((labelName) => `${sprintf(LABEL_NAME_CSS_SELECTOR, { labelName })} {
    background-image: url('${labelsData[labelName].iconName}');
    filter: grayscale(1) brightness(1.5) contrast(1.25);
    background-size: contain;
  }`).join('\n');

  return [ oldLabelCssFix ].join('\n');
};

export const updateLabelData = (labelData?: Record<string, LabelData>) => {
  const labelDataString = JSON.stringify(labelData);
  localStorage.setItem('labelData', labelDataString);
  updateLabelCss(labelData);
};

export const getStoredLabelData = () => {
  const localLabelData = localStorage.getItem(LOCAL_STORAGE_LABEL_VARIABLE_NAME);
  if (localLabelData) {
    const labelData = JSON.parse(localLabelData) as Record<string, LabelData>;
    return labelData;
  }
  return {};
}

const getLabelNodes = (labelsData: Record<string, LabelData>) => {
  const labelNames = getLabelNamesFromData(labelsData);
  const labelNodes = labelNames.map((labelName) => {
    const labelSelector = sprintf(LABEL_NAME_CSS_SELECTOR, { labelName });
    return document.querySelector(labelSelector);
  });
  return labelNodes;
};

export const updateLabelClasses = (labelsData?: Record<string, LabelData>) => {
  if (labelsData) {
    const labelNames = getLabelNamesFromData(labelsData);
    const labelNodes = getLabelNodes(labelsData);
    labelNodes.forEach((labelNode, labelIndex) => {
      const labelName = labelNames[labelIndex];
      const labelData = labelsData[labelName];
      if (labelNode) {
        const labelNodeContent = labelNode.nextElementSibling?.textContent;
        if (labelName !== labelNodeContent) {
          console.warn(`WARNING! Label Name <${labelName}> doesn't match Label Node <${labelNodeContent}>`);
        }
        labelNode.classList.add('mdi', `mdi-${labelData.iconName}`);
      } else {
        console.warn(`WARNING! Label Node for Label Name <${labelName}> is not found.`);
      }
    })
  }
};

export const updateLabelCss = (labelsData?: Record<string, LabelData>) => {
  const CUSTOM_STYLE_CSS_ID = 'gmail-label-custom'
  if (labelsData) {
    const newLabelCss = getLabelIconCss(labelsData);
    const existingStyle = document.querySelector(`#${CUSTOM_STYLE_CSS_ID}`);
    if (existingStyle) {
      existingStyle.remove();
    }
    if (document.head) {
      const style = document.createElement('style');
      style.id = CUSTOM_STYLE_CSS_ID;
      style.innerHTML = newLabelCss;
      document.head.appendChild(style);
    }
  }
  updateLabelClasses(labelsData);
};

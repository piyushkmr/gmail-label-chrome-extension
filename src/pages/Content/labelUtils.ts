import { sprintf } from 'sprintf-js';
import { LabelData } from "pages/Popup/components/Popup";
import { LABEL_COLLAPSED_SELECTOR, LABEL_NAME_CSS_SELECTOR, LABEL_NODE_SELECTOR } from "../constants";

const getAllLabelNodes = () => {
  const labelNodes = document.querySelectorAll(LABEL_NODE_SELECTOR);
  return labelNodes;
}

const expandAllLabels = () => {
  const collapsedLabels = Array.from(document.querySelectorAll<HTMLDivElement>(LABEL_COLLAPSED_SELECTOR));
  collapsedLabels.forEach((collapsedLabel) => collapsedLabel.click())
}

export const getAllLabelNames = () => {
  expandAllLabels();
  const labelNodes = getAllLabelNodes();
  const labelNames = Array.from(labelNodes).map((labelNode) => labelNode.textContent);
  return labelNames;
}

const getOldLabelCss = (labelNames: string[]) => {
  const OLD_LABEL_CSS = `content: unset; display: none !important;`;
  const labelIconSelector = `${LABEL_NAME_CSS_SELECTOR}:before, ${LABEL_NAME_CSS_SELECTOR}:after`;
  const oldLabelCssSelector = labelNames.map((labelName) => sprintf(labelIconSelector, { labelName })).join(', ');
  const oldLabelCssFix = `${oldLabelCssSelector} { ${OLD_LABEL_CSS} }`;
  return oldLabelCssFix;
};

export const getLabelIconCss = (labelsData: Record<string, LabelData>) => {
  const labelNames = Object.keys(labelsData).filter((labelName) => !!labelsData[labelName].iconName);
  const oldLabelCssFix = getOldLabelCss(labelNames);

  const newLabelCss = labelNames.map((labelName) => `${sprintf(LABEL_NAME_CSS_SELECTOR, { labelName })} {
    background-image: url('${labelsData[labelName].iconName}');
    filter: grayscale(1) brightness(1.5) contrast(1.25);
    background-size: contain;
  }`).join('\n');

  return [ oldLabelCssFix, newLabelCss ].join('\n');
}

export const updateLabelCss = (labelsData?: Record<string, LabelData>) => {
  if (labelsData) {
    const newLabelCss = getLabelIconCss(labelsData);
    if (document.head) {
      var style = document.createElement('style');
      style.innerHTML = newLabelCss;
      document.head.appendChild(style);
    }
  }
}

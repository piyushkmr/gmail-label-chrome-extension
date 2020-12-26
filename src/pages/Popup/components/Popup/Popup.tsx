import React, { Component, useState } from 'react';
import { ThemeElements } from 'pages/Content/themeUtil';
import { LabelRow } from 'pages/Popup/components/LabelRow';
import { Navbar } from 'pages/Popup/components/Navbar';
import './Popup.scss';
import {
  fetchLabelsFromPage,
  fetchThemeFromPage,
  getStoredLabelsData,
  sendUpdatedLabelsData,
} from './popupApi';
import { IconSelector } from 'pages/Popup/components/IconSelector';

export interface LabelData {
  iconName: string;
}

interface PopupState {
  labelNames: string[];
  themeElements?: ThemeElements[];
  isDark: boolean;
  labelsData: Record<string, LabelData>;
}

const BackgroundContainer = (props: { themeElements: ThemeElements[] }) => {
  const { themeElements } = props;
  return (
    <div className="background-container">
      {themeElements.map((themeElement) => {
        const { background, ...otherCss } = themeElement;
        return <div className="background-item" style={otherCss}></div>;
      })}
    </div>
  );
};

export class Popup extends Component<{}, PopupState> {
  state: PopupState = {
    labelNames: [],
    isDark: false,
    labelsData: {},
  };

  constructor(props: {}) {
    super(props);
    this.fetchLabels();
    this.fetchTheme();
    getStoredLabelsData().then((labelsData) => {
      this.setState({ labelsData });
    });
  }

  setLabelData = (labelName: string, labelData: LabelData) => {
    const newLabelData = {
      ...this.state.labelsData,
      [labelName]: labelData,
    };
    this.setState({ labelsData: newLabelData });
    this.sendUpdatedLabelData(newLabelData);
  };

  getLabelData = (labelName: string) => {
    return this.state.labelsData[labelName] || {};
  };

  handleLabelDataChange = (labelName: string, labelData: LabelData) => {
    this.setLabelData(labelName, labelData);
  };

  fetchLabels = () => {
    fetchLabelsFromPage().then((labelNames) => this.setState({ labelNames }));
  };

  fetchTheme = () => {
    fetchThemeFromPage().then((themeOptions) =>
      this.setState({
        themeElements: themeOptions.themeElements,
        isDark: themeOptions.isDark,
      })
    );
  };

  sendUpdatedLabelData = (labelsData: Record<string, LabelData>) => {
    sendUpdatedLabelsData(labelsData);
  };

  render() {
    const { themeElements, labelNames, labelsData, isDark } = this.state;
    return (
      <div className={`app ${isDark ? 'dark' : 'light'}`}>
        <Navbar />
        {labelNames && themeElements && (
          <div className="labels-container">
            <div className="label-names-list">
              <BackgroundContainer themeElements={themeElements} />
              <div className="label-names-container">
                {labelNames.map((labelName) => {
                  const labelData = labelsData[labelName];
                  return (
                    <div className="label-column label-name" key={labelName}>
                      {labelData?.iconName ? (
                        <span className="label-icon-container">
                          <span
                            className={`label-icon-img mdi mdi-${labelData.iconName}`}
                          />
                        </span>
                      ) : (
                        <span className="label-default-icon"></span>
                      )}
                      <span>{labelName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="labels-info">
              {labelNames.map((labelName) => {
                const labelData = this.getLabelData(labelName);
                return (
                  <LabelRow
                    key={labelName}
                    labelName={labelName}
                    iconName={labelData.iconName}
                    onChange={this.handleLabelDataChange}
                  />
                );
              })}
            </div>
            <IconSelector />
          </div>
        )}
      </div>
    );
  }
}

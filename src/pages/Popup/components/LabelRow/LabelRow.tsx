import React, { useCallback, useState } from 'react';
import { LabelData } from '../Popup';
import './labelRow.css';

interface LabelRowProps {
  labelName: string;
  iconName: string;
  onChange: (labelName: string, labelData: LabelData) => void;
}

export const LabelRow = (props: LabelRowProps) => {
  const [labelData, setLabelData] = useState({ iconName: props.iconName });

  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      let newLabelData = { ...labelData, [name]: value };
      setLabelData(newLabelData);
      props.onChange(props.labelName, newLabelData);
    },
    []
  );

  return (
    <div className="label-row">
      <div className="label-column label-icon">
        <input
          className="form-control form-control-sm"
          name="iconName"
          onChange={handleValueChange}
          defaultValue={props.iconName}
          type="text"
          placeholder="Icon name or URL"
        />
      </div>
      <input
        className="label-column label-color"
        name="color"
        type="checkbox"
      />
      Color
      <input
        className="label-column label-inverted"
        name="inverted"
        type="checkbox"
      />
      Inverted
    </div>
  );
};

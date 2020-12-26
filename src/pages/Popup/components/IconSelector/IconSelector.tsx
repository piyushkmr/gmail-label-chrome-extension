import { MDI_ICONS } from 'pages/icons';
import React, { useCallback, useState } from 'react';
import './iconSelector.scss';

export const IconSelector = () => {
  const [iconValue, setIconValue] = useState('');

  const handleIconChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      setIconValue(value);
    },
    []
  );

  const iconFilterRegex = new RegExp(
    `${iconValue.split('').join('.*')}.*`,
    'ig'
  );
  const filteredIcons = MDI_ICONS.filter((iconName) =>
    iconFilterRegex.test(iconName)
  );

  return (
    <div className="icon-selector-container">
      <input onChange={handleIconChange} />
      <div className="icon-selector">
        {filteredIcons.map((iconName) => {
          return (
            <button
              style={{ width: '5em', height: '5em' }}
              name="iconName"
              value={iconName}
            >
              <span className={`icon-preview mdi mdi-${iconName}`}></span>
              {iconName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

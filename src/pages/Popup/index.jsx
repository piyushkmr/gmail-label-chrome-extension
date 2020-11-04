import React from 'react';
import { render } from 'react-dom';

import { Popup } from './components/Popup';
import './index.scss';
import 'bootstrap';


render(<Popup />, window.document.querySelector('#app-container'));

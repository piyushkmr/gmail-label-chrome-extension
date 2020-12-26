import React from 'react';
import { render } from 'react-dom';

import { Popup } from './components/Popup';
import './index.scss';
import 'bootstrap';
import 'assets/img/icon-34.png';
import 'assets/img/icon-128.png';


render(<Popup />, window.document.querySelector('#app-container'));

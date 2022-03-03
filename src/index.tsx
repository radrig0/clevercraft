import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '@src/app';
import '@src/index.css';
import { ViewModel } from '@src/ViewModel';

const vm = new ViewModel();

const root = document.getElementById('root');
ReactDOM.render(<App vm={vm} />, root);

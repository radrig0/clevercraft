import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '@src/app';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from '@src/index.css';
import { ViewModel } from '@src/ViewModel';

const vm = new ViewModel();

const root = document.getElementById('root');
root?.classList.add(s.root);
ReactDOM.render(<App vm={vm} />, root);

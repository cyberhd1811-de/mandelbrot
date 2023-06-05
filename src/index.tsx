/* @refresh reload */

import { render } from 'solid-js/web';

import App from './App';

import './styles/index.scss';

render(() => <App />, document.getElementById('root')!);

export type NumberPair = [number, number];

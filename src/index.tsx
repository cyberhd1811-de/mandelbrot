/* @refresh reload */

import { render } from 'solid-js/web';

import App, { MainContext as MC } from './App';

import './styles/index.scss';

render(() => <App />, document.getElementById('root')!);

export type NumberPair = [number, number];
export const MainContext = MC;

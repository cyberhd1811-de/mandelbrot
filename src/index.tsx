/* @refresh reload */

import { render } from 'solid-js/web';

import App, { MainContext } from './App';

import './styles/index.scss';

render(() => <App />, document.getElementById('root')!);

type NumberPair = [number, number];

export { MainContext };
export type { NumberPair };

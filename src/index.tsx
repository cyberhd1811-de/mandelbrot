/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';

import App from './App';

import './styles/index.scss';

if ('serviceWorker' in navigator) {
    window.onload = async function () {
        await navigator.serviceWorker.register('./serviceWorker.js', {});
    };
}

render(
    () => (
        <Router>
            <App />
        </Router>
    ),
    document.getElementById('root')!
);

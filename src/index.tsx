/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';

import App from './App';

import './styles/index.scss';

if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('/sw.js');
}

render(
    () => (
        <Router>
            <App />
        </Router>
    ),
    document.getElementById('root')!
);

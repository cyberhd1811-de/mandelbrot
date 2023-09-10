import { onMount, type Component } from 'solid-js';

import { useSettings } from '../Context';

import './Settings.scss';

const Settings: Component = function () {
    const [, { setLastLocation }] = useSettings();

    onMount(function () {
        setLastLocation('/settings');
    });

    return (
        <main id='settings'>
            <h2>Settings Page</h2>
            <p><b>WORK IN PROGRESS</b></p>
        </main>
    );
};

export default Settings;

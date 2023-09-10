import type { Component } from 'solid-js';

import { Button } from '../Component';
import { useSettings } from '../Context';

const NotFound: Component = function () {
    const [{ lastLocation }] = useSettings();

    return (
        <main id='not_found'>
            <h2>Not Found</h2>
            <p>This page doesn't exist!</p>
            <Button
                title='Return to last page'
                onClick={() => (location.pathname = lastLocation())}
            />
        </main>
    );
};

export default NotFound;

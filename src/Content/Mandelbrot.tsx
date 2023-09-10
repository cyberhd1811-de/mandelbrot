import { onMount, type Component } from 'solid-js';

import {
    MandelbrotButtonWrapper,
    MandelbrotDisplayWrapper,
    MandelbrotSet,
} from '../Component';
import { MandelbrotProvider, useSettings } from '../Context';

import './Mandelbrot.scss';

const Mandelbrot: Component = function () {
    const [, { setLastLocation }] = useSettings();

    onMount(function () {
        setLastLocation('/');
    });

    return (
        <MandelbrotProvider>
            <main id='mandelbrot'>
                <MandelbrotSet />
                <MandelbrotButtonWrapper />
                <MandelbrotDisplayWrapper />
            </main>
        </MandelbrotProvider>
    );
};

export default Mandelbrot;

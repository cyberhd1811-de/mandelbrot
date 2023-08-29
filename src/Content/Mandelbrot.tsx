import type { Component } from 'solid-js';

import {
    MandelbrotButtonWrapper,
    MandelbrotDisplayWrapper,
    MandelbrotSet,
} from '../Components';
import { MandelbrotProvider } from '../Context';

import './Mandelbrot.scss';

const Mandelbrot: Component = function () {
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

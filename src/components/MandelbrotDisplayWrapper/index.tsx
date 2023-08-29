import type { Component } from 'solid-js';

import { Display } from '..';
import { useMandelbrot, useSettings } from '../../Context';

import './MandelbrotDisplayWrapper.scss';

const MandelbrotDisplayWrapper: Component = function () {
    const [{ mouseCoordinates, zoomFactor }] = useMandelbrot();
    const [{ showZoom }] = useSettings();

    function calculateRoundedX() {
        return Math.round(mouseCoordinates()[0] * 1000) / 1000;
    }

    function calculateRoundedY() {
        return Math.round(mouseCoordinates()[1] * 1000) / 1000;
    }

    return (
        <section id='mandelbrot_display'>
            <Display
                description='Real part of complex number'
                id='mandelbrot_display_x'
                value={calculateRoundedX()}
                word='X'
            />
            <Display
                description='Imaginary part of complex number'
                id='mandelbrot_display_y'
                value={calculateRoundedY()}
                word='Y'
            />
            {showZoom() && (
                <Display
                    description='The zoom factor of the current view of the mandelbrot set'
                    id='mandelbrot_display_zoom'
                    value={zoomFactor()}
                    word='Zoom'
                />
            )}
        </section>
    );
};

export default MandelbrotDisplayWrapper;

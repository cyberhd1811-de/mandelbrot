import type { Component } from 'solid-js';

import { Button } from '..';
import { useMandelbrot } from '../../Context';

const MandelbrotButtonWrapper: Component = function () {
    const [, { resetOrigin, resetZoom, setOriginCoordinates, setZoomFactor }] =
        useMandelbrot();

    function zoomIn() {
        setZoomFactor((prev) => prev * 2);
        setOriginCoordinates();
    }

    function zoomOut() {
        let zoom = setZoomFactor((prev) => (prev > 1 ? prev / 2 : prev));

        if (zoom === 1) resetOrigin();
    }

    return (
        <section id='mandelbrot_button'>
            <Button title='Zoom in' onClick={zoomIn} />
            <Button title='Zoom out' onClick={zoomOut} />
            <Button title='Reset Zoom' onClick={resetZoom} />
        </section>
    );
};

export default MandelbrotButtonWrapper;

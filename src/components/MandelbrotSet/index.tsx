import { type Component, createEffect, onMount } from 'solid-js';

import colors from './colors';
import * as Functions from '../../Util';
import { useMandelbrot, useSettings } from '../../Context';

import './MandelbrotSet.scss';

const { isMobile, plotPointOnCanvas } = Functions;

const MandelbrotSet: Component = function () {
    let canvas: HTMLCanvasElement;

    const [{}, { setMouseCoordinates, setPlannedOriginCoordinates }] =
        useMandelbrot();
    const [{ size }] = useSettings();
    const [height, width] = size();

    function handleMouseMove({ offsetX, offsetY }: MouseEvent) {
        setMouseCoordinates([offsetX, offsetY], [height, width]);
    }

    createEffect(function () {
        const context = canvas.getContext('2d')!;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                plotPointOnCanvas(context, [x, y], [height, width]);
            }
        }
    });

    return (
        <canvas
            height={height}
            id='mandelbrot_set'
            width={width}
            ref={canvas!}
            onClick={() => {
                setPlannedOriginCoordinates();
            }}
            onMouseMove={handleMouseMove}
        />
    );
};

export default MandelbrotSet;
export { colors };

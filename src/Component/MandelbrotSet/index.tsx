import { createEffect, type Component } from 'solid-js';

import colors from './colors';
import * as Functions from '../../Util';
import { useMandelbrot, useSettings } from '../../Context';

import './MandelbrotSet.scss';

const { plotPointOnCanvas } = Functions;

const MandelbrotSet: Component = function () {
    let canvas: HTMLCanvasElement;

    const [{}, { setMouseCoordinates, setPlannedOriginCoordinates }] =
        useMandelbrot();

    const [{ canvasSize }] = useSettings();
    let [height, width] = canvasSize();

    function handleMouseMove({ offsetX, offsetY }: MouseEvent) {
        setMouseCoordinates([offsetX, offsetY], [height, width]);
    }

    createEffect(function () {
        [height, width] = canvasSize();
        const context = canvas.getContext('2d')!;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                plotPointOnCanvas(context, [x, y], [height, width]);
            }
        }
    });

    return (
        <canvas
            height={canvasSize()[0]}
            id='mandelbrot_set'
            width={canvasSize()[1]}
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

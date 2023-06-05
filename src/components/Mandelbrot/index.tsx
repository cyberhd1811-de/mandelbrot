import { Component, onMount, useContext } from 'solid-js';

import style from './Mandelbrot.module.scss';
import { plotPoint } from './Functions';
import { NumberPair } from '../..';
import { MainContext } from '../../App';

const Mandelbrot: Component<{
    height?: number;
    radius?: number;
    width?: number;
}> = ({ height = 350, radius = 1, width = 350 }) => {
    const [size] = useContext(MainContext);
    let canvas: HTMLCanvasElement;

    onMount(() => {
        const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
        const scaleFactors: NumberPair = [
            1 / (0.25 * height),
            1 / (0.25 * width),
        ];

        for (let x = 0; x < width + radius - 1; x += radius) {
            for (let y = 0; y < height + radius - 1; y += radius) {
                plotPoint(
                    [x, y],
                    context,
                    radius,
                    [height, width],
                    scaleFactors
                );
            }
        }
    });

    return (
        <canvas
            class={(size.height < height || size.width < width) ? style.mandelbrot__min : style.mandelbrot}
            height={height}
            width={width}
            ref={canvas!}
        />
    );
};

export default Mandelbrot;

import { Component, Setter, onMount, useContext } from 'solid-js';


import { calculateValues, plotPoint } from './Functions';

import { MainContext, type NumberPair } from '../..';

import style from './Mandelbrot.module.scss';

const Mandelbrot: Component<{
    height?: number;
    radius?: number;
    setMandelbrot: Setter<{
        x: number;
        y: number;
        cr: number;
        ci: number;
    }>;
    width?: number;
}> = ({ height = 350, radius = 1, setMandelbrot, width = 350 }) => {
    const [props] = useContext(MainContext);
    let canvas: HTMLCanvasElement;
    const scaleFactors: NumberPair = [1 / (0.25 * height), 1 / (0.25 * width)];

    const handleMouseMove = ({ offsetX, offsetY }: MouseEvent) => {
        const [cr, ci] = calculateValues(
            [offsetX, offsetY],
            [height, width],
            scaleFactors
        );

        setMandelbrot({
            x: offsetX,
            y: offsetY,
            cr: Math.round(cr * 1000) / 1000,
            ci: Math.round(ci * 1000) / 1000,
        });
    };

    onMount(() => {
        const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

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
        <>
            <canvas
                class={
                    props.height < height || props.width < width
                        ? style.mandelbrot__min
                        : style.mandelbrot
                }
                height={height}
                width={width}
                ref={canvas!}
                onMouseMove={handleMouseMove}
            />
        </>
    );
};

export default Mandelbrot;

import { calculateDepth } from '.';
import type { NumberPair } from '../../..';

export default (
    [x, y]: NumberPair,
    canvasContext2D: CanvasRenderingContext2D,
    radius: number = 1,
    height_width: NumberPair,
    scaleFactors: NumberPair,
    iterations = 100
) => {
    const depth = calculateDepth(
        [x, y],
        height_width,
        iterations,
        scaleFactors
    );
    const colors = ['red', 'green', 'blue', 'yellow', 'orange'];

    canvasContext2D.fillStyle =
        depth === -1 ? 'black' : colors[depth % colors.length];
    canvasContext2D.beginPath();
    canvasContext2D.fillRect(
        x - 0.5 * radius,
        y - 0.5 * radius,
        radius,
        radius
    );
};

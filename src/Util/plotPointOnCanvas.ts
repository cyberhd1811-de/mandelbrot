import { mandelbrotFunction } from '.';
import { colors } from '../Component/MandelbrotSet';

export default function (
    context: CanvasRenderingContext2D,
    [x, y]: [number, number],
    h_w: [number, number]
) {
    const depth = mandelbrotFunction([x, y], h_w, 100);

    context.fillStyle = depth < 0 ? 'black' : colors[depth % colors.length];
    context.beginPath();
    context.fillRect(x, y, 1, 1);
}

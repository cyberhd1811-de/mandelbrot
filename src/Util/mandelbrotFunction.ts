import { calculateComplexNumber } from '.';
import { useMandelbrot } from '../Context';

export default function (
    [x, y]: [number, number],
    height_width: [number, number],
    iterations: number
): number {
    const [{ originCoordinates, zoomFactor }] = useMandelbrot();

    const [cr, ci] = calculateComplexNumber(
        [x, y],
        height_width,
        originCoordinates(),
        zoomFactor()
    );

    let zr = 0;
    let zi = 0;

    for (let i = 0; i < iterations; i++) {
        let _zr: number = zr ** 2 - zi ** 2 + (cr as number);
        let _zi: number = 2 * zr * zi + (ci as number);

        // C0 is 0 + 0i -> Root of complex plane
        let distanceFromC0 = Math.sqrt(_zr ** 2 + _zi ** 2);

        if (distanceFromC0 >= 2) return i;
        zr = _zr;
        zi = _zi;
    }

    return -1;
}

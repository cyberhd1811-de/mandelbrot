import { calculateValues } from '.';
import type { NumberPair } from '../../..';

export default (
    [x, y]: NumberPair,
    height_width: NumberPair,
    iterations = 10,
    scaleFactor: NumberPair
): number | -1 => {
    const [cr, ci] = calculateValues([x, y], height_width, scaleFactor);
    let zr = 0;
    let zi = 0;
    for (let i = 0; i < iterations; i++) {
        const _zr = zr;
        const _zi = zi;

        zr = _zr ** 2 - _zi ** 2 + cr;
        zi = 2 * _zr * _zi + ci;

        const dist = Math.sqrt(zr ** 2 + zi ** 2);
        if (dist > 2) {
            return i;
        }
    }

    return -1;
};

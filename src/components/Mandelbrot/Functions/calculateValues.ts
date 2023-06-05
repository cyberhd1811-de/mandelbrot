import type { NumberPair } from '../../..';

export default (
    [x, y]: NumberPair,
    [height, width]: NumberPair,
    [scaleFactorHeight, scaleFactorWidth]: NumberPair
): NumberPair => {
    let r = (x - width / 2) * scaleFactorWidth;
    let i = -1 * (y - height / 2) * scaleFactorHeight;

    return [r, i];
};

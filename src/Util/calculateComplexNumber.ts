export default function (
    [x, y]: [number, number],
    [height, width]: [number, number],
    [originR, originI]: [number, number],
    zoomFactor: number
): [number, number] {
    const widthZoom = 4 / (width * zoomFactor);
    const heightZoom = 4 / (height * zoomFactor);

    let cr = originR + (x - width / 2) * widthZoom;
    let ci = originI - (y - height / 2) * heightZoom;

    return [cr, ci];
}

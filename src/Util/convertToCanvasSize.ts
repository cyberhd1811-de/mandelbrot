export default function ([height, width]: [number, number]): [number, number] {
    let sideLength: number;

    if (width < height) {
        sideLength = width < 270 ? 250 : width - 20;
        return [sideLength, sideLength];
    }

    sideLength = height < 414 ? 250 : height - 200;
    return [sideLength, sideLength];
}

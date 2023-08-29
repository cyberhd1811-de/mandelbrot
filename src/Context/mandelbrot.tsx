import {
    createContext,
    useContext,
    type Accessor,
    type JSX,
    type Setter,
} from 'solid-js';

import { useSettings } from './settings';
import { createSignalInStorage } from '../Hooks';
import { calculateComplexNumber } from '../Util';

type MandelbrotContextType = [
    {
        mouseCoordinates: Accessor<[number, number]>;
        originCoordinates: Accessor<[number, number]>;
        plannedOriginCoordinates: Accessor<[number, number]>;
        zoomFactor: Accessor<number>;
    },
    {
        resetOrigin: () => void;
        resetZoom: () => void;
        setMouseCoordinates: (
            x_y: [number, number],
            height_width: [number, number]
        ) => void;
        setOriginCoordinates: () => void;
        setPlannedOriginCoordinates: () => void;
        setZoomFactor: Setter<number>;
    }
];

const MandelbrotContext = createContext<MandelbrotContextType>();

export function MandelbrotProvider(props: { children: JSX.Element }) {
    const [{ precisionMode }] = useSettings();

    const [mouseCoordinates, _setMouseCoordinates] = createSignalInStorage({
        defaultValue: [0, 0] as [number, number],
        key: 'mouseCoordinates',
    });

    const [originCoordinates, _setOriginCoordinates] = createSignalInStorage({
        defaultValue: [0, 0] as [number, number],
        key: 'originCoordinates',
    });

    const [plannedOriginCoordinates, _setPlannedOriginCoordinates] =
        createSignalInStorage({
            defaultValue: [0, 0] as [number, number],
            key: 'plannedOriginCoordinates',
        });

    const [zoomFactor, setZoomFactor] = createSignalInStorage({
        defaultValue: 1,
        key: 'zoomFactor',
    });

    const store: MandelbrotContextType = [
        {
            mouseCoordinates,
            originCoordinates,
            plannedOriginCoordinates,
            zoomFactor,
        },
        {
            resetOrigin: function () {
                _setOriginCoordinates([0, 0]);
                _setPlannedOriginCoordinates([0, 0]);
            },
            resetZoom: function () {
                _setOriginCoordinates([0, 0]);
                _setPlannedOriginCoordinates([0, 0]);
                setZoomFactor(() => 1);
            },
            setMouseCoordinates: function (
                x_y: [number, number],
                height_width: [number, number]
            ) {
                _setMouseCoordinates(
                    calculateComplexNumber(
                        x_y,
                        height_width,
                        originCoordinates(),
                        zoomFactor()
                    )
                );
            },
            setOriginCoordinates: function () {
                _setOriginCoordinates(plannedOriginCoordinates());
            },
            setPlannedOriginCoordinates: function () {
                _setPlannedOriginCoordinates(mouseCoordinates());
            },
            setZoomFactor,
        },
    ];

    return (
        <MandelbrotContext.Provider value={store}>
            {props.children}
        </MandelbrotContext.Provider>
    );
}

export function useMandelbrot() {
    const mandelbrotContext = useContext(MandelbrotContext);

    if (!mandelbrotContext) {
        throw new Error('MandelbrotContext not found!');
    }

    return mandelbrotContext;
}

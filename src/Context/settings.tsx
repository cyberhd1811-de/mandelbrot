import {
    createContext,
    createSignal,
    useContext,
    type Accessor,
    type Setter,
} from 'solid-js';

import { createSignalInStorage } from '../Hooks';
import { convertToCanvasSize } from '../Util';

export type PRECISIONMODES = 'NORMAL';

type SettingsContextType = [
    {
        canvasSize: Accessor<[number, number]>;
        lastLocation: Accessor<string>;
        precisionMode: Accessor<PRECISIONMODES>;
        showZoom: Accessor<boolean>;
    },
    {
        setLastLocation: Setter<string>;
        setPrecisionMode: Setter<PRECISIONMODES>;
        setShowZoom: Setter<boolean>;
    }
];

const SettingsContext = createContext<SettingsContextType>();

export function SettingsProvider(props: {
    children: any;
    screenSize: Accessor<[number, number]>;
}) {
    const [showZoom, setShowZoom] = createSignalInStorage({
        defaultValue: false,
        key: 'showZoom',
    });

    const [lastLocation, setLastLocation] = createSignalInStorage<string>({
        key: 'lastLocation',
        defaultValue: '/',
    });

    const [precisionMode, setPrecisionMode] =
        createSignalInStorage<PRECISIONMODES>({
            defaultValue: 'NORMAL',
            key: 'precisionMode',
        });

    const [canvasSize, _setCanvasSize] = createSignal<[number, number]>(
        convertToCanvasSize(props.screenSize())
    );

    window.onresize = function () {
        _setCanvasSize(convertToCanvasSize(props.screenSize()));
    };

    const store: SettingsContextType = [
        {
            canvasSize,
            lastLocation,
            precisionMode,
            showZoom,
        },
        {
            setLastLocation,
            setPrecisionMode,
            setShowZoom,
        },
    ];

    return (
        <SettingsContext.Provider value={store}>
            {props.children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const settingsContext = useContext(SettingsContext);

    if (!settingsContext) {
        throw new Error('SettingsContext not found!');
    }

    return settingsContext;
}

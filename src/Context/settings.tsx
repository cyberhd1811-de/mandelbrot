import {
    type Accessor,
    type Setter,
    createContext,
    createSignal,
    useContext,
} from 'solid-js';
import { createSignalInStorage } from '../Hooks';

export type PRECISIONMODES = 'NORMAL';

type SettingsContextType = [
    {
        precisionMode: Accessor<PRECISIONMODES>;
        showZoom: Accessor<boolean>;
        size: Accessor<[number, number]>;
    },
    {
        setPrecisionMode: Setter<PRECISIONMODES>;
        setShowZoom: Setter<boolean>;
        setSize: Setter<[number, number]>;
    }
];

const SettingsContext = createContext<SettingsContextType>();

export function SettingsProvider(props: any) {
    const [showZoom, setShowZoom] = createSignalInStorage({
        defaultValue: false,
        key: 'showZoom',
    });

    const [precisionMode, setPrecisionMode] =
        createSignalInStorage<PRECISIONMODES>({
            defaultValue: 'NORMAL',
            key: 'precisionMode',
        });

    const [size, setSize] = createSignal(
        (props.canvasSize as [number, number]) || [0, 0]
    );

    const store: SettingsContextType = [
        {
            precisionMode,
            showZoom,
            size,
        },
        {
            setPrecisionMode,
            setShowZoom,
            setSize,
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

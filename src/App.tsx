import { Component, createContext, createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';

import { DataTuple, Mandelbrot } from './components';

import style from './styles/App.module.scss';

export const MainContext = createContext([
    {
        height: 0,
        width: 0,
    },
]);

const App: Component<{}> = () => {
    const [size, setSize] = createStore({
        height: innerHeight,
        width: innerWidth,
    });

    const [mandelbrot, setMandelbrot] = createSignal({
        x: 0,
        y: 0,
        cr: 0,
        ci: 0,
    });

    const store = [
        {
            ...size,
        },
    ];

    onMount(() => {
        addEventListener('resize', () => {
            setSize({
                height: innerHeight,
                width: innerWidth,
            });
        });
    });

    let isMobile = false;

    return (
        <MainContext.Provider value={store}>
            <header class={style.header}>
                {/* ${size().width};${size().height} */}
            </header>
            <main class={style.main}>
                <Mandelbrot
                    height={500}
                    radius={1}
                    setMandelbrot={setMandelbrot}
                    width={500}
                />
                <section class={style.main__data}>
                    <DataTuple
                        data={[
                            {
                                name: 'X',
                                description: isMobile
                                    ? 'X-Wert, bei dem die letzte Berührung war.'
                                    : 'X-Wert, bei dem der Mauszeiger zuletzt war.',
                                value: mandelbrot,
                                key: 'x',
                            },
                            {
                                name: 'Y',
                                description: isMobile
                                    ? 'Y-Wert, bei dem die letzte Berührung war.'
                                    : 'Y-Wert, bei dem der Mauszeiger zuletzt war.',
                                value: mandelbrot,
                                key: 'y',
                            },
                        ]}
                    />
                    <DataTuple
                        data={[
                            {
                                name: 'CR',
                                description:
                                    'Der reale Zahlenteil der komplexen Zahl',
                                value: mandelbrot,
                                key: 'cr',
                            },
                            {
                                name: 'CI',
                                description:
                                    'Der imaginäre Zahlenteil der komplexen Zahl',
                                value: mandelbrot,
                                key: 'ci',
                            },
                        ]}
                    />
                </section>
            </main>
            <footer class={style.footer}></footer>
        </MainContext.Provider>
    );
};

export default App;

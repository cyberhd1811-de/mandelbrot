import {
    Component,
    createContext,
    onCleanup,
    onMount,
} from 'solid-js';
import { createStore } from 'solid-js/store';

import { Mandelbrot } from './components';

import styles from './styles/App.module.scss';

export const MainContext = createContext([{
    height: 0,
    width: 0,
}]);

const App: Component<{}> = () => {
    const [size, setSize] = createStore({
        height: innerHeight,
        width: innerWidth,
    });

    const store = [size];

    onMount(() => {
        addEventListener('resize', () => {
            setSize({
                height: innerHeight,
                width: innerWidth,
            });
        });
    });

    onCleanup(() => {
        removeEventListener('resize', () => {
            setSize({
                height: innerHeight,
                width: innerWidth,
            });
        });
    });

    return (
        <MainContext.Provider value={store}>
            <header class={styles.header}>
                {/* ${size().width};${size().height} */}
            </header>
            <main class={styles.main}>
                <Mandelbrot height={500} radius={1} width={500} />
            </main>
            <footer class={styles.footer}></footer>
        </MainContext.Provider>
    );
};

export default App;

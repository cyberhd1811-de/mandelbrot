import { createEffect, createSignal, type Component } from 'solid-js';
import { Route, Routes } from '@solidjs/router';

import { Footer, Header, Mandelbrot, NotFound, Settings } from './Content';
import { SettingsProvider } from './Context';

const App: Component = () => {
    const [screenSize, setScreenSize] = createSignal<[number, number]>([
        window.innerHeight,
        window.innerWidth,
    ]);

    createEffect(function () {
        window.addEventListener('resize', function () {
            setScreenSize([window.innerHeight, window.innerWidth]);
        });
    });

    return (
        <SettingsProvider screenSize={screenSize}>
            <Header />
            <Routes>
                <Route path='/' component={Mandelbrot} />
                <Route path='/settings' component={Settings} />
                <Route
                    path='*'
                    element={<script>{(location.pathname = '/')}</script>}
                />
                {/* <Route path='*' component={NotFound} /> */}
            </Routes>
            <Footer />
        </SettingsProvider>
    );
};

export default App;

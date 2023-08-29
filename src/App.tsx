import { type Component } from 'solid-js';
import { Route, Routes } from '@solidjs/router';

import { Footer, Header, Mandelbrot, NotFound } from './Content';
import { SettingsProvider } from './Context';
import { isMobile } from './Util';

const App: Component = () => {

    return (
        <SettingsProvider canvasSize={isMobile() ? [350, 350] : [500, 500]}>
            <Header />
            <Routes>
                <Route path='/' component={Mandelbrot} />
                <Route path='*' component={NotFound} />
            </Routes>
            <Footer />
        </SettingsProvider>
    );
};

export default App;

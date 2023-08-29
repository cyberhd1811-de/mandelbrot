import type { Component } from 'solid-js';

import './Display.scss';

const Display: Component<{
    description: string;
    id: string;
    value: string | number;
    word: string;
}> = function (props) {
    return (
        <article id={props.id} class='display'>
            <p>
                <abbr title={props.description}>{props.word}</abbr>:{' '}
                {props.value}
            </p>
        </article>
    );
};

export default Display;

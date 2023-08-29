import type { Component } from 'solid-js';

import './Button.scss';

const Button: Component<{ onClick: () => void; title: string }> = function (
    props
) {
    return (
        <button onClick={props.onClick} class='button'>
            {props.title}
        </button>
    );
};

export default Button;

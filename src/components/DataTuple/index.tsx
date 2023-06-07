import { Accessor, Component, For } from 'solid-js';

import style from './DataTuple.module.scss';

const DataTuple: Component<{
    data: {
        name: string;
        description: string;
        value: Accessor<{ [key: string]: string | number }>;
        key: keyof { [key: string]: string | number };
    }[];
}> = ({ data }) => {
    return (
        <article class={style.datatuple}>
            <For each={data}>
                {({ description, name, value, key }) => (
                    <p class={style.data}>
                        <abbr title={description}>{name}</abbr>: {value()[key]}
                    </p>
                )}
            </For>
        </article>
    );
};

export default DataTuple;

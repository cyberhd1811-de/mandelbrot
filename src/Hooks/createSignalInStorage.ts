import { createSignal, type Setter, type Signal } from 'solid-js';

export default function <T>({
    key,
    defaultValue,
    storage = localStorage,
}: {
    key: string;
    defaultValue: T;
    storage?: Storage;
}): Signal<T> {
    const initialValue = storage.getItem(key)
        ? (JSON.parse(storage.getItem(key)!) as T)
        : defaultValue;

    const [value, setValue] = createSignal<T>(initialValue);

    const store = function (fn: Setter<T>) {
        let newValue = setValue(fn);
        storage.setItem(key, JSON.stringify(newValue));

        return newValue;
    } as typeof setValue;

    store((prev) => prev);
    return [value, store];
}

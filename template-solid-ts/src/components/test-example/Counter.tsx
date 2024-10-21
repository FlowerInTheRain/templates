import {createSignal} from "solid-js";

export const Counter = () => {
    const [count, setCount] = createSignal(1);
    return (
        <>
            <button onClick={() => setCount(count() + 1)} id="increment">
                Increment
            </button>
            <button onClick={() => setCount(count() - 1)} id="decrement">
                Decrement
            </button>
            <span id={"display"}>{count()}</span>
        </>
    );
}
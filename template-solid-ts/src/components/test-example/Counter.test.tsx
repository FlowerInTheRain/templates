import { test, expect } from "vitest"
import { render } from "@solidjs/testing-library"
import userEvent from "@testing-library/user-event"
import { Counter } from "./Counter"

const user = userEvent.setup()

test("increment then decrement value", async () => {
    const { container } = render(() => <Counter />)
    const counter = container.querySelector<HTMLSpanElement>("#display")!
    const increment = container.querySelector<HTMLButtonElement>("#increment")!
    const decrement = container.querySelector<HTMLButtonElement>("#decrement")!
    expect(counter.textContent).equals("1")
    await user.click(increment)
    expect(counter.textContent).equals("2")
    await user.click(decrement)
    expect(counter.textContent).equals("1")
})
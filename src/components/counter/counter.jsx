import { useState } from "react";
import "./Counter.css";
import CounterButton from "./CounterButton";

export default function Counter() {
  const [count, setCount] = useState(0);

  function IncrementCounterParentButton(by) {
    setCount(count + by);
  }

  function DecrementCounterParentButton(by) {
    setCount(count - by);
  }

  function ResetCounter() {
    setCount(0);
  }

  return (
    <div>
      <span className="totalCount">{count}</span>
      <CounterButton
        by={1}
        incrementMethod={IncrementCounterParentButton}
        decrementMethod={DecrementCounterParentButton}
      ></CounterButton>
      <CounterButton
        by={2}
        incrementMethod={IncrementCounterParentButton}
        decrementMethod={DecrementCounterParentButton}
      ></CounterButton>
      <CounterButton
        by={5}
        incrementMethod={IncrementCounterParentButton}
        decrementMethod={DecrementCounterParentButton}
      ></CounterButton>
      <button className="resetButton" onClick={ResetCounter}>
        RESET
      </button>
    </div>
  );
}

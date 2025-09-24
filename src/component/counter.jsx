import { useState } from "react";
import '../styles/counter.css'
function Counter() {
  let [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h2>Counter</h2>
        <p>{count}</p>
        <div className="btn">
          <button onClick={() => setCount((count) => count + 1)}>
            increase
          </button>
          <button onClick={() => setCount((count) => count - 1)}>
            decrease
          </button>
          <button onClick={() => setCount((count) => count == 0)}>
            clear
          </button>
        </div>
      </div>
    </>
  );
}

export default Counter;

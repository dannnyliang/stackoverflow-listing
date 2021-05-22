import { useAppDispatch, useAppSelector } from "./hooks";
import {
  decrement,
  increment,
  incrementAsync,
  incrementIfOdd,
} from "./redux/reducer/counter";

function App() {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  const handleIncrementAsync = () => dispatch(incrementAsync());
  const handleIncrementIfOdd = () => dispatch(incrementIfOdd());
  const handleIncrement = () => dispatch(increment());
  const handleDecrement = () => dispatch(decrement());

  return (
    <div>
      <h1>Hello World</h1>
      <div>
        <button onClick={handleIncrementAsync}>Increment after 1 second</button>
        <button onClick={handleIncrementIfOdd}>
          Increment if count is odd
        </button>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <hr />
        <div>Clicked: {count} times</div>
      </div>
    </div>
  );
}

export default App;

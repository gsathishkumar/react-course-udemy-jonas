import './App.css';
// import Counter from './Counter';
import DateCounter from './DateCounter';

function App() {
  return (
    <div className="App">
      {
        /* Counter Component using useState Hook*/
        /* <Counter /> */
        /* DateCounter Component using useReducer Hook*/
        <DateCounter />
      }
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Squares from './Components/Squares';

function App() {
  return (
    <div className="App">
      <Squares maxValue={7}/>
    </div>
  );
}

export default App;

import './App.css';
import { Calculator, Circle, Rectangle } from './components';

function App() {
  return (
    <div className="app__background">
      <Circle />
      <Calculator />
      <Rectangle />
    </div>
  );
}

export default App;

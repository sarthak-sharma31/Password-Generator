import logo from './logo.svg';
import './App.css';
import MainHeading from './components/MainHeading';
import Image from './components/Image';
import Functionality from './components/Functionality';

function App() {
  return (
    <div className="container">
      <MainHeading></MainHeading>

      <div className="main-content">
        <Image></Image>
        <Functionality></Functionality>
      </div>

    </div>
  );
}

export default App;

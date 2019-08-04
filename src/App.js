import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useHttp } from './hooks/useHttp'

function App() {
    // const [isLoading, fetchedData] = useHttp('https://samples.openweathermap.org/data/2.5/forecast/hourly?q=Mumbai,india&appid=testing', []);
    const [isLoading, fetchedData] = useHttp('https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=3f2dfade3b05b90e671ea82426434282', []);
    // ?q=London&appid=b6907d289e10d714a6e88b30761fae22
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
import React from 'react';
import Grid from './Grid';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Wave Grid Animation</h1>
      <Grid rows={15} columns={20} />
    </div>
  );
}

export default App;



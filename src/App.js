import React from 'react';
import './App.scss';
import Home from "./views/Home/Home";
import Header from "./components/Header";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Home />
    </React.Fragment>
  );
}

export default App;

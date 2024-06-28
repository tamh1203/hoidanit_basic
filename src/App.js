import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import Mycomponent from './components/Mycomponent';
import React from 'react';

const App = () => {


  return (
    <div className="app">
      Hello Giant
    </div>
  );
}

export default App;

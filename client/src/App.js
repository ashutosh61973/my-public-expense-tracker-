import './App.css';
import AddTransaction from './Components/AddTransaction';
import Balance from './Components/Balance';
import Header from './Components/Header';
import IncomeExpenses from './Components/IncomeExpenses';
import TransactionList from './Components/TransactionList';
import {GlobalProvider} from './Context/GlobalState';
import React from "react";
// import 'bootstrap/dist/css/bootstrap.css';
function App({history}) {



  return (
    <GlobalProvider>
    <div className="appouter">
    <div className="App">
      <Header />
      <div className="container">
        <Balance></Balance>
        <IncomeExpenses/>
        <TransactionList/>
        <AddTransaction />
      </div>
    </div>
    </div>
   
    </GlobalProvider>
  );
}

export default App;

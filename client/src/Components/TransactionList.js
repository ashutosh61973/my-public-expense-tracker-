import React from 'react'
import { useContext,useEffect } from 'react';
import { GlobalContext } from '../Context/GlobalState'
import Transaction from './Transaction';
const TransactionList = ({history}) => {
    const {transactions,getTransactions} = useContext(GlobalContext);

    useEffect(() => {
        
        // if(!localStorage.getItem("authToken")){
        //     history.push("/login");
        // }
        getTransactions();
        //eslint-disable-next-line 
    }, []);


    return (
        <>
           <h3>History</h3>
           <ul className="list" >
                {
                    transactions.map(transaction=>(<Transaction key={transaction.id} transaction={transaction}/>))
                }
           </ul> 
        </>
    )
}

export default TransactionList;

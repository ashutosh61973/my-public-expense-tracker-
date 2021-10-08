import React from 'react'
import { useState,useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';
// import { Button } from '@mui/material';
const AddTransaction = () => {
    
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const {addTransaction} = useContext(GlobalContext);
    const onSubmit=(e)=>{
        e.preventDefault();
        const newTransaction={
            id:Math.floor(Math.random()*100000000),
            text,
            amount:+amount
        }
        addTransaction(newTransaction);
    }
    return (
        <>
            <h3>Add-New-Transaction</h3>
            <form onSubmit={onSubmit}> 
                <div className="form-control">
                    <label htmlfor="text">Text</label>
                    <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter text" />
                </div>
                
                <div className="form-control">
                    <label htmlfor="amount">Amount <br/>
                    (negative-expense,positive-income)
                    </label>
                    <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Enter Amount" />
                </div>
                <button>Add Transaction</button>
            </form>
        </>
    )
}

export default AddTransaction

import React, { useContext } from 'react'
import {GlobalContext} from '../Context/GlobalState';

const Balance = () => {
    
    const {transactions}=useContext(GlobalContext);
    const amounts =transactions.map((transaction)=>(transaction.amount));
    const reducer=(previousval,currentval)=>previousval+currentval;
    const total=amounts.reduce(reducer,0).toFixed(2);
    // let tt=0;
    // amounts.forEach((val)=>{
    //     tt=tt+val;
    // })
    
    return (
        <>
            <h4>Your Balance</h4>
            <h1>${total}</h1>
        </>
    )
}

export default Balance

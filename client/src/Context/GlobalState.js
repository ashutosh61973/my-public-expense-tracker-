import React, {createContext,useReducer} from "react";
import AppReducer from './AppReducer'
import axios from 'axios';
// import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
// initial state
const initialState ={
    transactions:[
        // {id: 1,text:'flower',amount:-20},
        // {id: 2,text:'salary',amount:300},
        // {id: 3,text:'book',amount:-10},
        // {id: 4,text:'camera',amount:150}
    ],
    error:null,
    loading:true,
}
//create Context
export const GlobalContext=createContext(initialState);
//provider component
export const GlobalProvider = ({children})=>{
    const [state,dispatch] = useReducer(AppReducer,initialState);

    // action 
    let history=useHistory();
    async function getTransactions(){
        if(!localStorage.getItem('authToken'))
        {
            history.push('/home');
        }
        const config ={
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            }
        }
        console.log(config.headers.Authorization);
        try {
            const res= await axios.get('/api/v1/transactions',config);
            
            dispatch({
                type:'GET_TRANSACTIONS',
                payload:res.data.data
            });

        } catch (err) {
            localStorage.removeItem("authToken");
            dispatch({
                type:'TRANSACTION_ERROR',
                payload:err.response.data.error
            });

        }
    }

    //ACTION
    async function deleteTransaction(id){
       
       
       
        if(!localStorage.getItem('authToken'))
        {
             history.push('/login');
            
        }
        const config ={
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            }
        }
       
        try {
        
            await axios.delete(`/api/v1/transactions/${id}`,config); 
        
            dispatch({
                type:"DELETE_TRANSACTION",
                payload:id
            });
        
        } catch (err) {
            localStorage.removeItem("authToken");
            dispatch({
                type:'TRANSACTION_ERROR',
                payload:err.response.data.error
            });
        }
     
    }
    //action add
    
    async  function addTransaction(transaction){
        
        if(!localStorage.getItem('authToken'))
        {
             history.push('/login');
           
        }
        const config ={
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            }
        }
        console.log("i am adder");
        try {
            
            const res= await axios.post('/api/v1/transactions',transaction,config);

            dispatch({
            type:"ADD_TRANSACTION",
            payload:res.data.data
            });
        }
        catch(err){
            localStorage.removeItem("authToken");
            dispatch({
                type:'TRANSACTION_ERROR',
                payload:err.response.data.error
            });
        }
    }



    return(
        <GlobalContext.Provider value={
         {   transactions: state.transactions ,
            error:state.errors ,
            loading:state.loading,
            getTransactions,
            deleteTransaction,
            addTransaction
         }
        }>
        {children}
        </GlobalContext.Provider>
    )
}
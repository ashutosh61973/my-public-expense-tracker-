// export default (state, action)=>{
//     switch(action.type)
//     {
//         default: 
//         return state;
//     }
// }

// const AppReducer = (state, action) => {
    
//     switch(action.type)
//     {
//         default: 
//         return state;
//     }
// }
export default function AppReducer(state, action) {
    // console.log(action.payload);
    switch(action.type)
    {   

        case "GET_TRANSACTIONS":
        return{
            ...state, 
            loading:false, 
            transactions:action.payload
        }
        case "DELETE_TRANSACTION":
        return {
            ...state,
            transactions:state.transactions.filter((transaction)=>transaction._id!==action.payload)
        }
        case "ADD_TRANSACTION":
        return {
            ...state,
            transactions:[...state.transactions,action.payload]
        }
        case "TRANSACTION_ERROR":
        return{
            ...state,
            error:action.payload
        }
        default: 
        return state;
    }
}

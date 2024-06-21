export const initialState={
    mode:true
}
export const reducer=(state,action)=>{
    if(action.type==="color")
        {
            return {...state, mode:action.payload}
        }
    else{
        return state
    }
}
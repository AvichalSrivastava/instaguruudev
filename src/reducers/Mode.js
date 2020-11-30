const INITIAL_STATE =
{
    login : false, userData:{}
}
export default (state=INITIAL_STATE,action) =>
{
    switch(action.type)
    {
        case 'login':
            console.log(action.payload);
            return {...state, login:true, loginData: action.payload};
    
        default:
        return state;
    }
};
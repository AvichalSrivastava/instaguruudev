export const loginUser = data =>
{
  return{
    type : 'login',
    payload : data
  };
};

export default class UserController{
  async signUp(handle, password) {
    try {
      const result = await fetch(
        "https://chitter-backend-api-v2.herokuapp.com/users", {
        method: 'POST',
        body: JSON.stringify({user: {handle: `${handle}`, password:`${password}`}}),
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const user = await result.json()
    } catch (e) {
      console.log(e)
      return null;
    }
  };
}

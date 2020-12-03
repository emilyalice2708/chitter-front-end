export default class SessionController {

  async signIn(handle, password) {
    try {
      const result = await fetch(
        "https://chitter-backend-api-v2.herokuapp.com/sessions", {
        method: 'POST',
        body: JSON.stringify({session: {handle: `${handle}`, password:`${password}`}}),
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const session = await result.json()
    } catch (e) {
      return null;
    }
  };

}

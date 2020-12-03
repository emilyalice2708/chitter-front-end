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
      this.completeSignIn(session)
    } catch (e) {
      this.invalidSession()
      return null;
    }
  };

  invalidSession() {
    var signInError = document.getElementById("sign-in-error")
    signInError.innerHTML = "Incorrect user or password!"
    return
  }

  completeSignIn(session) {
    var signedIn = document.getElementById('signed-in')
    signedIn.innerHTML = `You're logged in. You can now post a peep!`
  }

}

import PeepViewController from './peepViewController.js'

const peepController = new PeepViewController();

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
  }

  invalidSession() {
    var signInError = document.getElementById("sign-in-error")
    signInError.innerHTML = "Incorrect user or password!"
    return
  }

  completeSignIn(session) {
    var signedIn = document.getElementById('signed-in')
    signedIn.innerHTML = `You're logged in. You can now post a peep!`
    peepController.postPeep(session.user_id, session.session_key)
  }

  getSessionData(){
    let signin = document.getElementById("signin")
    if(!signin) return;
    signin.addEventListener('submit', function(event){
      event.preventDefault();
      let handle = event.srcElement[0].value
      let password = event.srcElement[1].value
      this.signIn(handle, password)
    }.bind(this))
  }
}

const sessionController = new SessionController()
sessionController.getSessionData()

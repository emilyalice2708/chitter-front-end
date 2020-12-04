export default class UserController{
  async signUp(handle, password) {
    try {
      const result = await fetch(
        "https://chitter-backend-api-v2.herokuapp.com/users", {
        method: 'POST',
        body: JSON.stringify({
          user: {
            handle: `${handle}`, password:`${password}`
          }
        }),
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const user = await result.json()
      this.completeSignUp(user)
    } catch (e) {
      return null;
    }
  }

  completeSignUp(user) {
    user.handle == "has already been taken" ? this.usernameTaken() : this.welcomeUser(user.handle)
  }

  welcomeUser(handle) {
    var welcome = document.getElementById("welcome")
    welcome.innerHTML = `Welcome to Chitter, ${handle}. Sign in to post a peep!`
  }

  usernameTaken() {
    var signUpError = document.createElement("div")
    signUpError.setAttribute("id", "sign-up-error")
    signUpError.innerHTML = "That username is taken!"
    document.body.appendChild(signUpError)
    return
  }

  getUserData(){
    let signup = document.getElementById("signup")
    if(!signup) return;
    signup.addEventListener('submit', function(event){
      event.preventDefault();
      let handle = event.srcElement[0].value
      let password = event.srcElement[1].value
      this.signUp(handle, password)
    }.bind(this))
  }
}

let userController = new UserController()
userController.getUserData()

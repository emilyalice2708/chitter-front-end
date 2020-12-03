import PeepView from './peepView.js'

const peepView = new PeepView();

export default class PeepViewController {
  async allPeeps() {
    try {
      const result = await fetch(
        "https://chitter-backend-api-v2.herokuapp.com/peeps"
      );
      const data = await result.json()
      peepView.makeHTML(data)
    } catch (e) {
      return null;
    }
  }

  async singlePeep(id) {
    try {
      const result = await fetch(
        `https://chitter-backend-api-v2.herokuapp.com/peeps/${id}`
      );
      const data = await result.json()
      peepView.singlePeepHTML(data)
    } catch(e) {
      return null;
    }
  }

  hashListener() {
    window.addEventListener("hashchange", function(){
      let extension = window.location.hash.split('#')
      let id = extension[1].split("/")[1]
      this.singlePeep(id)
    }.bind(this));
  }

  postPeep(user_id, session_key) {
    let postPeep = document.getElementById("post-peep")
    if(!postPeep) return;
    this.revealPostForm()
    postPeep.addEventListener('submit', function(event){
      event.preventDefault();
      let body = event.srcElement[0].value
      this.createPeep(user_id, session_key, body)
    }.bind(this))
  }

  revealPostForm() {
    const postButton = document.getElementById('post-button')
    const postBody = document.getElementById('post-body')
    postButton.setAttribute('type', 'submit')
    postBody.setAttribute('type', 'text')
  }
  
  async createPeep(user_id, session_key, body) {
    try {
      await fetch(
        "https://chitter-backend-api-v2.herokuapp.com/peeps", {
        method: 'POST',
        body: JSON.stringify({peep: {user_id: `${user_id}`, body:`${body}`}}),
        dataType: 'json',
        headers: {
          'Authorization': `Token token=${session_key}`,
          'Content-Type': 'application/json'
        }
      });
      this.allPeeps()
    } catch (e) {
      return null;
    }
  }
}

const controller = new PeepViewController()
controller.allPeeps()
controller.hashListener()

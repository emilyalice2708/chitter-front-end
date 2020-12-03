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
      console.log(e)
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
      console.log(e)
      return null;
    }
  };
};

const controller = new PeepViewController()
controller.allPeeps()

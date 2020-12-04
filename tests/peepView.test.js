import PeepView from '../models/peepView.js';

describe('PeepView', () => {
  const peepView = new PeepView()
  const list = [{
    body: "peep", user: {
      handle: "user1"
    }, 
    id: "1", likes: [
      ["first"], ["second"]]
    }, {
      body: "peep 2", 
      user: {
        handle: "user1"
      }, 
      id: "2", likes: [
        ["first"], ["second"]]
      }]
  const container = document.createElement("div");
  
  beforeEach(() => {
    container.setAttribute('id', 'peeps')
    document.body.appendChild(container);
  })

  describe('#makeHTML', () => {
    it('Adds peep list to document', () => {
      const htmlList = `<li>user1 posted:<br> peep <br>` +
      ` Likes: 2 ` +
      `<a id=\"1\" href=\"#peeps/1\">View Peep</a></li>` +
      `<li>user1 posted:<br> peep 2 <br>` +
      ` Likes: 2 ` +
      `<a id=\"2\" href=\"#peeps/2\">View Peep</a></li>`
      peepView.makeHTML(list)
      expect(container.innerHTML).toEqual(htmlList)
    })
  })

  describe('#singlePeepHTML', () => {
    it('Replaces list with single peep', () => {
      peepView.makeHTML(list)
      peepView.singlePeepHTML({
        body: "peep", 
        user: {
          handle: "user1"
        }, 
        id: "1",
        likes: [
          ["first"], ["second"]]
        })
      const singlePeep = '<li>user1 posted:<br> peep <br> Likes: 2 </li>'
      expect(container.innerHTML).toEqual(singlePeep)
    })
  })
})

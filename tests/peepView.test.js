import PeepView from '../models/peepView.js';

describe('PeepView', () => {
  let peepView;
  let list;
  let container;

  beforeEach(() => {
    peepView = new PeepView()
    list = [{body: "peep", user: {handle: "user1"}, id: "1", likes: [["first"], ["second"]]}, {body: "peep 2", user: {handle: "user1"}, id: "2", likes: [["first"], ["second"]]}]
    container = document.createElement("div");
    container.setAttribute('id', 'peeps')
    document.body.appendChild(container);
  })

  describe('#makeHTML', () => {
    it('Adds peep list to document', () => {
      peepView.makeHTML(list)
      expect(container.innerHTML).toEqual(`<li>user1 posted:<br> peep <br>` +
        ` Likes: 2 ` +
        `<a id=\"1\" href=\"#peeps/1\">View Peep</a></li>` +
        `<li>user1 posted:<br> peep 2 <br>` +
        ` Likes: 2 ` +
        `<a id=\"2\" href=\"#peeps/2\">View Peep</a></li>`)
    })
  })

  describe('#singlePeepHTML', () => {
    it('Replaces list with single peep', () => {
      peepView.makeHTML(list)
      peepView.singlePeepHTML({body: "peep", user: {handle: "user1"}, id: "1", likes: [["first"], ["second"]]})
      expect(container.innerHTML).toEqual("<li>user1 posted:<br> peep <br> Likes: 2 </li>")
    })
  })
})

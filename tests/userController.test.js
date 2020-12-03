import { jest } from '@jest/globals';
import UserController from '../models/userController';

describe('signUp', () => {
  let mockFetch;
  let controller;
  let container;

  beforeEach(() => {
    mockFetch = jest.fn().mockResolvedValue({
      json: () => {return {
        id: 1,
        handle: "newuser"
      }}
    })
    global.fetch = mockFetch
    controller = new UserController();
    container = document.createElement("div");
    container.setAttribute('id', 'welcome')
    document.body.appendChild(container);
  });

  it('calls fetch with the handle and password', async () => {
    try {
      await controller.signUp("newuser", "pword");

      expect(mockFetch.mock.calls[0][0]).toEqual("https://chitter-backend-api-v2.herokuapp.com/users")
      expect(mockFetch.mock.calls[0][1].body).toEqual("{\"user\":{\"handle\":\"newuser\",\"password\":\"pword\"}}")
    } catch(error) {
      throw error;
    }
  });


  it('welcomes the user', async () => {
    try {
      await controller.signUp("newuser", "pword");

      expect(document.body.innerHTML).toEqual("<div id=\"welcome\">Welcome to Chitter, newuser. Sign in to post a peep!</div><div id=\"welcome\"></div>")
    } catch(error) {
      throw error;
    }
  })

})

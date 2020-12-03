import { jest } from '@jest/globals';
import SessionController from '../models/sessionController.js';

describe('signIn', () => {
  let mockFetch;
  let controller;
  let container;
  let signedIn;

  beforeEach(() => {
    mockFetch = jest.fn().mockResolvedValue({
      json: () => { return [{user: {handle: "newuser", password: "pword"}}] }
    })
    global.fetch = mockFetch
    controller = new SessionController();
  });

  describe('#signUp', () => {
    beforeEach(() => {
      container = document.createElement("div");
      container.setAttribute('id', 'sign-in-error')
      document.body.appendChild(container);
    })

    it('calls fetch to the correct url', async () => {
      try {
        await controller.signIn("newuser", "pword");

        expect(mockFetch.mock.calls[0][0]).toEqual("https://chitter-backend-api-v2.herokuapp.com/sessions")
      } catch(error) {
        throw error;
      }
    });
  })

  describe('#invalidSession', () => {
    it('displays a sign-in error to the user', () => {
      controller.invalidSession()
      let error = document.getElementById('sign-in-error')
      expect(error.innerHTML).toEqual('Incorrect user or password!')
    })
  })

  describe('#completeSignIn', () => {
    beforeEach(() => {
      signedIn = document.createElement("div")
      signedIn.setAttribute('id', 'signed-in')
      document.body.appendChild(signedIn);
    })

    it('displays logged-in message to user if sign-in is successful', () => {
      controller.completeSignIn({id: 1, handle: "newuser"})
      let message = document.getElementById('signed-in')
      expect(message.innerHTML).toEqual("You're logged in. You can now post a peep!")
    })
  })
})

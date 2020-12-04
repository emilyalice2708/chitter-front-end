import { jest } from '@jest/globals';
import SessionController from '../models/sessionController.js';
import PeepViewController from '../models/peepViewController.js';

jest.mock('../models/peepViewController')

describe('SessionController', () => {
  const mockFetch = jest.fn().mockResolvedValue({
    json: () => { return [{
      user: {
        handle: "newuser", 
        password: "pword"
        }
      }] 
    }
  })
  const controller = new SessionController();
  const mockPeepController = new PeepViewController()

  beforeEach(() => {
    global.fetch = mockFetch
  });

  describe('#signIn', () => {
    it('calls fetch to the correct url', async () => {
      const container = document.createElement("div");
      container.setAttribute('id', 'sign-in-error')
      document.body.appendChild(container);
      try {
        await controller.signIn("newuser", "pword");

        expect(mockFetch.mock.calls[0][0]).toEqual("https://chitter-backend-api-v2.herokuapp.com/sessions")
      } catch(error) {
        throw error;
      }
    });
  })

  describe('#completeSignIn', () => {
    it('displays logged-in message to user if sign-in is successful', () => {
      const signedIn = document.createElement("div")
      signedIn.setAttribute('id', 'signed-in')
      document.body.appendChild(signedIn);
      controller.completeSignIn({id: 1, handle: "newuser"})
      
      expect(signedIn.innerHTML).toEqual("You're logged in. You can now post a peep!")
    })

    it('calls on PeepViewController to render post peeps form', () => {
      controller.completeSignIn({id: 1, handle: "newuser"})

      expect(mockPeepController.postPeep).toHaveBeenCalled
    })
  })

  describe('#invalidSession', () => {
    it('displays a sign-in error to the user', () => {
      controller.invalidSession()
      const error = document.getElementById('sign-in-error')

      expect(error.innerHTML).toEqual('Incorrect user or password!')
    })
  })
})

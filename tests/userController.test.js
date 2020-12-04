import { jest } from '@jest/globals';
import UserController from '../models/userController';

describe('signUp', () => {
  const mockFetch = jest.fn().mockResolvedValue({
    json: () => {return {
      id: 1,
      handle: "newuser"
    }}
  })
  const controller = new UserController();

  beforeEach(() => {
    global.fetch = mockFetch
  });

  afterEach(() => {
    document.body.innerHTML = ""
  })

  describe('signUp', () => {
    it('calls fetch to correct url with user data', async () => {
      const dataBody = "{\"user\":{\"handle\":\"newuser\",\"password\":\"pword\"}}"
      const url = "https://chitter-backend-api-v2.herokuapp.com/users"
      try {
        await controller.signUp("newuser", "pword");

        expect(mockFetch.mock.calls[0][0]).toEqual(url)
        expect(mockFetch.mock.calls[0][1].body).toEqual(dataBody)
      } catch(error) {
        throw error;
      }
    });
  })

  describe('completeSignUp', () => {
    it('displays welcome message if sign-up is successful', () => {
      const container = document.createElement('div');
      container.setAttribute('id', 'welcome')
      document.body.appendChild(container);
      controller.completeSignUp({id: 1, handle: "newuser"})

      expect(container.innerHTML).toEqual("Welcome to Chitter, newuser. Sign in to post a peep!")
    })

    it('displays sign-up error to user if sign-up is unsuccessful', () => {
      controller.completeSignUp({id: 1, handle: "has already been taken"})
      const error = document.getElementById('sign-up-error')
      expect(error.innerHTML).toEqual("That username is taken!")
    })
  })
})

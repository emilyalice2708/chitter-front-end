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

  afterEach(() => {
    document.body.innerHTML = ""
  })

  describe('signUp', () => {
    it('calls fetch with the handle and password', async () => {
      try {
        await controller.signUp("newuser", "pword");

        expect(mockFetch.mock.calls[0][0]).toEqual("https://chitter-backend-api-v2.herokuapp.com/users")
        expect(mockFetch.mock.calls[0][1].body).toEqual("{\"user\":{\"handle\":\"newuser\",\"password\":\"pword\"}}")
      } catch(error) {
        throw error;
      }
    });
  })

  describe('completeSignUp', () => {
    it('displays welcome message if sign-up is successful', () => {
      controller.completeSignUp({id: 1, handle: "newuser"})
      let welcome = document.getElementById('welcome')

      expect(welcome.innerHTML).toEqual("Welcome to Chitter, newuser. Sign in to post a peep!")
    })

    it('displays sign-up error to user if sign-up is unsuccessful', () => {
      controller.completeSignUp({id: 1, handle: "has already been taken"})
      let error = document.getElementById('sign-up-error')
      expect(error.innerHTML).toEqual("That username is taken!")
    })
  })
})

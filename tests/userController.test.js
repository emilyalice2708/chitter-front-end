import { jest } from '@jest/globals';
import UserController from '../models/userController';

describe('signUp', () => {
  let mockFetch;
  let controller;

  beforeEach(() => {
    mockFetch = jest.fn().mockResolvedValue({
      json: () => { return [{user: {handle: "newuser", password: "pword"}}] }
    })
    global.fetch = mockFetch
    controller = new UserController();
  });

  it('calls fetch with the handle and password', async () => {
    try {
      await controller.signUp("newuser", "pword");

      expect(mockFetch.mock.calls[0][0]).toEqual("https://chitter-backend-api-v2.herokuapp.com/users")
    } catch(error) {
      throw error;
    }
  });
})

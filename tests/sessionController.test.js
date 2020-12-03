import { jest } from '@jest/globals';
import SessionController from '../models/sessionController.js';

describe('signIn', () => {
  let mockFetch;
  let controller;

  beforeEach(() => {
    mockFetch = jest.fn().mockResolvedValue({
      json: () => { return [{user: {handle: "newuser", password: "pword"}}] }
    })
    global.fetch = mockFetch
    controller = new SessionController();
  });

  it('calls fetch to the correct url', async () => {
    try {
      await controller.signIn("newuser", "pword");

      expect(mockFetch.mock.calls[0][0]).toEqual("https://chitter-backend-api-v2.herokuapp.com/sessions")
    } catch(error) {
      throw error;
    }
  });

})

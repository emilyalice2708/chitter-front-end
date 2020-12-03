import { jest } from '@jest/globals';
import PeepViewController from '../models/peepViewController.js';

describe('allPeeps', () => {
  let mockFetch;
  let controller;

  beforeEach(() => {
    controller = new PeepViewController();
    mockFetch = jest.fn().mockResolvedValue({
      json: () => { return [{"body": "first peep"}] }
    })
    global.fetch = mockFetch
  });

  it('calls fetch with the url', async () => {
    try {
      await controller.allPeeps();

      expect(mockFetch.mock.calls[0][0]).toEqual("https://chitter-backend-api-v2.herokuapp.com/peeps")
    } catch(error) {
      throw error;
    }
  });

})

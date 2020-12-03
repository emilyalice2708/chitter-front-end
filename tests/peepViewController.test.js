import { jest } from '@jest/globals';
import PeepViewController from '../models/peepViewController.js';
import PeepView from '../models/peepView.js';

jest.mock('../models/peepView.js')

describe('allPeeps', () => {
  let mockFetch;
  let controller;
  let mockPeepView;

  beforeEach(() => {
    controller = new PeepViewController();
    mockFetch = jest.fn().mockResolvedValue({
      json: () => { return [{"body": "first peep"}] }
    })
    global.fetch = mockFetch
    mockPeepView = new PeepView();
  });

  it('calls fetch with the url', async () => {
    try {
      await controller.allPeeps();

      expect(mockFetch.mock.calls[0][0]).toEqual("https://chitter-backend-api-v2.herokuapp.com/peeps")
    } catch(error) {
      throw error;
    }
  });

  it('calls peepView.html with the data', async () => {
    try {
      await controller.allPeeps();

      expect(mockPeepView.makeHTML.mock.calls[0][0]).toEqual([{"body": "first peep"}]);
    } catch(error) {
      throw error;
    }
  });
})

describe('singlePeep', () => {
  let mockFetch;
  let mockPeepView;
  let controller;

  beforeEach(() => {
    controller = new PeepViewController();
    mockFetch = jest.fn().mockResolvedValue({
      json: () => { return [{"body": "first peep", id: "1"}] }
    })
    mockPeepView = new PeepView();
    global.fetch = mockFetch
  });

  it('calls fetch with correct url and id', async () => {
    try {
      await controller.singlePeep(1);

      expect(mockFetch.mock.calls[0][0]).toEqual(`https://chitter-backend-api-v2.herokuapp.com/peeps/1`);
    } catch(error) {
      throw error;
    }
  });

  it('calls peepView.singlePeepHTML with the data', async () => {
    try {
      await controller.singlePeep(1);

      expect(mockPeepView.singlePeepHTML.mock.calls[0][0]).toEqual([{"body": "first peep", id: "1"}]);
    } catch(error) {
      throw error;
    }
  });
})

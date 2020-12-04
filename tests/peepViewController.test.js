import { jest } from '@jest/globals';
import PeepViewController from '../models/peepViewController.js';
import PeepView from '../models/peepView.js';

jest.mock('../models/peepView.js')

describe('PeepViewController', () => {
  let mockFetch;
  const controller = new PeepViewController();
  const mockPeepView = new PeepView();

  describe('#allPeeps', () => {
    beforeEach(() => {
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
    beforeEach(() => {
      mockFetch = jest.fn().mockResolvedValue({
        json: () => { return [{"body": "first peep", id: "1"}] }
      })
      global.fetch = mockFetch
    });

    it('calls fetch with correct url and id', async () => {
      const peepURL = `https://chitter-backend-api-v2.herokuapp.com/peeps/1`
      try {
        await controller.singlePeep(1);

        expect(mockFetch.mock.calls[0][0]).toEqual(peepURL);
      } catch(error) {
        throw error;
      }
    });

    it('calls peepView.singlePeepHTML with the data', async () => {
      const peepData = [{"body": "first peep", id: "1"}]
      try {
        await controller.singlePeep(1);

        expect(mockPeepView.singlePeepHTML.mock.calls[0][0]).toEqual(peepData);
      } catch(error) {
        throw error;
      }
    });
  })

  describe('createPeep', () => {
    beforeEach(() => {
      mockFetch = jest.fn().mockResolvedValue({
        json: () => { return {
          "id": 3,
          "body": "my first peep :)",
          "created_at": "2018-06-23T13:21:23.317Z",
          "updated_at": "2018-06-23T13:21:23.317Z",
          "user": {
            "id": 1,
            "handle": "kay"
          },
          "likes": [{
            "user": {
              "id": 1,
              "handle": "kay"
            }
          }]
        } }
      })
      global.fetch = mockFetch
    });
    
    it('calls fetch with correct url and then fecthes all peeps again', async () => {
      const url = 'https://chitter-backend-api-v2.herokuapp.com/peeps'
      try {
        await controller.createPeep();

        expect(mockFetch.mock.calls[0][0]).toEqual(url);
      } catch(error) {
        throw error;
      }
    });
  })
})

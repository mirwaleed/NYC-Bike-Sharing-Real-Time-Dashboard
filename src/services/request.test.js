import { getStationsInformation, getStationsStatus } from './request';
import axios from 'axios';

jest.mock('axios');

describe('nyc api requests', () => {
    it("fetches station information", async () => {
    // setup
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { 
            data: {
                stations:[]
            } } 
      })
    );
  
    // work
    const request = await getStationsInformation();
  
    // expect
    expect(request).toEqual({
        data: { 
            data: {
                stations:[]
            } } 
      });
    
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      "https://gbfs.citibikenyc.com/gbfs/en/station_information.json");

  });

  it("fetches station status", async () => {
    // setup
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { 
            data: {
                stations:[]
            } } 
      })
    );
  
    // work
    const request = await getStationsStatus();
  
    // expect
    expect(request).toEqual({
        data: { 
            data: {
                stations:[]
            } } 
      });
    
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith(
      "https://gbfs.citibikenyc.com/gbfs/en/station_status.json");

  });
});
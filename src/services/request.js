import axios from 'axios';

let getStationsStatus = async () => {
    let response = await axios.get(`https://gbfs.citibikenyc.com/gbfs/en/station_status.json`);
    return response;
}

let getStationsInformation = async ()=> {
    let response = await axios.get(`https://gbfs.citibikenyc.com/gbfs/en/station_information.json`);
    return response;
  }

export {getStationsInformation, getStationsStatus};
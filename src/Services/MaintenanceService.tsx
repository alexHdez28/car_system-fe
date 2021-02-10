import axios from 'axios';

const url:string = 'https://car-system-api.azurewebsites.net/';
//const url:string = 'http://localhost:3001/';

export class MaintenanceService {
    async getAllVehicles () {
        return axios.get(url+'vehicle');
    }

    async updateVehicleMaintenant (id:string, maint:boolean) {
        return axios.patch(url+'vehicle/'+id, {maintenance:maint});
    }
}
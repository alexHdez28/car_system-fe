import React, { Component } from 'react';

import { MaintenanceService } from '../Services/MaintenanceService';

type vehicleType = {
    image: string,
    make: string; 
    modelCar: string; 
    description: string; 
    programDate: string; 
    _id: string;
    km: Number;
    maintenance: Boolean;
};

class Maintenance extends Component {

    maintenanceService = new MaintenanceService()
    state:{vehicles:Array<vehicleType>} = {
        vehicles: []
    }

    async getVehicles() {
        let response = await this.maintenanceService.getAllVehicles()
        this.setState({vehicles: response.data})
    }

    async componentDidMount() {
        await this.getVehicles();
    }

    async sendMaintenance (id:string, band:boolean) {
        console.log("wawa:"+band);
        console.log("wawa:"+id);
        await this.maintenanceService.updateVehicleMaintenant(id, band)
        await this.getVehicles();
    }

    render () {

        const vehicles = this.state.vehicles;
        return (
            <div>
                <h1>Vehículos en mantenimiento</h1>
                <table id="tblMaintenanceVehicles">
                    <tbody>
                        <tr>
                            <th>Imagen</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Descripción</th>
                            <th>Fecha Programada</th>
                            <th>Id vehículo</th>
                            <th>Km</th>
                            <th>Mantenimiento</th>
                        </tr>
                        {
                            vehicles.map((vehicle) => {
                                return (
                                <tr key={vehicle._id} className={vehicle.maintenance ? 'vehicleInMaintanance' : 'vehicleReady'}>
                                    <td className="col-sm-2">
                                        <img src={vehicle.image} alt="carImage" className="imageSize"/>
                                    </td>
                                    <td className="col-sm-1">
                                        {vehicle.make}
                                    </td>
                                    <td className="col-sm-1">
                                        {vehicle.modelCar}
                                    </td>
                                    <td className="col-sm-2">
                                        {vehicle.description}
                                    </td>
                                    <td className="col-sm-2">
                                        {vehicle.programDate}
                                    </td>
                                    <td className="col-sm-1">
                                        {vehicle._id}
                                    </td>
                                    <td className="col-sm-1">
                                        {vehicle.km}
                                    </td>
                                    {
                                        vehicle.maintenance ? 
                                        (
                                            <td>
                                                En mantenimiento<br></br>
                                                <a onClick={() => this.sendMaintenance(vehicle._id, false)}><span className="glyphicon glyphicon-bed"></span></a>
                                            </td>
                                            
                                        ) :
                                        (
                                            <td>
                                                Listo para uso <br></br>
                                                <a onClick={() => this.sendMaintenance(vehicle._id, true)}><span className="glyphicon glyphicon-bed"></span></a>
                                            </td>
                                        )
                                    }
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Maintenance;
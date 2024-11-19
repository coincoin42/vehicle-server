"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteVehicleController = void 0;
class DeleteVehicleController {
    constructor(vehicleStore) {
        this.vehicleStore = vehicleStore;
    }
    async handle(req, res) {
        res.status(500).send();
    }
}
exports.DeleteVehicleController = DeleteVehicleController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteVehicleController = void 0;
class DeleteVehicleController {
    constructor(vehicleStore) {
        this.vehicleStore = vehicleStore;
    }
    async handle(req, res) {
        const id = parseInt(req.params.id);
        await this.vehicleStore.deleteVehicle({ id: id });
        res.status(204).send();
    }
}
exports.DeleteVehicleController = DeleteVehicleController;

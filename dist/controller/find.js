"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindVehiclesController = void 0;
class FindVehiclesController {
    constructor(vehicleStore) {
        this.vehicleStore = vehicleStore;
    }
    async handle(req, res) {
        const vehicles = await this.vehicleStore.findVehicles({
            limit: parseInt(req.query.limit) || 10,
            location: {
                longitude: parseInt(req.query.longitude) || 0.0,
                latitude: parseInt(req.query.latitude) || 0.0
            },
        });
        res.status(200).json({ vehicles: vehicles });
    }
}
exports.FindVehiclesController = FindVehiclesController;

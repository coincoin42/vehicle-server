"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVehicleController = void 0;
const errors_1 = require("../errors");
class CreateVehicleController {
    constructor(vehicleStore) {
        this.vehicleStore = vehicleStore;
    }
    async handle(req, res) {
        const violations = validateRequestPayload(req.body);
        if (violations.length > 0) {
            throw new errors_1.AppError(errors_1.ErrorCode.BadRequest, "Invalid create vehicle request", { violations: violations });
        }
        const vehicle = await this.vehicleStore.createVehicle({
            shortcode: req.body.shortcode,
            battery: req.body.battery,
            position: {
                latitude: req.body.longitude,
                longitude: req.body.latitude,
            },
        });
        res.status(200).json({ vehicle: vehicle });
    }
}
exports.CreateVehicleController = CreateVehicleController;
function validateRequestPayload(req) {
    const violations = [];
    if (req.shortcode.length != 4) {
        violations.push("Shortcode must be only 4 characters long");
    }
    if (req.battery < 0 || req.battery > 100) {
        violations.push("Battery level must be between 0 and 100");
    }
    if (req.longitude < -90 || req.longitude > 90) {
        violations.push("Longitude must be between -90 and 90");
    }
    if (req.latitude < -90 || req.latitude > 90) {
        violations.push("Latitude must be between -90 and 90");
    }
    return violations;
}

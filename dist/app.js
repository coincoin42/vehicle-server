"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = setupApp;
const express_1 = __importDefault(require("express"));
const vehicle_1 = require("./store/vehicle");
const find_1 = require("./controller/find");
const create_1 = require("./controller/create");
const delete_1 = require("./controller/delete");
const errors_1 = require("./errors");
function setupApp(db) {
    const app = (0, express_1.default)();
    const vehicleStore = new vehicle_1.VehicleStore(db);
    const findVehicleController = new find_1.FindVehiclesController(vehicleStore);
    const createVehicleController = new create_1.CreateVehicleController(vehicleStore);
    const deleteVehicleController = new delete_1.DeleteVehicleController(vehicleStore);
    app.use(express_1.default.json());
    app.get('/vehicles', findVehicleController.handle.bind(findVehicleController));
    app.post('/vehicles', createVehicleController.handle.bind(createVehicleController));
    app.delete('/vehicles/:id', deleteVehicleController.handle.bind(deleteVehicleController));
    app.use(errors_1.errorHandler);
    return app;
}

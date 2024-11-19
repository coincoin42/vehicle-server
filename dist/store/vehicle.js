"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleStore = void 0;
const vehicle_1 = require("../model/vehicle");
const errors_1 = require("../errors");
const findStatement = `
SELECT id, shortcode, battery, ST_X(position) as long, ST_Y(position) as lat
FROM vehicle_server.vehicles
ORDER BY position <-> ST_MakePoint($1, $2)::geography ASC
LIMIT $3;
`;
const createStatement = `
INSERT INTO vehicle_server.vehicles (shortcode, battery, position)
VALUES ($1, $2, ST_MakePoint($3, $4))
RETURNING id, shortcode, battery, ST_X(position) as long, ST_Y(position) as lat;
`;
const deleteStatement = `
DELETE FROM vehicle_server.vehicles WHERE id = $1;
`;
class VehicleStore {
    constructor(db) {
        this.db = db;
    }
    async createVehicle(req) {
        const result = await this.db.query(createStatement, [req.shortcode, req.battery, req.position.longitude, req.position.latitude]);
        if (result.rows.length > 1) {
            throw new Error("unexpected amount of rows returned");
        }
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
        const vehicleRow = result.rows[0];
        return newVehicleFromRow(vehicleRow);
    }
    async deleteVehicle(req) {
        const result = await this.db.query(deleteStatement, [req.id]);
        if (result.rowCount == 0) {
            throw new errors_1.AppError(errors_1.ErrorCode.RecordNotFound, "Vehicle not found for deletion", { id: req.id });
        }
    }
    async findVehicles(req) {
        const result = await this.db.query(findStatement, [req.location.longitude, req.location.latitude, req.limit]);
        return result.rows.map((r) => {
            return newVehicleFromRow(r);
        });
    }
}
exports.VehicleStore = VehicleStore;
function newVehicleFromRow(vehicleRow) {
    return new vehicle_1.Vehicle(vehicleRow.id, vehicleRow.shortcode, vehicleRow.battery, {
        longitude: vehicleRow.lat,
        latitude: vehicleRow.long
    });
}

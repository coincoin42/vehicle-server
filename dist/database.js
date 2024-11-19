"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfigFromEnv = dbConfigFromEnv;
exports.connectDb = connectDb;
exports.createSchema = createSchema;
exports.dropSchema = dropSchema;
const pg = __importStar(require("pg"));
const createSchemaStatement = `
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE SCHEMA IF NOT EXISTS vehicle_server;
CREATE TABLE IF NOT EXISTS vehicle_server.vehicles (
	id SERIAL PRIMARY KEY,
	shortcode TEXT NOT NULL,
	battery SMALLINT,
	position GEOMETRY(POINT, 4326) not null
);
`;
const deleteSchemaStatement = `
DROP TABLE IF EXISTS vehicle_server.vehicles;
DROP SCHEMA IF EXISTS vehicle_server;
`;
function dbConfigFromEnv() {
    return {
        host: process.env.DB_HOST ?? 'localhost',
        port: parseInt(process.env.DB_PORT ?? '5432'),
        database: process.env.DB_DATABASE ?? 'vehicle',
        user: process.env.DB_USER ?? 'vehicle',
        password: process.env.DB_PASSWORD ?? 'vehicle',
    };
}
async function connectDb(cfg) {
    const pool = new pg.Pool({
        user: cfg.user,
        host: cfg.host,
        database: cfg.database,
        password: cfg.password,
        port: cfg.port
    });
    // Create the database. We should run migrations here,
    await createSchema(pool);
    return pool;
}
async function createSchema(pool) {
    await pool.query(createSchemaStatement);
}
async function dropSchema(pool) {
    await pool.query(deleteSchemaStatement);
}

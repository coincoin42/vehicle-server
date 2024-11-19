"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeResponse = void 0;
class FakeResponse {
    constructor() {
        this.gotStatus = 0;
        this.gotJson = {};
    }
    json(p) {
        this.gotJson = p;
        return this;
    }
    status(s) {
        this.gotStatus = s;
        return this;
    }
}
exports.FakeResponse = FakeResponse;

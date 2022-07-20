"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const paymentSplitterRoute_1 = __importDefault(require("../routes/paymentSplitterRoute"));
const mockedData_1 = require("../data/mockedData");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', paymentSplitterRoute_1.default);
describe('POST /split-payments/compute', () => {
    it("Should return a 400 error if 'SplitInfo' property length is less than 1 or greater than 20", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post('/split-payments/compute')
            .send(mockedData_1.mockPaymentSplitting.payload2);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('Error');
        expect(res.body.Error).toEqual("Something went wrong: Error: 'SplitInfo' array can contain only a minimum of 1 split entity and a maximum of 20 entities.");
    }));
    it('Should return 200 success statusCode for a valid payload passed', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post('/split-payments/compute')
            .send(mockedData_1.mockPaymentSplitting.payload1);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('SplitBreakdown');
    }));
});

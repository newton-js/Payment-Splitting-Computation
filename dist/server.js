"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const paymentSplitterRoute_1 = __importDefault(require("./routes/paymentSplitterRoute"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use("/", paymentSplitterRoute_1.default);
app.listen(port, () => console.log(`Server running on port ${port}`));

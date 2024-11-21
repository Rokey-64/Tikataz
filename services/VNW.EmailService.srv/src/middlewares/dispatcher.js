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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../service/contact/index.js");
var index_js_2 = require("../sys/index.js");
require("dotenv/config.js");
var index_js_3 = require("../logs/index.js");
var checkRequiredFields_js_1 = require("../validations/checkRequiredFields.js");
/**
 * @description Send mail, app or phone
 * @returns
 */
var dispatcher = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var model, result, discard, _a, mailOptions;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                model = req.body;
                result = (0, checkRequiredFields_js_1.default)(model, ['requestID', 'to', 'subject', 'content', 'type']);
                if (!result) {
                    !req.feedback || index_js_2.default.setFailedFeedback(req.feedback, index_js_2.default.errCode.EMAIL_SEND_FAILED, 'Missing required fields');
                    return [2 /*return*/, res.status(400).json(req.feedback)];
                }
                discard = function (err) {
                    if (!(err instanceof index_js_2.default.TkzException)) {
                        (0, index_js_3.default)(index_js_3.level.ERROR, req.id, err.message, 'sendMail', { prevReqID: model.requestID });
                    }
                    !req.feedback || index_js_2.default.setFailedFeedback(req.feedback, (err === null || err === void 0 ? void 0 : err.code) || index_js_2.default.errCode.SYSTEM_ERROR, err.message);
                    return res.status(500).json(req.feedback);
                };
                _a = model.type;
                switch (_a) {
                    case "mail": return [3 /*break*/, 1];
                    case "app": return [3 /*break*/, 3];
                    case "phone": return [3 /*break*/, 4];
                }
                return [3 /*break*/, 5];
            case 1:
                mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: model.to,
                    subject: model.subject,
                    html: model.content
                };
                return [4 /*yield*/, index_js_1.contact.sendMail(mailOptions).catch(function (err) {
                        return discard(err);
                    })];
            case 2:
                _b.sent();
                return [3 /*break*/, 5];
            case 3: return [3 /*break*/, 5];
            case 4: return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.default = dispatcher;

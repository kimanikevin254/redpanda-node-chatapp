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
var readline = require("node:readline");
var Admin = require("./admin");
var Producer = require("./producer");
var Consumer = require("./consumer");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var topic;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    topic = 'chat-room';
                    console.log("Creating topic: ".concat(topic));
                    return [4 /*yield*/, Admin.createTopic(topic)];
                case 1:
                    _a.sent();
                    console.log('Connecting...');
                    return [4 /*yield*/, Consumer.connect()];
                case 2:
                    _a.sent();
                    rl.question('Enter username: \n', function (username) {
                        return __awaiter(this, void 0, void 0, function () {
                            var sendMessage;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Producer.getConnection(username)];
                                    case 1:
                                        sendMessage = _a.sent();
                                        if (sendMessage) {
                                            console.log('Connected, press Ctrl+C to exit');
                                            rl.on('line', function (input) {
                                                readline.moveCursor(process.stdout, 0, -1);
                                                sendMessage(input);
                                            });
                                        }
                                        else {
                                            console.error('Failed to initialize sendMessage function');
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
start();
process.on("SIGINT", function () { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Closing app...');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, 5, 6]);
                return [4 /*yield*/, Producer.disconnect()];
            case 2:
                _a.sent();
                return [4 /*yield*/, Consumer.disconnect()];
            case 3:
                _a.sent();
                rl.close();
                return [3 /*break*/, 6];
            case 4:
                err_1 = _a.sent();
                console.error('Error during cleanup:', err_1);
                process.exit(1);
                return [3 /*break*/, 6];
            case 5:
                console.log('Cleanup finished. Exiting');
                process.exit(0);
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); });

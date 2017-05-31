"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        var port = process.env.PORT || 3000;
        this.app.listen(port, function (_) { return console.log('SERVER STARTED @' + port); });
    };
    return Server;
}());
exports.Server = Server;
Server.bootstrap();
//# sourceMappingURL=index.js.map
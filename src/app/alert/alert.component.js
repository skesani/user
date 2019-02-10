"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var alert_1 = require("./alert");
var _swal = require("sweetalert");
var sweetalert = _swal;
var AlertComponent = (function () {
    function AlertComponent(toastyService) {
        this.toastyService = toastyService;
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.toastyService.getAlert().subscribe(function (message) { return _this.getAlertMsg(message); });
    };
    AlertComponent.prototype.getAlertMsg = function (alert) {
        var _this = this;
        if (!alert) {
            return;
        }
        // setting alert message
        this.displayMessage = alert.message;
        // return css class based on alert type
        switch (alert.type) {
            case alert_1.AlertType.Success:
                this.alertType = 'success';
                sweetalert("", this.displayMessage, "success", {
                    buttons: [false],
                    timer: 2000,
                });
                break;
            case alert_1.AlertType.Error:
                this.alertType = 'danger';
                sweetalert("", this.displayMessage, "error", {
                    buttons: [false],
                    timer: 2000,
                });
                break;
            case alert_1.AlertType.Info:
                this.alertType = 'info';
                sweetalert("", this.displayMessage, "info", {
                    buttons: [false],
                    timer: 2000,
                });
                break;
            case alert_1.AlertType.Warning:
                this.alertType = 'warning';
                sweetalert("", this.displayMessage, "warning", {
                    buttons: [false],
                    timer: 2000,
                });
                break;
        }
        // Setting timeout msg for 5 sec
        setTimeout(function () { _this.displayMessage = null; }, 2000);
    };
    return AlertComponent;
}());
AlertComponent = __decorate([
    core_1.Component({
        selector: 'app-alert',
        templateUrl: './alert.component.html',
        styleUrls: ['./alert.component.css']
    })
], AlertComponent);
exports.AlertComponent = AlertComponent;

import {Component, OnInit} from '@angular/core';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import {AlertService} from './alert.service';
import {Alert, AlertType} from './alert';
const sweetalert: SweetAlert = _swal as any;

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
    alertMsg;
    displayMessage: string;
    alertType: string;

    constructor(private toastyService: AlertService) { }

    ngOnInit() {
        this.toastyService.getAlert().subscribe((message) => this.getAlertMsg(message));
    }

    getAlertMsg(alert: Alert) {
        if (!alert) {
            return;
        }

        // setting alert message
        this.displayMessage = alert.message;

        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                this.alertType = 'success';
                sweetalert('', this.displayMessage, 'success', {buttons: [false], timer: 900});
                break;
            case AlertType.Error:
                this.alertType = 'danger';
                sweetalert('', this.displayMessage, 'error', {buttons: [false], timer: 900});
                break;
            case AlertType.Info:
                this.alertType = 'info';
                sweetalert('', this.displayMessage, 'info', {buttons: [false], timer: 900});
                break;
            case AlertType.Warning:
                this.alertType = 'warning';
                sweetalert('', this.displayMessage, 'warning', {buttons: [false], timer: 900});
                break;
        }
        // Setting timeout msg for 5 sec
        setTimeout(() => { this.displayMessage = null; }, 900);
    }


}

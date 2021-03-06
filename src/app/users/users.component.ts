import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {api_error, User} from './user';
import {AlertService} from '../alert/alert.service';
import {LoadingService} from '../loading/loading.service';
import {AngularCsv} from 'angular7-csv';
import * as Jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    users: any;
    userDetails: any;
    showAllUsers = true;
    showUserDetail = false;
    private apploader;

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Your User List :',
    useBom: true,
    noDownload: false,
    headers: ['Name', 'Username', 'Email', 'Phone', 'Website']
  };

    constructor(private userService: UserService, private alertService: AlertService,  private loader: LoadingService) {
        this.apploader = this.loader;
        // showing loader
        this.apploader.show();
        // post is very quick just using settimeout to show loader
        setTimeout(() => {
        this.userService.getAllUsers().subscribe(user => {
            this.users = user as User;
            // showing success alert used sweet alert
            this.alertService.success('Successfully retrieved users!');
            console.log('got users', this.users);
        }, (error) => {
            this.alertService.error(api_error);
        }, () => {
            this.apploader.hide();
        });
        }, 1000);

    }

    ngOnInit() {
    }

    showUserDetails(id: number) {
        this.showAllUsers = false;
        this.showUserDetail = true;
        this.userService.getUserDetails(id).subscribe(userDetails => {
            this.userDetails = userDetails as User;
            console.log('got userDetails', this.userDetails);
            // showing success alert used sweet alert
            this.alertService.success('Successfully retrieved users details with Id : ' + id);
        }, (error) => {
            this.alertService.error(api_error);
        }, () => {
            this.apploader.hide();
        });
    }

  downloadCSV() {
      if (this.users !== null && this.users !== undefined) {
          const userDetails = [];
          this.users.forEach(x => {
            delete  x.address;
            delete x.company;
            delete x.id;
            userDetails.push(x);
          });
          const cvs = new AngularCsv(userDetails, 'Users List_' + new Date(), this.csvOptions);
          console.log(cvs);
      }
  }

  downloadPdf() {
    const data = document.getElementById('userTable');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new Jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MyUsers_' + new Date() + '.pdf'); // Generated PDF
    });
  }


}

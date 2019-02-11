import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {api_error, User} from './user';
import {AlertService} from '../alert/alert.service';
import {LoadingService} from '../loading/loading.service';

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

}

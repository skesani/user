import {Component, OnInit} from '@angular/core';
import {UserService} from '../users/user.service';
import {api_error, Post} from '../users/user';
import {AlertService} from '../alert/alert.service';
import {LoadingService} from '../loading/loading.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

    public data: any;
    posts: any;
    postDetails: any;
    showAllPosts = true;
    showPostDetail = false;
    showCreate = false;
    private apploader;
    postForm: FormGroup;

    constructor(private userService: UserService,  private alertService: AlertService,  private loader: LoadingService, private fb: FormBuilder) {
        this.apploader = this.loader;
        // creating form
        this.createForm();
        this.apploader.show();
        // post is very quick just using settimeout to show loader
        setTimeout(() => {
            this.userService.getAllPosts().subscribe(posts => {
                this.posts = posts as Post;
                this.data = this.posts;
                // showing success alert used sweet alert
                this.alertService.success('Successfully retrieved posts! ');
                console.log('got posts', this.posts);
            }, (error) => {
                this.alertService.error(api_error);
            }, () => {
                this.apploader.hide();
            });
        }, 1000);
    }

    ngOnInit() {
    }

    /**
     * creating form
     */
    createForm() {
        // pattern to allow alpha numeric values and space
       const titlePattern = '^[a-zA-Z0-9 ]*$';
        this.postForm = this.fb.group({
            title: ['', [Validators.required, Validators.pattern(titlePattern), Validators.maxLength(24)]],
            body: ['', [Validators.required, Validators.maxLength(50)]]
        });
    }

    /**
     * showing post details
     * @param id
     */
    showPostDetails(id: number) {
        // showing loader
        this.apploader.show();
        setTimeout(() => {
            this.showAllPosts = false;
            this.showPostDetail = true;
            this.userService.getPostDetails(id).subscribe(postDetails => {
                this.alertService.success('Successfully retrieved posts with title: ' + postDetails.title);
                this.postDetails = postDetails as Post;
                console.log('got userDetails', this.showPostDetail);
            }, (error) => {
                this.alertService.error(api_error);
            }, () => {
                this.apploader.hide();
            });
        }, 300);
    }

    /**
     * creating post
     * @param obj
     */
    createPost(obj) {
        if (obj !== undefined && obj !== null) {
            obj.userId = 1;
            // showing loader
            this.apploader.show();
            // post is very quick just using settimeout to show loader
            setTimeout(() => {
                this.userService.savePost(obj).subscribe(post => {
                    this.alertService.success('Successfully created post with title: ' + post.title);
                    // after post sucess showing all posts and hiding post details and create
                    this.showAllPosts = true;
                    this.showPostDetail = false;
                    this.showCreate = false;
                }, (error) => {
                    // if api throw error showing alert
                    this.alertService.error(api_error);
                }, () => {
                    // hiding loader on complete
                    this.apploader.hide();
                });
            }, 300);
        }

    }

}

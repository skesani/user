import {Component, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoadingService} from './loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnDestroy  {

    _template =  ``;

    /**
     * @description Loading text
     *
     */
    _loadingText = '';


    /**
     * @description Defines threhold for not to diplay if time is less than 500ms
     */
    _threshold = 300;

    /**
     * @description Defines z-index property of the loading text
     *
     */
    _zIndex = 9999;

    /**
     * @description Sets z-index for input text
     *
     */
    @Input()
    public set zIndex(value: number) {
        this._zIndex = value;
    }

    /**
     * @description returns z-index for input text
     *
     */
    public get zIndex(): number {
        return this._zIndex;
    }

    /**
     * @description Accepts custom template
     *
     */
    @Input()
    public set template(value: string) {
        this._template = value;
    }


    /**
     * @description Gives the current template
     *
     */
    public get template(): string {
        return this._template;
    }


    /**
     * @description Accepts loading text string
     *
     */
    @Input()
    public set loadingText(value: string) {
        this._loadingText = value;
    }


    /**
     * @description Gives loading text
     *
     */
    public get loadingText(): string {
        return this._loadingText;
    }


    /**
     * @description Accepts external threshold
     *
     */
    @Input()
    public set threshold(value: number) {
        this._threshold = value;
    }


    /**
     * @description
     *
     */
    public get threshold(): number {
        return this._threshold;
    }

    /**
     * Subscription
     *
     */
    subscription: Subscription;

    /**
     * @description Show/hide spinner
     *
     */
    showSpinner = false;

    /**
     * Constructor
     *
     */
    constructor(private spinnerService: LoadingService) {
        this.createServiceSubscription();
    }

    /**
     * Destroy function
     *
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * Create service subscription
     *
     */
    createServiceSubscription() {
        let timer: any;
        this.subscription = this.spinnerService.getMessage().subscribe(show => {
                if (show) {
                    if (timer) {
                        return;
                    }
                    timer = setTimeout(function () {
                        timer = null;
                        this.showSpinner = show;
                    }.bind(this), this.threshold);
                } else {
                    clearTimeout(timer);
                    timer = null;
                    this.showSpinner = false;
                }
            });
    }

}

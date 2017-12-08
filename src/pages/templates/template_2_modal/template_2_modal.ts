import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams,ViewController } from 'ionic-angular';
import { CustomService } from '../../../services/custom.service';

@IonicPage()
@Component({
    selector: 'temp_2_modal',
    templateUrl: './template_2_modal.html',

})
export class Template_2_modal {

    data: any;
    chapterName: string; //to show in the navbar heading
    constructor(
        private navParams: NavParams,
        private viewCtrl:ViewController
    ) {
        this.data = this.navParams.get('data');
        this.chapterName = this.navParams.get('chapterName');
    }
    dismiss(){
        this.viewCtrl.dismiss();
    }
}
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { CustomService } from '../../../services/custom.service';
import { GeneralService } from '../../../services/general.service';


@IonicPage()
@Component({
    selector: 'temp_1',
    templateUrl: './template_1.html',

})
export class Template_1 {

    data: any;
    chapterName: string; //to show in the navbar heading
    constructor(
        private navParams: NavParams,
        private generalService:GeneralService
    ) {
        this.data = this.generalService.getDataByTopicId(this.navParams.get('topicId'));
        this.chapterName = this.navParams.get('chapterName');
    }
}
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';


@IonicPage()
@Component({
    selector: 'category-detail',
    templateUrl: './category-detail.html',

})
export class CategoryDetailPage {

    category: any;
    constructor(
        private navCtrl: NavController,
        private navParam: NavParams,
    ) {

        let categoryId:number = this.navParam.get('categoryId');
        let categories:Array<any> = JSON.parse(localStorage.getItem('coursesDetails'));
        
        this.category = categories.find((catg:any)=>catg.courseCategoryId==categoryId);
    }

}

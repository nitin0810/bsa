import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { GeneralService } from '../../../services/general.service';
import { CustomService } from '../../../services/custom.service';

@Component({
    selector: 'myCourses',
    templateUrl: './myCourses.html',

})

export class MyCoursesPage {

    subscribedCategories: Array<any> = [];
    adds: { name: string; ratingCount: string; price: string; img: any; }[];
    color: string = '#F44336';

    constructor(
        private navCtrl: NavController,
        private menu:MenuController,
        private customService: CustomService,
        private generalService: GeneralService
    ) { }

    ngOnInit() {
        this.menu.enable(true);
        
        this.fetchSubscribedCourses();
        // this.adds = [
        //     { name: 'Basic Life Basic Support', ratingCount: '2230', price: '$150.00', img: 'http://www.globalhealthprofessionals.co.uk/wp-content/uploads/2015/01/Basic-Life-Support-Adult-Paediatric-and-Infant1-637x408.jpg' },
        //     { name: 'Bullying and harrasment', ratingCount: '9930', price: '$250.00', img: 'https://i.cbc.ca/1.4003736.1488323008!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/workplace-bullying.jpg' },
        //     { name: 'Dementia awareness', ratingCount: '1230', price: '$300.00', img: 'http://viplocal.com.au/wp-content/uploads/2016/09/Dementia-Awareness-You-Are-Not-Alone-2.jpg' },
        // ];
    }

    fetchSubscribedCourses() {

        this.customService.showLoader();
        this.generalService.getMyCoursesInfo()
            .subscribe((res: any) => {
                this.subscribedCategories = res;
                this.customService.hideLoader();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });

    }

    // openCategoryDetailPage(categoryId: number) {
    //     this.navCtrl.push("CategoryDetailPage", { 'categoryId': categoryId });
    // }

    openCourseDetailPage(course: any) {
        this.navCtrl.push("CourseDetailPage", { 'course': course });
    }

    openBuyCoursePage() {
        // this.navCtrl.push(BuyCoursePage);
    }
}

import { Component } from '@angular/core';
import { MenuController, NavController, ModalController } from 'ionic-angular';
import { GeneralService } from '../../../services/general.service';
import { CustomService } from '../../../services/custom.service';

@Component({
    selector: 'myCourses',
    templateUrl: './myCourses.html',

})

export class MyCoursesPage {

    subscribedCourses: Array<any> = [];
    categories: Array<any>;
    adds: { name: string; ratingCount: string; price: string; img: any; }[];
    color:string='#F44336';

    constructor(
        private navCtrl: NavController,
        private customService: CustomService,
        private generalService: GeneralService
    ) { }

    ngOnInit() {

        this.fetchCoursesDetails();

        this.adds = [
            { name: 'Basic Life Basic Support', ratingCount: '2230', price: '$150.00', img: 'http://www.globalhealthprofessionals.co.uk/wp-content/uploads/2015/01/Basic-Life-Support-Adult-Paediatric-and-Infant1-637x408.jpg' },
            { name: 'Bullying and harrasment', ratingCount: '9930', price: '$250.00', img: 'https://i.cbc.ca/1.4003736.1488323008!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/workplace-bullying.jpg' },
            { name: 'Dementia awareness', ratingCount: '1230', price: '$300.00', img: 'http://viplocal.com.au/wp-content/uploads/2016/09/Dementia-Awareness-You-Are-Not-Alone-2.jpg' },
        ];

        // this.subscribedCourses = [
        //     {
        //         name: 'Mental Capacity', img: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCOqrA8tS3npIZVH4WBc--HaESc0jfphKyygtupw9FUkvqQdyg`,
        //         status: 'Not Started', color: '#F44336', progress: '0', timeLeft: '15',
        //     },

        //     { name: 'Anaphylaxis', img: 'http://americasbestcareplus.com/wp-content/uploads/2017/03/Screen-Shot-2017-03-25-at-11.25.35-AM.png', status: 'In Progress', color: '#FF9800', progress: '30', timeLeft: '13', },
        //     { name: 'Counter Fraud', img: 'http://www.localgov.co.uk/Library/images/teaser/fraud1.gif', status: 'Finished', color: '#8BC34A', progressBar: '100', timeLeft: '1', },
        //     { name: 'Cytology', img: 'http://www.healthline.com/hlcmsresource/images/imce/cytology-exam-of-urine_thumb.jpg', status: 'Not Started', color: '#F44336', progressBar: '0', timeLeft: '10', },
        //     { name: 'Career Awareness', img: 'http://www.actionforcarers.org.uk/files/1213/6318/0972/Young_woman_with_GP.jpg', status: 'Pre-requisite', color: '#673AB7', progressBar: '0', timeLeft: '4', },
        //     { name: 'Cheparoning', img: 'https://i.ytimg.com/vi/4OkZocjuM6U/hqdefault.jpg', status: 'Finished', color: '#8BC34A', progressBar: '100', timeLeft: '2', }
        // ]
    }

    fetchCoursesDetails() {

        // if (localStorage.getItem("coursesDetails")!==null) {
        //     this.categories = JSON.parse(localStorage.getItem("coursesDetails"));
        //     return;
        // }
        this.customService.showLoader();
        this.generalService.getMyCoursesPageInfo()
            .subscribe((res: any) => {
                this.categories = res;
                this.setSubscribedCourses(res);
                // this.generalService.storeCoursesDetails(res);
                this.customService.hideLoader();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });

    }

    openCategoryDetailPage(categoryId: number) {
        this.navCtrl.push("CategoryDetailPage", { 'categoryId': categoryId });
    }

    setSubscribedCourses(categories: Array<any>) {
        categories.forEach((catg: any) => {
            /**if category has any course/courses then collect them in subscribedCourses list */
            catg.courses && catg.courses.length != 0 && (this.subscribedCourses =this.subscribedCourses.concat(catg.courses));
        });

        console.log(this.subscribedCourses);
        
    }

    openCourseDetailPage(course:any) {
        this.navCtrl.push("CourseDetailPage", { 'course': course });
    }

    openBuyCoursePage() {
        // this.navCtrl.push(BuyCoursePage);
    }
}

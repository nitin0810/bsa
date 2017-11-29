import { Component } from '@angular/core';
import { MenuController,NavController, ModalController } from 'ionic-angular';

@Component({
    selector: 'myCourses',
    templateUrl: './myCourses.html',

})

export class MyCoursesPage {

    subscribedCourses: ({ name: string; img: string; status: string; color: string; progress: string; timeLeft: string; } | { name: string; img: string; status: string; color: string; progressBar: string; timeLeft: string; })[];
    categories: { name: string; img: string; }[];
    adds: { name: string; ratingCount: string; price: string; img: any; }[];


    constructor(
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public menu:MenuController
    ) {      
        console.log(this.menu.isEnabled());
        console.log(this.menu.isOpen());
        console.log(this.navCtrl.getActive());
        
        
          
    }

    ngOnInit() {

        this.adds = [
            { name: 'Basic Life Basic Support', ratingCount: '2230', price: '$150.00', img: 'http://www.globalhealthprofessionals.co.uk/wp-content/uploads/2015/01/Basic-Life-Support-Adult-Paediatric-and-Infant1-637x408.jpg' },
            { name: 'Bullying and harrasment', ratingCount: '9930', price: '$250.00', img: 'https://i.cbc.ca/1.4003736.1488323008!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/workplace-bullying.jpg' },
            { name: 'Dementia awareness', ratingCount: '1230', price: '$300.00', img: 'http://viplocal.com.au/wp-content/uploads/2016/09/Dementia-Awareness-You-Are-Not-Alone-2.jpg' },
        ];
        this.categories = [
            { name: 'GP Practice', img: 'http://www.canaldiabetes.com/wp-content/uploads/2014/09/PAciente-con-diabetes-e1410165850630.jpg' },
            { name: 'Dental Practice', img: 'http://www.foranyinfo.com/wp-content/uploads/2016/12/dental-practice-loans-and-financing.jpg' },
            { name: 'Hospice', img: 'data:image/jpeg;base64,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' },
            { name: 'Nursing/Care Home', img: 'http://www.pristinerecruitment.co.uk/userfiles/home-care-nursing-services-barnet-london.jpg' },
            { name: 'Urgent Care', img: 'http://www.veniceculverclinic.com/MyImages/Urgentcare.jpg' },
            { name: 'The Care Certificate', img: 'https://tap.mhs.com/portals/0/Certification/certifiedicon.jpg' },
        ];
        this.subscribedCourses = [
            {
                name: 'Mental Capacity', img: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCOqrA8tS3npIZVH4WBc--HaESc0jfphKyygtupw9FUkvqQdyg`,
                status: 'Not Started', color: '#F44336', progress: '0', timeLeft: '15',
            },

            { name: 'Anaphylaxis', img: 'http://americasbestcareplus.com/wp-content/uploads/2017/03/Screen-Shot-2017-03-25-at-11.25.35-AM.png', status: 'In Progress', color: '#FF9800', progress: '30', timeLeft: '13', },
            { name: 'Counter Fraud', img: 'http://www.localgov.co.uk/Library/images/teaser/fraud1.gif', status: 'Finished', color: '#8BC34A', progressBar: '100', timeLeft: '1', },
            { name: 'Cytology', img: 'http://www.healthline.com/hlcmsresource/images/imce/cytology-exam-of-urine_thumb.jpg', status: 'Not Started', color: '#F44336', progressBar: '0', timeLeft: '10', },
            { name: 'Career Awareness', img: 'http://www.actionforcarers.org.uk/files/1213/6318/0972/Young_woman_with_GP.jpg', status: 'Pre-requisite', color: '#673AB7', progressBar: '0', timeLeft: '4', },
            { name: 'Cheparoning', img: 'https://i.ytimg.com/vi/4OkZocjuM6U/hqdefault.jpg', status: 'Finished', color: '#8BC34A', progressBar: '100', timeLeft: '2', }
        ]
    }


    openCoursePage(categoryName) {
        // this.navCtrl.push(CourseListPage, { 'category': categoryName });
    }

    openSubscribedCourse(courseName) {
        // this.myParam = courseName;
        // this.navCtrl.push(CourseDetailsPage, { 'myParam': this.myParam });
    }

    openBuyCoursePage() {
        // this.navCtrl.push(BuyCoursePage);
    }
}

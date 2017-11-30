import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'courseCategories',
  templateUrl: './categories.html',
  styles: [`
  .big{
        font-size:60px;
    }
`]
})
export class CourseCategoriesPage {

  constructor(public navCtrl: NavController) {

  }

  openAllCoursesPage(){
    // this.navCtrl.push(AllCoursesPage);
}
}

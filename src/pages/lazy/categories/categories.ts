import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { GeneralService } from '../../../services/general.service';
import { CustomService } from '../../../services/custom.service';


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

  categories: Array<any>;
  constructor(
    private navCtrl: NavController,
    private generalService: GeneralService,
    private customService: CustomService
  ) {
    this.fetchCoursesDetails();
  }

  fetchCoursesDetails() {

    if (localStorage.getItem("coursesDetails") !== null) {
      this.categories = JSON.parse(localStorage.getItem("coursesDetails"));
      return;
    }
    
    this.customService.showLoader();
    this.generalService.getMyCoursesPageInfo()
      .subscribe((res: any) => {
        this.categories = res;
        this.generalService.storeCoursesDetails(res);
        this.customService.hideLoader();
      }, (err: any) => {
        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });

  }

  openCategoryDetailPage(categoryId: number) {
    this.navCtrl.push("CategoryDetailPage", { 'categoryId': categoryId });
  }
}

import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { CourseCategoriesPage } from "./categories";


@NgModule({
    declarations: [CourseCategoriesPage],
    
    imports: [
        IonicPageModule.forChild(CourseCategoriesPage)
    ]
})
export class CategoriesModule { }



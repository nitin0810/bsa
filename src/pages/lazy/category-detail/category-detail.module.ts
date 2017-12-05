import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { CategoryDetailPage } from "./category-detail";


@NgModule({
    declarations: [CategoryDetailPage],
    
    imports: [
        IonicPageModule.forChild(CategoryDetailPage)
    ]
})
export class CategoryDetailModule { }



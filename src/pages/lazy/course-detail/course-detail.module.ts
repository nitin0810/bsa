import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { CourseDetailPage } from "./course-detail";


@NgModule({
    declarations: [CourseDetailPage],
    
    imports: [
        IonicPageModule.forChild(CourseDetailPage)
    ]
})
export class CourseDetailModule { }



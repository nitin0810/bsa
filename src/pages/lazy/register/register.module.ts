import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { RegisterPage } from "./register";


@NgModule({
    declarations: [RegisterPage],
    
    imports: [
        IonicPageModule.forChild(RegisterPage)
    ]
})

export class RegisterModule { }



import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { LoginConfirmedPage } from "./loginConfirmed";


@NgModule({
    declarations: [LoginConfirmedPage],
    
    imports: [
        IonicPageModule.forChild(LoginConfirmedPage)
    ]
})
export class LoginConfirmedModule { }



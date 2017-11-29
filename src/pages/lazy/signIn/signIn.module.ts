import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { SignInPage } from "./signIn";


@NgModule({
    declarations: [SignInPage],
    
    imports: [
        IonicPageModule.forChild(SignInPage)
    ]
})
export class SignInModule { }



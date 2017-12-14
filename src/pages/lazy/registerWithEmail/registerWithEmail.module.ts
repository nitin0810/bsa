import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { RegisterWithEmailPage } from "./registerWithEmail";


@NgModule({
    declarations: [RegisterWithEmailPage],
    
    imports: [
        IonicPageModule.forChild(RegisterWithEmailPage)
    ]
})

export class RegisterWithEmailModule { }



import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { SignedInPage } from "./signedIn";


@NgModule({
    declarations: [SignedInPage],
    
    imports: [
        IonicPageModule.forChild(SignedInPage)
    ]
})
export class SignedInModule { }



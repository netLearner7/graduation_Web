import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyAudienceComponent } from "../my-audience/my-audience.component";
import { myAudienceRoutingModule } from "./my-audience-routing.module";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { DetailsAudienceComponent } from "./components/details-audience/details-audience.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [MyAudienceComponent, DetailsAudienceComponent],
  imports: [
    CommonModule,
    FormsModule,
    myAudienceRoutingModule,
    NgZorroAntdModule
  ]
})
export class MyAudienceModule {}

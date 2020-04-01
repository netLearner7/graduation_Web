import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyAudienceComponent } from "./my-audience.component";
import { DetailsAudienceComponent } from "./components/details-audience/details-audience.component";

const routes: Routes = [
  {
    path: "",
    component: MyAudienceComponent
  },
  {
    path: "details/:user_MeetingId",
    component: DetailsAudienceComponent,
    data: {
      breadcrumb: "会议详情"
    }
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class myAudienceRoutingModule {}

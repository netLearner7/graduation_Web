import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyMeetingComponent } from "./my-meeting.component";
import { AddMeetingComponent } from "./components/add-meeting/add-meeting.component";
import { ModifyMeetingComponent } from "./components/modify-meeting/modify-meeting.component";
import { DetailsMeetingComponent } from "./components/details-meeting/details-meeting.component";

const routes: Routes = [
  {
    path: "add",
    component: AddMeetingComponent,
    data: {
      breadcrumb: "发起会议",
      animationData: "add-meeting"
    }
  },
  {
    path: "modify/:meetingId",
    component: ModifyMeetingComponent,
    data: {
      breadcrumb: "修改会议",
      animationData: "modify-meeting"
    }
  },
  {
    path: "details/:meetingId",
    component: DetailsMeetingComponent,
    data: {
      breadcrumb: "会议详情",
      animationData: "details-meeting"
    }
  },
  {
    path: "",
    component: MyMeetingComponent
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
export class myMeetingRoutingModule {}

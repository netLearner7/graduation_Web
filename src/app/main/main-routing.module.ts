import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main.component";

const routes: Routes = [
  {
    path: "main",
    component: MainComponent,
    children: [
      {
        path: "Home",
        loadChildren: "./home/home.module#HomeModule",
        data: {
          breadcrumb: "首页",
          animationData: "home"
        }
      },
      {
        path: "myMeeting",
        loadChildren: "./my-meeting/my-meeting.module#MyMeetingModule",
        data: {
          breadcrumb: "我的会议",
          animationData: "my-meeting"
        }
      },
      {
        path: "myAudience",
        loadChildren: "./my-audience/my-audience.module#MyAudienceModule",
        data: {
          breadcrumb: "参加的会议",
          animationData: "my-audience"
        }
      },
      {
        path: "statistics",
        loadChildren: "./statistics/statistics.module#StatisticsModule",
        data: {
          breadcrumb: "统计",
          animationData: "statistics"
        }
      },
      {
        path: "**",
        redirectTo: "Home"
      }
    ]
  },
  {
    path: "**",
    redirectTo: "main"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyMeetingModule } from "./my-meeting/my-meeting.module";
import { MyAudienceModule } from "./my-audience/my-audience.module";
import { StatisticsModule } from "./statistics/statistics.module";
import { MainComponent } from "./main.component";
import { MainRoutingModule } from "./main-routing.module";
import { HomeModule } from "./home/home.module";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { SiderComponent } from "./components/sider/sider.component";

@NgModule({
  declarations: [MainComponent, SiderComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MyAudienceModule,
    MyMeetingModule,
    StatisticsModule,
    HomeModule,
    NgZorroAntdModule
  ]
})
export class MainModule {}

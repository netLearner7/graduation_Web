import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { AttendMeetingComponent } from "./components/attend-meeting/attend-meeting.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [HomeComponent, AttendMeetingComponent],
  imports: [CommonModule, HomeRoutingModule, NgZorroAntdModule, FormsModule]
})
export class HomeModule {}

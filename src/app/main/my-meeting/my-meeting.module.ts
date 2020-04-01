import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyMeetingComponent } from "../my-meeting/my-meeting.component";
import { myMeetingRoutingModule } from "./my-meeting-routing.module";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { AddMeetingComponent } from "./components/add-meeting/add-meeting.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModifyMeetingComponent } from "./components/modify-meeting/modify-meeting.component";
import { DetailsMeetingComponent } from "./components/details-meeting/details-meeting.component";
import { ClipboardModule } from "ngx-clipboard";
import { QrCodeModule } from "ng-qrcode";
import { PersonnelListComponent } from './components/personnel-list/personnel-list.component';

@NgModule({
  declarations: [
    MyMeetingComponent,
    AddMeetingComponent,
    ModifyMeetingComponent,
    DetailsMeetingComponent,
    PersonnelListComponent
  ],
  imports: [
    CommonModule,
    myMeetingRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    QrCodeModule
  ]
})
export class MyMeetingModule {}

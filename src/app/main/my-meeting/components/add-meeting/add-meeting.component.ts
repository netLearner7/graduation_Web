import { Component, OnInit } from "@angular/core";
import { meeting } from "src/app/shared/entities/meeting";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OidcService } from "src/app/shared/service/oidc.service";
import { meetingStateEnum } from "src/app/shared/enum/meeting-stats-enum";
import { MeetingService } from "src/app/main/service/meeting.service";
import { dateTime } from "src/app/shared/entities/dateTime";
import { DatetimeService } from "src/app/shared/service/datetime.service";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-add-meeting",
  templateUrl: "./add-meeting.component.html",
  styleUrls: ["./add-meeting.component.less"]
})
export class AddMeetingComponent implements OnInit {
  //表单控件
  public validateForm: FormGroup;
  //会议信息
  public meeting: meeting = new meeting();
  //时间
  public datetime: dateTime = new dateTime();

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      meetingName: ["", [Validators.required]],
      address: ["", [Validators.required]],
      content: ["", [Validators.required]],
      datePicker: ["", [Validators.required]],
      timePicker: [null, [Validators.required]]
    });
  }
  constructor(
    private fb: FormBuilder,
    private oidc: OidcService,
    private meetingServer: MeetingService,
    private datetimeService: DatetimeService,
    private router: Router,
    private message: NzMessageService
  ) {}

  //提交按钮
  submitForm(myevent: any, value: any) {
    //组合数据
    this.compose();

    //发送请求
    this.meetingServer.addMeeting(this.meeting).subscribe(x => {
      this.createMessage("success", "会议创建成功！");
      this.router.navigate(["/main/myMeeting"]);
    });

    //修改表单状态
    this.dirtyForm();
  }

  //重置按钮
  resetForm(myevent: any): void {
    //重置表单
    this.validateForm.reset();
    //修改表单状态
    this.pristineForm();
  }

  //组合post的对象
  public compose(): void {
    //处理日期
    this.meeting.dateTime =
      this.datetimeService.getDate(this.datetime.date) +
      " " +
      this.datetimeService.getHour(this.datetime.time);

    this.meeting.meetingState = meetingStateEnum.NotStarted;
    this.meeting.CreaterId = this.oidc.user.profile.sub;
  }

  //将所有表单控件标记为污染的
  private dirtyForm(): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  //将所有表单控件标记为干净的
  private pristineForm(): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  //创建一个通知
  private createMessage(messageType: string, message: string): void {
    this.message.create(messageType, message);
  }
}

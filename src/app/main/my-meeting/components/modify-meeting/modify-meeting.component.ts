import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MeetingService } from "src/app/main/service/meeting.service";
import { meeting } from "src/app/shared/entities/meeting";
import { NzMessageBaseService, NzMessageService } from "ng-zorro-antd";
import { concatMap, mergeMap } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { format } from "url";
import { DatetimeService } from "src/app/shared/service/datetime.service";
import { dateTime } from "src/app/shared/entities/dateTime";

@Component({
  selector: "app-modify-meeting",
  templateUrl: "./modify-meeting.component.html",
  styleUrls: ["./modify-meeting.component.less"]
})
export class ModifyMeetingComponent implements OnInit {
  //表单控件
  public validateForm: FormGroup;
  //会议信息
  public meeting: meeting = new meeting();
  //会议时间
  public datetime: dateTime = new dateTime();

  constructor(
    private activatedRoute: ActivatedRoute,
    private meetingService: MeetingService,
    private message: NzMessageService,
    private datetimeService: DatetimeService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.getParams();
    this.createForm();
  }

  //创建表单控件
  createForm() {
    this.validateForm = this.fb.group({
      meetingName: ["", [Validators.required]],
      address: ["", [Validators.required]],
      content: ["", [Validators.required]],
      datePicker: ["", [Validators.required]],
      timePicker: [null, [Validators.required]]
    });
  }

  //获取路由参数并且请求路由信息
  getParams() {
    //有回调地狱的危险
    this.activatedRoute.paramMap.subscribe(param => {
      let meetingId = parseInt(param.get("meetingId"));
      if (meetingId != NaN) {
        this.getMeeting(meetingId);
      } else {
        this.message.create("error", "选择会议错误或者服务器出错");
      }
    });
  }

  //获取会议信息
  getMeeting(meetingId: number): void {
    this.meetingService.getMeeting(meetingId).subscribe(x => {
      this.meeting = x;
      this.splitDateTime();
    });
  }

  //将请求会的datetime分解为两个
  splitDateTime(): void {
    this.datetime.date = this.datetimeService.stringToDate(
      this.meeting.dateTime
    );
    this.datetime.time = this.datetimeService.stringToDate(
      this.meeting.dateTime
    );
  }

  //更新会议信息
  modifyMeeting($event: any, value: any) {
    this.compose();

    this.meetingService.putMeeting(this.meeting).subscribe(() => {
      this.router.navigate(["/main/myMeeting"]);
    });
  }

  //组合post的对象
  public compose(): void {
    this.meeting.dateTime =
      this.datetimeService.getDate(this.datetime.date) +
      " " +
      this.datetimeService.getHour(this.datetime.time);
  }
}

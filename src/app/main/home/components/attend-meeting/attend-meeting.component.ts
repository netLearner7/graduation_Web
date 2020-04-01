import { Component, OnInit } from "@angular/core";
import { MeetingService } from "src/app/main/service/meeting.service";
import { NzMessageService } from "ng-zorro-antd";
import { meeting } from "src/app/shared/entities/meeting";
import { UserMeetingService } from "src/app/main/service/user-meeting.service";

@Component({
  selector: "app-attend-meeting",
  templateUrl: "./attend-meeting.component.html",
  styleUrls: ["./attend-meeting.component.less"]
})
export class AttendMeetingComponent implements OnInit {
  //邀请码
  public inviteCode: string = "";
  //编码之后的邀请码
  public encodeInviteCode: string = "";
  //是否显示会议信息框
  public isVisible: boolean = false;
  //会议信息
  public meeting: meeting;
  constructor(
    private meetingService: MeetingService,
    private message: NzMessageService,
    private userMeetingService: UserMeetingService
  ) {}

  ngOnInit() {
    this.meeting = new meeting();
  }

  //查询会议信息
  queryMeeting() {
    //邀请码编码
    this.encodeInviteCode = encodeURIComponent(this.inviteCode);

    this.meetingService
      .analysisInviteCode(this.encodeInviteCode)
      .subscribe(x => {
        this.meeting = x;
        this.isVisible = true;
      });
  }

  //报名参加会议
  attend() {
    this.userMeetingService
      .attendMeeting(this.encodeInviteCode)
      .subscribe(x => {
        this.message.create("success", "报名会议成功");
        this.closeModal();
      });
  }

  closeModal() {
    this.isVisible = false;
    this.inviteCode = "";
    this.encodeInviteCode = "";
  }
}

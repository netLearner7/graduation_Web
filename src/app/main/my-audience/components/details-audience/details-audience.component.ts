import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { UserMeetingService } from "src/app/main/service/user-meeting.service";
import { UserMeeting } from "src/app/shared/entities/userMeeting";
import { meetingStateEnum } from "src/app/shared/enum/meeting-stats-enum";
import { userMeetingStateEnum } from "src/app/shared/enum/user-meeting-stats-enum";

@Component({
  selector: "app-details-audience",
  templateUrl: "./details-audience.component.html",
  styleUrls: ["./details-audience.component.less"]
})
export class DetailsAudienceComponent implements OnInit {
  //会议id
  private user_MeetingId: number;
  //会议信息
  public user_meeting: UserMeeting = new UserMeeting();
  //会议状态
  public meetingStats = meetingStateEnum;
  //签到状态
  public userMeetingStatsEnum = userMeetingStateEnum;

  constructor(
    private activateRouter: ActivatedRoute,
    private message: NzMessageService,
    private userMeetingService: UserMeetingService
  ) {}

  ngOnInit() {
    //获取数据
    this.getData();
  }

  //获取数据
  public getData() {
    //获取会议id
    this.activateRouter.paramMap.subscribe(param => {
      //转换
      this.user_MeetingId = parseInt(param.get("user_MeetingId"));

      if (this.user_MeetingId != NaN) {
        //请求数据
        this.userMeetingService
          .getUserMeeting(this.user_MeetingId)
          .subscribe(x => {
            this.user_meeting = x;
            console.log(this.user_meeting);
          });
      } else {
        this.message.create("error", "请正确选择会议");
      }
    });
  }
}

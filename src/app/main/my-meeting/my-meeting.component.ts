import { Component, OnInit } from "@angular/core";
import { meeting } from "src/app/shared/entities/meeting";
import { MeetingService } from "../service/meeting.service";
import { meetingStateEnum } from "src/app/shared/enum/meeting-stats-enum";
import { NzMessageService } from "ng-zorro-antd";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-my-meeting",
  templateUrl: "./my-meeting.component.html",
  styleUrls: ["./my-meeting.component.less"]
})
export class MyMeetingComponent implements OnInit {
  //会议状态枚举
  meetingStateEnum: any = meetingStateEnum;
  //会议列表
  meetings: meeting[] = [];
  //显示会议列表
  displayMeetings: meeting[] = [];

  //搜索框列表
  serchMeetingState = [
    { text: "未开始", value: meetingStateEnum.NotStarted },
    { text: "进行中", value: meetingStateEnum.CarryOn },
    { text: "已完成", value: meetingStateEnum.Complete },
    { text: "已取消", value: meetingStateEnum.Cancel }
  ];
  //搜索姓名
  serchName = "";
  //搜索状态
  sercharr: string[] = [];

  //筛选状态方法
  filterFunc = (item: meeting) => {
    return this.sercharr.length > 0
      ? this.sercharr.some(x => {
          return x == item.meetingState.toString();
        })
      : true;
  };

  //筛选名字方法
  filterFunc2 = (item: meeting) => {
    return this.serchName.length > 0
      ? item.meetingName.indexOf(this.serchName) >= 0
      : true;
  };

  constructor(
    private meetingService: MeetingService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getMeetings();
  }

  //按照会议状态过滤
  filter(searchArr: string[] = null): void {
    //如果searchArr为null表明状态筛选条件没变
    if (searchArr != null) {
      this.sercharr = searchArr;
    }

    //筛选
    this.displayMeetings = this.meetings.filter(item => this.filterFunc(item));
    this.displayMeetings = this.displayMeetings.filter(item =>
      this.filterFunc2(item)
    );
  }

  //清空名字搜索条件
  Reset() {
    this.serchName = "";
    this.filter();
  }

  //获取数据
  getMeetings() {
    this.meetingService.getMeetings().subscribe(x => {
      this.meetings = x;
      this.displayMeetings = this.meetings;
    });
  }

  //取消会议
  public cancelMeeting(meetingId: number): void {
    this.meetingService
      .updateMeetingsState(meetingId, [
        { op: "replace", path: "/MeetingState", value: "cancel" }
      ])
      .subscribe(() => {
        this.message.create("success", "取消成功！");
        this.getMeetings();
      });
  }
}

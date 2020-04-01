import { Component, OnInit } from "@angular/core";
import { UserMeetingService } from "../service/user-meeting.service";
import { OidcService } from "src/app/shared/service/oidc.service";
import { UserMeeting } from "src/app/shared/entities/userMeeting";
import { NzMessageService } from "ng-zorro-antd";
import { meetingStateEnum } from "src/app/shared/enum/meeting-stats-enum";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-my-audience",
  templateUrl: "./my-audience.component.html",
  styleUrls: ["./my-audience.component.less"]
})
export class MyAudienceComponent implements OnInit {
  //数据列表
  dataList: UserMeeting[] = [];
  //显示的数据列表
  displayDataList: UserMeeting[] = [];
  //会议状态枚举
  meetingState = meetingStateEnum;
  //筛选器的列表
  serchMeetingState = environment.serchMeetingState;
  //筛选name
  serchName = "";
  //筛选器的值
  sercharr: string[] = [];

  //状态筛选方法
  filterFunc = (item: UserMeeting) => {
    return this.sercharr.length > 0
      ? this.sercharr.some(x => {
          return x == item.meetingState.toString();
        })
      : true;
  };

  //名称筛选方法
  filterFunc2 = (item: UserMeeting) => {
    return this.serchName.length > 0
      ? item.meetingName.indexOf(this.serchName) >= 0
      : true;
  };

  constructor(
    private userMeetingService: UserMeetingService,
    private oidcService: OidcService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getUserMeetings();
  }

  //按照会议状态过滤
  filter(searchArr: string[] = null): void {
    //如果searchArr不为空则表明searchArr条件改变
    if (searchArr != null) {
      this.sercharr = searchArr;
    }
    //进行筛选
    this.displayDataList = this.dataList.filter(item => this.filterFunc(item));
    this.displayDataList = this.displayDataList.filter(item =>
      this.filterFunc2(item)
    );
  }

  //清空名字搜索条件
  Reset() {
    this.serchName = "";
    this.filter();
  }

  //获取数据列表
  getUserMeetings() {
    this.userMeetingService
      .getUserMeetings(this.oidcService.user.profile.sub)
      .subscribe(result => {
        this.dataList = result;
        this.displayDataList = this.dataList;
      });
  }

  //取消参会操作
  SignOutMeeting(Id: number) {
    this.userMeetingService.delUserMeeting(Id).subscribe(() => {
      this.message.create("success", "取消参会成功！");
      this.getUserMeetings();
    });
  }
}

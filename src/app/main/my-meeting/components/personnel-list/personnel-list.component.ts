import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UserMeetingService } from "src/app/main/service/user-meeting.service";
import { UserMeeting } from "src/app/shared/entities/userMeeting";
import { userMeetingStateEnum } from "src/app/shared/enum/user-meeting-stats-enum";
import { ExeclService } from "src/app/shared/service/execl.service";

@Component({
  selector: "app-personnel-list",
  templateUrl: "./personnel-list.component.html",
  styleUrls: ["./personnel-list.component.less"]
})
export class PersonnelListComponent implements OnInit {
  @Input() meetingId: number;
  @Input() isvisible: boolean;
  @Output() isvisibleChange: EventEmitter<boolean> = new EventEmitter();
  @Input() meetingName: string;

  //人员名单
  public personList: UserMeeting[] = [];
  //签到状态枚举
  public userMeetingStateEnum: any = userMeetingStateEnum;

  constructor(
    private UserMeetingService: UserMeetingService,
    private execlService: ExeclService
  ) {}

  ngOnInit() {}

  //获取参会人员名单
  public getPersonList() {
    this.UserMeetingService.getPersonList(this.meetingId.toString()).subscribe(
      x => {
        this.personList = x;
      }
    );
  }

  //关闭当前组件
  public close(): void {
    this.isvisibleChange.emit(false);
  }

  //导出execl
  public makeExecl(): void {
    //总人数
    let count: number = this.personList.length;
    //签到人数
    let checkInCount: number = 0;
    //未签到人数
    let noCount: number = 0;
    //处理数据格式
    let dataList = this.personList.map(item => {
      item.user_MeetingStats == 1 ? checkInCount++ : noCount++;

      let el: {
        姓名: string;
        签到时间: string;
        是否签到: string;
      } = {
        姓名: item.userName,
        签到时间:
          item.checkInDate.indexOf("0001-01-01") == -1 ? item.checkInDate : "",
        是否签到: item.user_MeetingStats == 1 ? "已签到" : "未签到"
      };
      return el;
    });

    //放入统计数据
    dataList.push({
      姓名: `总计${count}`,
      签到时间: `已签到${checkInCount}`,
      是否签到: `未签到${noCount}`
    });

    //调用文件处理方法
    this.execlService.ExportFile(dataList, this.meetingName + "人员名单");
  }
}

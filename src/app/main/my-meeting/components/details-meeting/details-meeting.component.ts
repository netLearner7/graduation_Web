import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MeetingService } from "src/app/main/service/meeting.service";
import { NzMessageService } from "ng-zorro-antd";
import { meeting } from "src/app/shared/entities/meeting";
import { PersonnelListComponent } from "../personnel-list/personnel-list.component";

@Component({
  selector: "app-details-meeting",
  templateUrl: "./details-meeting.component.html",
  styleUrls: ["./details-meeting.component.less"]
})
export class DetailsMeetingComponent implements OnInit {
  //人员列表组件
  @ViewChild("personList") personList: PersonnelListComponent;
  //生成邀请码的等待动画
  public isLoading: boolean = false;
  //显式人员列表
  public isvisible: boolean = false;
  //会议信息
  public meeting: meeting = new meeting();
  //路由中取会议id
  private meetingId: number;
  //邀请码字符串
  public qrString: string;
  //切换会议状态按钮文字
  public switchStateBtn: string = "开始会议";

  constructor(
    private activatedRoute: ActivatedRoute,
    private meetingService: MeetingService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getParams();
  }

  //获取路由参数并且请求路由信息
  getParams() {
    //有回调地狱的危险
    this.activatedRoute.paramMap.subscribe(param => {
      this.meetingId = parseInt(param.get("meetingId"));
      if (this.meetingId != NaN) {
        this.getMeeting();
      } else {
        this.message.create("error", "请正确选择会议");
      }
    });
  }

  //获取会议信息
  getMeeting(): void {
    this.meetingService.getMeeting(this.meetingId).subscribe(x => {
      //处理二维码内容
      this.qrString =
        "graduation " +
        x.id +
        " " +
        x.meetingName +
        " " +
        x.address +
        " " +
        x.dateTime;

      this.meeting = x;

      if (this.meeting.meetingState == 2) {
        this.switchStateBtn = "会议结束";
      }
    });
  }

  //重新生成邀请码
  public createInviteCode() {
    this.isLoading = true;
    this.meetingService.createInviteCode(this.meeting.id).subscribe(x => {
      this.meeting = x;
      this.isLoading = false;
    });
  }

  //显示参会人员名单
  public visiblePerple(): void {
    this.personList.getPersonList();
    this.isvisible = true;
  }

  //复制邀请码
  public copyInviteCode($event: any): void {
    this.message.create("success", "复制成功");
  }

  //切换会议状态
  public switchState(): void {
    this.meetingService
      .updateMeetingsState(this.meetingId, [
        {
          op: "replace",
          path: "/MeetingState",
          value: ++this.meeting.meetingState
        }
      ])
      .subscribe(() => {
        //修改按钮文字
        if (this.meeting.meetingState == 2) {
          this.switchStateBtn = "会议结束";
        }
        if (this.meeting.meetingState == 3) {
          this.switchStateBtn = "";
        }

        this.message.create("success", "会议状态已切换！");
      });
  }
}

import { Component, OnInit } from "@angular/core";
import { StatistService } from "../service/statist.service";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.less"]
})
export class StatisticsComponent implements OnInit {
  chartOption: any;
  //图表日期
  date: string[] = [];
  //发起会议数量
  meetingNumberData: number[] = [];
  //参加会议数量
  userMeetingNumberData: number[] = [];

  allMeeting: number;
  allUserMeeting: number;
  monthMeeting: number;
  monthUserMeeting: number;

  constructor(private statistService: StatistService) {}

  ngOnInit(): void {
    this.statist_12_Meeting();
    this.statist_12_UserMeeting();
    this.statistAll();
    this.statistMonth();
  }

  //统计前12个月用户发起的会议 每次读取完数据将最新输入设置到绘图表
  statist_12_Meeting() {
    this.statistService.statist_12_Meeting().subscribe(x => {
      x.forEach(item => {
        this.date.push(item.date);
        this.meetingNumberData.push(item.number);
      });
      this.mySetOption();
    });
  }

  //统计前12个月用户参加的会议
  statist_12_UserMeeting() {
    this.statistService.statist_12_UserMeeting().subscribe(x => {
      x.forEach(item => {
        this.userMeetingNumberData.push(item.number);
      });
      console.log("111", this.userMeetingNumberData);
      this.mySetOption();
    });
  }

  //统计所有 的数据
  statistAll() {
    this.statistService.statistAllorMonth(false).subscribe(x => {
      this.allMeeting = x.meetingNumber;
      this.allUserMeeting = x.userMeetingNumber;
    });
  }

  //统计本月的数据
  statistMonth() {
    this.statistService.statistAllorMonth(true).subscribe(x => {
      this.monthMeeting = x.meetingNumber;
      this.monthUserMeeting = x.userMeetingNumber;
    });
  }

  //设置图表
  mySetOption() {
    this.chartOption = {
      title: {
        text: "近12月统计图"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["组织会议", "参与会议"]
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: this.date
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "组织会议",
          type: "line",
          stack: "总量",
          areaStyle: { normal: {} },
          data: this.meetingNumberData
        },
        {
          name: "参与会议",
          type: "line",
          stack: "总量",
          areaStyle: { normal: {} },
          data: this.userMeetingNumberData
        }
      ]
    };
  }
}

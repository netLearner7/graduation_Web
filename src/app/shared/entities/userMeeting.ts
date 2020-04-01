import { meetingStateEnum } from "../enum/meeting-stats-enum";
import { userMeetingStateEnum } from "../enum/user-meeting-stats-enum";

export class UserMeeting {
  //参会记录id
  public id: number;
  //是否签到
  public user_MeetingStats: userMeetingStateEnum;
  //会议报名日期
  public registrationDate: string;
  //会议签到日期
  public checkInDate: string;

  //用户信息
  //用户id
  public creatorId: string;
  //参与者用户名
  public userName: string;

  //会议信息
  //会议id
  public meetingId: number;
  //会议名
  public meetingName: string;
  //会议地址
  public address: string;
  //会议内容
  public content: string;
  //会议时间
  public dateTime: string;
  //会议状态
  public meetingState: meetingStateEnum;
  //创建者用户名
  public creatorName: string;
}

import { meetingStateEnum } from "../enum/meeting-stats-enum";

export class meeting {
  public id: number;
  public CreaterId: string;
  public userName: string;
  public meetingName: string;
  public address: string;
  public content: string;
  public dateTime: string;
  public meetingState: meetingStateEnum;
  public inviteCode: string;
}

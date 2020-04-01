import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserMeeting } from "src/app/shared/entities/userMeeting";
import { OidcService } from "src/app/shared/service/oidc.service";
import { userMeetingStateEnum } from "src/app/shared/enum/user-meeting-stats-enum";

@Injectable({
  providedIn: "root"
})
export class UserMeetingService {
  constructor(private httpclient: HttpClient, private oidc: OidcService) {}

  //获取userid参与的会议
  public getUserMeetings(userId: string): Observable<UserMeeting[]> {
    return this.httpclient.get<UserMeeting[]>("/api/User_Meeting", {
      params: {
        userId
      }
    });
  }

  //获取参会人员名单
  public getPersonList(meetingId: string): Observable<UserMeeting[]> {
    return this.httpclient.get<UserMeeting[]>("/api/User_Meeting/PersonList", {
      params: {
        meetingId: meetingId
      }
    });
  }

  //获取时间为今天，参会用户id为当前用户的会议列表
  //作用于今天参与的会议
  public getTodayUserMeeting(): Observable<any[]> {
    return this.httpclient.get<UserMeeting[]>(
      "/api/User_Meeting/TodayUserMeeting"
    );
  }

  //获取会议信息
  public getUserMeeting(Id: number): Observable<UserMeeting> {
    return this.httpclient.get<UserMeeting>(`api/User_Meeting/${Id}`);
  }

  //删除指定id的参会记录
  public delUserMeeting(Id: number): Observable<{}> {
    return this.httpclient.delete(`api/User_Meeting/${Id}`);
  }

  //参加会议 首页会议报名使用
  public attendMeeting(inviteCode: string): Observable<{}> {
    return this.httpclient.post<Observable<{}>>("/api/User_Meeting", {
      userId: this.oidc.user.profile.sub,
      User_MeetingStats: userMeetingStateEnum.NoSignIn,
      inviteCode
    });
  }
}

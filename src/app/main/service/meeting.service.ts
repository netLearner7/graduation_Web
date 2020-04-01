import { Injectable } from "@angular/core";
import { OidcService } from "src/app/shared/service/oidc.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { meeting } from "src/app/shared/entities/meeting";
import { userMeetingStateEnum } from "src/app/shared/enum/user-meeting-stats-enum";

@Injectable({
  providedIn: "root"
})
export class MeetingService {
  constructor(private oidc: OidcService, private httpclient: HttpClient) {}

  //创建一个会议  添加会议使用
  public addMeeting(meeting: meeting): Observable<meeting> {
    console.log(meeting);
    return this.httpclient.post<meeting>("/api/Meeting", meeting);
  }

  //根据会议id查询一个会议 我发起的会议详情、会议修改使用
  public getMeeting(meetingId: number): Observable<meeting> {
    return this.httpclient.get<meeting>(`/api/Meeting/${meetingId}`);
  }

  //查询该用户发起的所有会议 我的会议使用
  public getMeetings(): Observable<meeting[]> {
    return this.httpclient.get<meeting[]>(`/api/Meeting`, {
      params: { userId: this.oidc.user.profile.sub }
    });
  }

  //局部更新会议 取消会议、切换会议状态使用
  public updateMeetingsState(meetingId: number, body: any): Observable<{}> {
    return this.httpclient.patch(`/api/Meeting/${meetingId}`, body);
  }

  //整体更新会议 我发起的会议修改使用
  public putMeeting(meeting: meeting): Observable<{}> {
    return this.httpclient.put("/api/Meeting", meeting);
  }

  //参加会议 首页会议报名使用
  // public attendMeeting(inviteCode: string): Observable<{}> {
  //   return this.httpclient.post<Observable<{}>>("/api/User_Meeting", {
  //     userId: this.oidc.user.profile.sub,
  //     User_MeetingStats: userMeetingStateEnum.NoSignIn,
  //     inviteCode
  //   });
  // }

  //解析邀请码获取会议信息 首页邀请码解析使用
  public analysisInviteCode(inviteCode: string): Observable<meeting> {
    return this.httpclient.get<meeting>("/api/Meeting/analysisInviteCode", {
      params: {
        inviteCode
      }
    });
  }

  //创建邀请码  我的会议详情使用
  public createInviteCode(meetingId: number): Observable<meeting> {
    return this.httpclient.post<meeting>(
      `/api/Meeting/${meetingId}/createInviteCode`,
      {}
    );
  }
}

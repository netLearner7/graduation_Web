import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { statistics } from "src/app/shared/entities/statistics";
import { OidcService } from "src/app/shared/service/oidc.service";

@Injectable({
  providedIn: "root"
})
export class StatistService {
  constructor(private httpclient: HttpClient, private oidc: OidcService) {}

  //统计前12个月我发起的会议数量
  public statist_12_Meeting() {
    return this.httpclient.get<statistics[]>(
      `api/Statistics/statist_12_Meeting/${this.oidc.user.profile.sub}`
    );
  }

  //统计前12个月我参与的会议数量
  public statist_12_UserMeeting() {
    return this.httpclient.get<statistics[]>(
      `api/Statistics/statist_12_UserMeeting/${this.oidc.user.profile.sub}`
    );
  }

  //统计所有或者当月的数量
  public statistAllorMonth(isThisMonth: Boolean) {
    return this.httpclient.get<{
      userMeetingNumber: number;
      meetingNumber: number;
    }>(
      `api/Statistics/statistNumber/${this.oidc.user.profile.sub}/${isThisMonth}`
    );
  }
}

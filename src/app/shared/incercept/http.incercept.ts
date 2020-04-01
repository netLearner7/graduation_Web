import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { OidcService } from "../service/oidc.service";
import { catchError, mergeMap } from "rxjs/operators";
import { NzMessageService } from "ng-zorro-antd";

@Injectable()
export class HttpIncerept implements HttpInterceptor {
  constructor(private oidc: OidcService, private message: NzMessageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.oidc.userAvailable) {
      req = req.clone({
        setHeaders: {
          Authorization: `${this.oidc.user.token_type} ${this.oidc.user.access_token}`
        }
      });
    }
    return next
      .handle(req)
      .pipe(catchError((err: HttpErrorResponse) => this.handleData(err)));
  }

  private handleData(event: HttpErrorResponse): Observable<any> {
    console.log(event);
    // http异常拦截
    switch (event.status) {
      case 400:
        this.message.create("error", event.error);
        break;
      case 401: // 未登录状态码
        this.message.create(
          "warning",
          "您的登录信息已过期，正在跳转到登录页..."
        );
        this.oidc.triggerSignIn();
        break;
      case 404:
        this.message.create("error", "您寻找的东西丢失了！");
        break;
      case 500:
        this.message.create("error", "服务器出现了故障！");
        break;
      case 504:
        this.message.create("error", "连接不到服务器！");
        break;
      default:
        this.message.create("error", "未知错误！");
        break;
    }
    return of(event);
  }
}

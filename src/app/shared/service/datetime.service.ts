import { Injectable } from "@angular/core";
import { format } from "date-fns";

@Injectable({
  providedIn: "root"
})
export class DatetimeService {
  constructor() {}

  public stringToDate(date: string): Date {
    return new Date(date);
  }

  public getDate(date: Date): string {
    return format(date, "yyyy-MM-dd");
  }

  public getHour(date: Date): string {
    return format(date, "HH:mm:ss");
  }
}

import { Injectable } from "@angular/core";
import { saveAs } from "file-saver";
import { WorkSheet, utils, WorkBook, write } from "xlsx";

@Injectable({
  providedIn: "root"
})
export class ExeclService {
  constructor() {}

  //处理文件格式  我的会议导出人员名单使用
  ExportFile(json: any[], fileName: string) {
    //每一个worksheet代表一张表
    const worksheet1: WorkSheet = utils.json_to_sheet(json);
    console.log(worksheet1);
    //const worksheet2: WorkSheet = utils.json_to_sheet(json);

    //这种方法加不进数据
    // const workbook: WorkBook = {
    //   Sheets: { data: worksheet1 },
    //   SheetNames: ["测试"]
    // };

    const workbook: WorkBook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet1, "Sheet1");

    //设置格式
    const excelBuffer: any = write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    //这里类型如果不正确，下载出来的可能是类似xml文件的东西或者是类似二进制的东西等
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  //生成文件
  private saveAsExcelFile(buffer: any, fileName: string) {
    //转成二进制流 这一步很重要
    const data: Blob = new Blob([buffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    });

    //保存文件，浏览器响应头自动下载
    saveAs(data, fileName + ".xlsx");
  }
}

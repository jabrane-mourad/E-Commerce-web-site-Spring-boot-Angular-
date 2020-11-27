import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Country} from "../common/country";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class MonthsYearsService {

  constructor(private httpClient: HttpClient) {
  }

  getMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }
    return of(data);
  }

  getYears(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let year = startYear; year <= endYear; year++) {
      data.push(year);
    }
    return of(data);
  }


  getCounties(): Observable<Country[]> {
    const baseUrl = "https://restcountries.eu/rest/v2/all?fields=name;capital";
    return this.httpClient.get<Country[]>(baseUrl);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CONSTANT from '../../core/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {

  constructor(private http: HttpClient) { }

  getMarketData(startDate: string) {
    return this.http.get(`${CONSTANT.API_CONST.GET_DATA}?start_date=${startDate}`);
  }
}

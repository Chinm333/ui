import { Component, OnInit } from '@angular/core';
import { MarketDataService } from '../service/market-data.service';
@Component({
  selector: 'app-market-data',
  templateUrl: './market-data.component.html',
  styleUrls: ['./market-data.component.scss']
})
export class MarketDataComponent {
  marketData: any;
  currentData: any[] = [];
  itemsPerPage: number = 7;
  currentPage: number = 0;
  startDate: string = '';
  data:any;

  constructor(
    private marketDataService: MarketDataService
  ) { }

  ngOnInit() {
    this.fetchMarketData();
  }

  fetchMarketData() {
    this.marketDataService.getMarketData(this.startDate).subscribe((response:any) => {
      this.data = response;
      const res = response.data;
      this.marketData = res;
      this.currentData = this.marketData.slice(this.currentPage, this.currentPage + this.itemsPerPage); // Move slicing here
    });
  }

  prevWeek() {
    if (this.currentPage > 0) {
      this.currentPage -= this.itemsPerPage;
      this.currentData = this.marketData.slice(this.currentPage, this.currentPage + this.itemsPerPage);
    }
  }

  nextWeek() {
    if (this.currentPage < this.marketData.length - this.itemsPerPage) {
      this.currentPage += this.itemsPerPage;
      this.currentData = this.marketData.slice(this.currentPage, this.currentPage + this.itemsPerPage);
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}

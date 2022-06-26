import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArweaveService {
  constructor(private http: HttpClient) {}

  async solAmountForSpace(bytes: number): Promise<number> {
    const winston = await this.winstonAmountForSpace(bytes);
    const arPrice = await this.getTokenPrice('arweave');
    const solPrice = await this.getTokenPrice('solana');
    const arAmount = winston / Math.pow(10, 12);
    return arAmount * arPrice / solPrice;
  }

  private async winstonAmountForSpace(bytes: number): Promise<number> {
    const amount$ = this.http.get(`https://arweave.net/price/${bytes}`);
    return Number(await lastValueFrom(amount$));
  }

  private async getTokenPrice(token: string): Promise<number> {
    const price$ = this.http.get(`https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`);
    const price = await lastValueFrom<any>(price$)
    return price[token].usd;
  }
}

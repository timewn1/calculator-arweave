import { Injectable } from '@angular/core';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  account = '';

  private account$ = new BehaviorSubject<string>(this.account);

  get accountChanged(): Observable<string> {
    return this.account$.asObservable();
  }

  constructor() {
    this.account$.subscribe(account => {
      this.account = account;
    });
  }

  connect() {
    const provider = this.getProvider();
    if (provider) {
      provider.connect().then((wallet: any) => {
        this.account$.next(wallet.publicKey);
      })
    }
  }

  disconnect() {
    this.getProvider().disconnect();
    this.account$.next('');
  }

  getProvider() {
    if ('solana' in window) {
      const provider = (window as any).solana;
      if (provider.isPhantom) {
        return provider;
      }
    }
    window.open('https://phantom.app/', '_blank');
  }

  getBalance(account: string): Promise<number> {
    const provider = this.getProvider();
    const connection = new Connection(clusterApiUrl(environment.cluster as any));
    const wallet = new PublicKey(account);
    return connection.getBalance(wallet)
  }
}

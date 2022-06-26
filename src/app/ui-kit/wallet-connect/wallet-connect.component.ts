import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';

import { Web3Service } from '../../core/services/web3.service';

@Component({
  selector: 'app-wallet-connect',
  templateUrl: './wallet-connect.component.html',
  styleUrls: ['./wallet-connect.component.css'],
})
export class WalletConnectComponent implements OnInit, OnDestroy {
  account = this.web3Service.account;
  private subs = new SubSink();

  constructor(private web3Service: Web3Service) {}

  ngOnInit(): void {
    this.subs.sink = this.web3Service.accountChanged.subscribe((account) => {
      this.account = account;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  handleConnect() {
    if (this.web3Service.getProvider()) {
      if (this.account) {
        this.web3Service.disconnect();
      } else {
        this.web3Service.connect();
      }
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';

import { Web3Service } from '../core/services/web3.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account = this.web3Service.account;
  hasProvider = this.web3Service.getProvider();
  balance = 0;

  private subs = new SubSink();

  constructor(private web3Service: Web3Service) {}

  ngOnInit(): void {
    this.subs.sink = this.web3Service.accountChanged.subscribe((account) => {
      this.account = account;
      this.web3Service.getBalance(account).then((balance) => {
        this.balance = balance;
      });
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

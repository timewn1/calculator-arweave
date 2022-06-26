import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'arweave-calculator';

  connectWallet(): void {
    (window as any).solana.connect();
  }
}

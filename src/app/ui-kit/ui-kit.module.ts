import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletConnectComponent } from './wallet-connect/wallet-connect.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [WalletConnectComponent, FileUploaderComponent],
  exports: [WalletConnectComponent, FileUploaderComponent],
  imports: [CommonModule, NgxUploaderModule, MatCardModule, MatButtonModule, MatIconModule],
})
export class UiKitModule {}

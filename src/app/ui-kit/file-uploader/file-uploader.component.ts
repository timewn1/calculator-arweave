import { Component, OnInit } from '@angular/core';
import { UploadOutput } from 'ngx-uploader';
import { UploadFile } from 'ngx-uploader/lib/interfaces';

import { ArweaveService } from '../../core/services/arweave.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent implements OnInit {
  options = { concurrency: 1, maxUploads: 50, allowedContentTypes: ['image/jpeg', 'image/png'] };

  files: UploadFile[] = [];
  size: number = 0;
  cost: number = 0;

  isLoading = false;

  constructor(private arweaveService: ArweaveService) {}

  ngOnInit(): void {}

  handleUpload(output: UploadOutput): void {
    if (output.type === 'addedToQueue' && output.file) {
      this.files.push(output.file);
      this.calculateFileSize();
    }
  }

  private async calculateFileSize() {
    let sum = 0;
    this.files.forEach((file) => (sum += file.size));
    this.size = sum;
    try {
      this.isLoading = true;
      this.cost = await this.arweaveService.solAmountForSpace(this.size);
    } catch (e) {
      alert('Failed to calculate!');
    } finally {
      this.isLoading = false;
    }
  }
}

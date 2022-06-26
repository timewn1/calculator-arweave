import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { UiKitModule } from '../ui-kit/ui-kit.module';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, UiKitModule, MatToolbarModule],
  exports: [NavbarComponent],
})
export class SharedModule {}

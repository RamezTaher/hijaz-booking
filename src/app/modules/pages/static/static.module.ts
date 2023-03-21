import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { StaticRoutingModule } from './static-routing.module';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, SharedModule, StaticRoutingModule],
})
export class StaticModule {}

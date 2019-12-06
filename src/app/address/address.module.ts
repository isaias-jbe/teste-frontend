import { NgModule } from '@angular/core';

import { AddressComponent } from './components/address/address.component';
import { AddressRoutingModule } from './address-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AddressComponent],
  exports: [AddressComponent],
  imports: [SharedModule, AddressRoutingModule]
})
export class AddressModule {}

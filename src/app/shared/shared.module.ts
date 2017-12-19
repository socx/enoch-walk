import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './directives/dropdown/dropdown.directive';
import { DropdownNotClosableZoneDirective } from './directives/dropdown/dropdown-not-closable-zone.directive';
import { DropdownOpenDirective } from './directives/dropdown/dropdown-open.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DropdownDirective,
    DropdownNotClosableZoneDirective,
    DropdownOpenDirective
  ],
  exports: [
    DropdownDirective,
    DropdownNotClosableZoneDirective,
    DropdownOpenDirective
  ]
})
export class SharedModule { }

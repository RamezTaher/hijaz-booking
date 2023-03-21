import {
  Component,
  EventEmitter,
  forwardRef,
  OnInit,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomSelectComponent } from '../custom-select/custom-select.component';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true,
    },
  ],
})
export class PhoneInputComponent implements OnInit {
  isI18nPickerOpen: boolean = false;

  phoneNumber: string = '';
  i18nNumber: string = '+216';
  fullNumber: string = '';
  @Output() onInput = new EventEmitter();

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

  ngOnInit(): void {}
  clickOutside(): void {
    this.isI18nPickerOpen = false;
  }

  onSelectI18n(item: string) {
    this.i18nNumber = item;
  }
  onInputNumber() {
    this.onInput.emit(this.i18nNumber + this.phoneNumber);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  writeValue(value: string): void {
    this.fullNumber = value;
  }
}

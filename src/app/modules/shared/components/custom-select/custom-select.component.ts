import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent implements OnInit {
  isSelectPickerOpen: boolean = false;
  @Input() data: any = [];
  @Input() config: any = { valueField: '', placeholder: '' };
  selectedData: string = '';
  @Output() onSelect = new EventEmitter();

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

  ngOnInit(): void {}
  clickOutside() {
    this.isSelectPickerOpen = false;
  }
  onSelectClick(item: any): void {
    this.selectedData = item;
    this.onSelect.emit(item);
    this.isSelectPickerOpen = false;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  writeValue(value: string): void {
    this.selectedData = value;
  }
}

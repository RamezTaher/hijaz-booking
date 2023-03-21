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
  selector: 'app-custom-select-search',
  templateUrl: './custom-select-search.component.html',
  styleUrls: ['./custom-select-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectSearchComponent),
      multi: true,
    },
  ],
})
export class CustomSelectSearchComponent implements OnInit {
  @Output() onSelectItem = new EventEmitter<any>();
  isItemPickerOpen: boolean = false;
  @Input() items: any[] = [];
  @Input() filteredItems: any[] = [];
  @Input() config = { valueField: '' };
  selectedItem: any = null;

  onChange: any = () => {};
  onTouched: any = () => {};
  constructor() {}

  ngOnInit(): void {}

  toggleItemPicker(): void {
    this.isItemPickerOpen = true;
  }
  clickOutside(): void {
    this.isItemPickerOpen = false;
  }
  onCheckItem(item: any): void {
    this.selectedItem = item;
    this.onSelectItem.emit(item);
    this.isItemPickerOpen = false;
  }
  onInputSearch($event: Event): void {
    const q = ($event?.target as HTMLInputElement).value;
    const regexp = new RegExp(`^${q}`, 'gi');
    this.filteredItems = this.items.filter((el) => {
      return regexp.test(el[this.config.valueField]);
    });
  }
  writeValue(value: number): void {
    this.selectedItem = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

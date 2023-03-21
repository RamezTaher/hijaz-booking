import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Endpoints } from 'sharedConstants';
import { HttpClient } from '@angular/common/http';
import { BaseGetService, StorageService } from 'sharedServices';

@Component({
  selector: 'app-destination-picker',
  templateUrl: './destination-picker.component.html',
  styleUrls: ['./destination-picker.component.scss'],
})
export class DestinationPickerComponent implements OnInit {
  isLocationPickerOpen: boolean = false;
  @Input() location: any = { text: '', value: '' };

  @Input() value?: number;

  @Output() locationChange = new EventEmitter<any>();
  direction: string | null = '';
  citiesService: BaseGetService;
  directions: any[] = [];
  selectedItem = { text: '', value: 0 };
  city: any;

  constructor(
    private httpClient: HttpClient,
    public storageService: StorageService
  ) {
    this.citiesService = new BaseGetService(httpClient);
  }

  ngOnInit(): void {
    this.citiesService.get(Endpoints.cities_get);
    this.citiesService.state$.subscribe((x) => {
      if (!x.empty && x.data && x.data.length > 0) {
        this.directions = x.data?.map(
          (element: { NameAr: any; Name: any; Id: any }) => {
            return {
              text: element.NameAr ?? element.Name,
              value: element.Id,
            };
          }
        );
        if (this.city && this.city != '0') {
          this.selectedItem = this.directions.filter(
            (x: { [x: string]: any }) => x['value'] == this.city
          )[0];
        }
      }
    });
  }

  toggleLocationPicker(): void {
    this.isLocationPickerOpen = !this.isLocationPickerOpen;
  }

  handleChange(item: { text: string; value: number }) {
    this.isLocationPickerOpen = false;
    this.selectedItem = item;
    this.locationChange.emit(item);
  }

  clickOutside(): void {
    this.isLocationPickerOpen = false;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.citiesService.destroy();
  }
}

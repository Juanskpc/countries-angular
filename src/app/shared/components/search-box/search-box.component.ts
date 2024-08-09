import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  @Output()
  onValue = new EventEmitter<string>();

  @ViewChild('txtSearch') txtSearch!: string;

  enterPress(value: string):void {
    this.onValue.emit(value);
  }

}

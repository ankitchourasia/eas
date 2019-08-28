import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'eas-modal-backdrop',
  template: '',
  host: {'[class]': '"modal-backdrop fade show" + (backdropClass ? " " + backdropClass : "")', 'style': 'z-index: 1050'}
})
export class ModalBackdropComponent implements OnInit {

  @Input() backdropClass: string;
  
  constructor() { }

  ngOnInit() {
  }

}

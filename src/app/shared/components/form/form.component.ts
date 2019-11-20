import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor() { }

  @Input() formGroup: FormGroup;
  @Output() formSubmit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  ngOnInit() {

  }

  public onSubmit(event) {
    event.preventDefault();
    this.formSubmit.emit(this.formGroup);
  }
}

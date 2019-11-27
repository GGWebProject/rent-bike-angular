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
  @Output() formSubmit: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {

  }

  public onSubmit(event) {
    event.preventDefault();
    this.formSubmit.emit();
  }
}

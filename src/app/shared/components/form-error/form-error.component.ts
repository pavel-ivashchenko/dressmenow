
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html'
})
export class FormErrorComponent implements OnInit {

  @Input() control: FormControl | FormGroup;
  @Input() showOnly: string;

  public nativeFormErrors: { [key: string]: string } = {
    required: 'Будь ласка, заповніть це поле',
    email: 'Будь ласка, введіть корректний email'
  };
  
  constructor() { }

  ngOnInit() { }

}

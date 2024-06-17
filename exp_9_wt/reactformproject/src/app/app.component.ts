import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  frm=new FormGroup({
    firstname:new FormControl('',[Validators.required]),
    lastname:new FormControl('',[Validators.required,Validators.maxLength(8)]),
    gender:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/)]),
    city:new FormControl('',[Validators.required]),
    isverified:new FormControl('',[Validators.required])
  });
  submitted: true | undefined;
  title: any;

  onSubmit(): void {
    this.submitted = true;
    if (this.frm.valid) {
        console.log("Form Submitted", this.frm.value);
    }
}
}

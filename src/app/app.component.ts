import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
  });

  submit(): void {
    if (this.myForm.invalid) {
      alert('Oops your form is invalid!');
      return;
    }

    // Do something with the values
    console.log('EMAIL: ', this.myForm.get('email')?.value);
    console.log('FIRST NAME: ', this.myForm.get('firstName')?.value);
    console.log('LAST NAME: ', this.myForm.get('lastName')?.value);
    alert('Thanks!');
  }
}

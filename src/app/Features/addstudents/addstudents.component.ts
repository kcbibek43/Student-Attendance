import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { httpService } from '../../Shared/SERVICES/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addstudents',
  templateUrl: './addstudents.component.html',
  styleUrls: ['./addstudents.component.scss'],
})
export class AddstudentsComponent implements OnInit {
  userForm: FormGroup | undefined;
  isLoading = true;

  constructor(
    private route: Router,
    private student: FormBuilder,
    private httpService: httpService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.userForm = this.student.group({
      sId: [
        '',
        [Validators.required, Validators.maxLength(3), Validators.minLength(3),Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(3),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)
        ],
      ],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  addStudentData(){
    if (this.userForm?.valid) {

      this.httpService.addStudent(this.userForm!.value).subscribe(()=>{
          this.route.navigate(['/', 'dashboard']);
      });
    }
  }

  openSnackBar(){
    this._snackBar.open('New Student Added!!', 'X', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000
    });
  }
}



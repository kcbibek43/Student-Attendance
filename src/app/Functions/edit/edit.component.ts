import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { currentStdentService } from 'src/app/Shared/SERVICES/currentStdent.service';
import { httpService } from 'src/app/Shared/SERVICES/http.service';
import { Student } from 'src/app/Shared/model/student-details';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  studentDetail: Student | undefined;
  userForm: FormGroup | undefined;

  ngOnInit() {
    this.studentDetail = this.currentStudent.student;
    this.userForm = new FormGroup({
      sId: new FormControl(this.studentDetail?.sId, [
        Validators.required,
        Validators.maxLength(3),
        Validators.minLength(3),
      ]),
      name: new FormControl(this.studentDetail?.name, [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(4),
      ]),
      phone: new FormControl(this.studentDetail?.phone, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      gender: new FormControl(this.studentDetail?.gender, [
        Validators.required,
        Validators.nullValidator,
      ]),
      email: new FormControl(this.studentDetail?.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private httpServices: httpService,
    private currentStudent: currentStdentService
  ) {}

  updateStudentDetails() {
    if (this.userForm?.valid) {
      this.studentDetail = { ...this.studentDetail, ...this.userForm.value };
      this.httpServices
        .updateStudentDetails(this.studentDetail!)
        .subscribe(() => {
          this.route.navigate(['/', 'dashboard']);
        });
    }
  }
}

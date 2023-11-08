import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { httpService } from '../../Shared/SERVICES/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from '../../Shared/model/student-details';
import {
  Attendance,
  StudentAttendance,
} from '../../Shared/model/student-attendence-details';

@Component({
  selector: 'app-markattendance',
  templateUrl: './markattendance.component.html',
  styleUrls: ['./markattendance.component.scss'],
})
export class MarkattendanceComponent implements OnInit {
  attendanceForm: FormGroup | undefined;
  students: Array<Student> = [];
  studentName: string = '';
  allStudentAttendenceDetails: Array<StudentAttendance> = [];
  idx: number = -2;
  studentId: string = "";

  constructor(
    private route: Router,
    private userForm: FormBuilder,
    private httpService: httpService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.httpService.getAllStudentDetails().subscribe((data) => {
      this.students = data;
    });
    this.attendanceForm = this.userForm.group({
      sId: [
        'this.studentId',
        [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
      ],
      name: [this.studentName],
      date: [''],
      status: ['', Validators.required],
    });
  }

  updateAttendance() {
    const attendence: Attendance = {
      date: this.attendanceForm?.value.date,
      status: this.attendanceForm?.value.status,
    };
    var listOfAttendence: Array<Attendance> = [];
    this.httpService.getAllStudentAttedenceDetails().subscribe((data) => {
      this.allStudentAttendenceDetails = data;
      this.idx = this.allStudentAttendenceDetails.findIndex(
        (data) => data.sId === this.attendanceForm?.value.sId
      );
      if (this.idx === -1) {
        listOfAttendence.push(attendence);
        const studentAttendence: StudentAttendance = {
          sId: this.attendanceForm?.value.sId,
          name: this.studentName,
          attendenceStatus: listOfAttendence,
        };
        this.httpService.markAttendence(studentAttendence);
        this.route.navigate(['/', 'dashboard']);
        this.openSnackBar();
      } else {
        listOfAttendence =
          this.allStudentAttendenceDetails[this.idx].attendenceStatus;
        listOfAttendence.push(attendence);
        const id = this.allStudentAttendenceDetails[this.idx].id;
        const studentAttendence: StudentAttendance = {
          sId: this.attendanceForm?.value.sId,
          name: this.studentName,
          attendenceStatus: listOfAttendence,
        };
        this.httpService
          .updateStudentAttendenceDetails(studentAttendence,id!)
          .subscribe(() => {
            this.route.navigate(['/', 'dashboard']);
            this.openSnackBar();
          });
      }
    });
  }
 
  openSnackBar() {
    this._snackBar.open('Attendence Updated!!', 'X', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  getStudentName(id: string) {
    const idx = this.students.findIndex((data) => data.sId === id);
    this.studentName = this.students[idx].name;
  }

}

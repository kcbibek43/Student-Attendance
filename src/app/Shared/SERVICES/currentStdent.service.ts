import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Student} from '../model/student-details'
import { StudentAttendance } from '../model/student-attendence-details';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class currentStdentService {
    student : Student = {
        id:'',
        sId: '',
        name: '',
        email: '',
        phone: 0,
        gender: ''
    }
    updateCurrentDetails(student : Student){
        this.student = student;
    }
}

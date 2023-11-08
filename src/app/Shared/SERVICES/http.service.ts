import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Student} from '../model/student-details'
import { StudentAttendance } from '../model/student-attendence-details';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class httpService {
  changesMade : boolean = false;
  constructor(private http:HttpClient){}

  addStudent(student:Student){
    return this.http.post('https://student-management-4c9f6-default-rtdb.firebaseio.com/studentDetails.json',student);
  }

  getAllStudentDetails() : Observable<Array<Student>>{
    return this.http.get<Array<Student>>('https://student-management-4c9f6-default-rtdb.firebaseio.com/studentDetails.json').pipe(
      map((data) => {
        const dummy = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
             dummy.push({...data[key],id:key});
          }
        }
        return dummy;
      })
    );
  }

   updateStudentDetails(student : Student){
     return this.http.put('https://student-management-4c9f6-default-rtdb.firebaseio.com/studentDetails/' + student.id + '.json', student);
    
  }

  deleteCurrentStudent(student : Student){
   return this.http.delete('https://student-management-4c9f6-default-rtdb.firebaseio.com/studentDetails/' + student.id + '.json');
  }



  markAttendence(student : StudentAttendance){
    return this.http.post('https://student-management-4c9f6-default-rtdb.firebaseio.com/studentAttendence.json',student).subscribe();
  }
  

  getAllStudentAttedenceDetails() : Observable<Array<StudentAttendance>>{
    return this.http.get<Array<StudentAttendance>>('https://student-management-4c9f6-default-rtdb.firebaseio.com/studentAttendence.json').pipe(
      map((data) => {
        const dummy = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
             dummy.push({...data[key],id:key});
          }
        }
        return dummy;
      })
    );
  }


  updateStudentAttendenceDetails(student : StudentAttendance,id :string){
    return this.http.put('https://student-management-4c9f6-default-rtdb.firebaseio.com/studentAttendence/' + id + '.json', student);
 }


}

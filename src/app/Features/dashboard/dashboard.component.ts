import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Student } from '../../Shared/model/student-details';
import { httpService } from '../../Shared/SERVICES/http.service';
import { currentStdentService } from '../../Shared/SERVICES/currentStdent.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { computeStyles } from '@popperjs/core';

export interface dailogDecision {
  flag: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  pageIndex: number = 0;
  pageSize: number = 10;
  studentInfo: Array<Student> = [];
  allStudentDetails : Array<Student> = [];
  isLoading = true;
  dataSource = new MatTableDataSource<Student>(this.studentInfo);
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'contact',
    'gender',
    'action',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private currentStudent: currentStdentService,
    private httpService: httpService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.studentInfo);
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  fetchData(){
    this.httpService.getAllStudentDetails().subscribe((data) => {
      this.studentInfo = data;
      this.allStudentDetails = this.studentInfo;
      this.dataSource = new MatTableDataSource(this.studentInfo);
      this.isLoading = false;
    });
  }
  ngOnInit() {
    this.fetchData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    if(filterValue===""){
      this.studentInfo = this.allStudentDetails;
    }
    else{
      this.studentInfo = this.allStudentDetails.filter((element) => element.name.trim().toLowerCase().includes(filterValue.toLowerCase()));
    }
  }

  updateCurrentStudent(student: Student) {
    this.currentStudent.updateCurrentDetails(student);
    this.fetchData();
  }

  deleteCurrentStudent(student: Student) {
    this.openDialog('100ms', '100ms', student);
  }

  deleteAfterConfirm(student: Student) {
    this.isLoading = true;
    this.httpService.deleteCurrentStudent(student).subscribe(() => {
      this.fetchData();
      this.isLoading = false;
    });
    this.openSnackBar(student.sId);
  }

  openSnackBar(id: string) {
    this._snackBar.open(`Deleted student ${id} details`, 'X', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    student: Student
  ): void {
    const dialogRef = this.dialog.open(DialogDelete, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.deleteAfterConfirm(student);
      }
    });
  }

  onPageChange(change: PageEvent) {
    this.pageIndex = change.pageIndex;
    this.pageSize = change.pageSize;
  }
  sortByValue(event : string){
    if(event==="1"){
      this.studentInfo.sort((a: Student, b: Student) => a.sId.toLowerCase() < b.sId.toLowerCase() ? -1 : 1);
    }
    else if(event==="2"){
      this.studentInfo.sort((a: Student, b: Student) => a.sId.toLowerCase() > b.sId.toLowerCase() ? -1 : 1);
    }
    else if(event==="3"){
      this.studentInfo.sort((a: Student, b: Student) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
    }
    else if(event ==="4"){
      this.studentInfo.sort((a: Student, b: Student) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1);
    }
  }
}

@Component({
  selector: 'dialog-delete',
  templateUrl: './dialog-delete.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogDelete {
  res: string = 'yes';
  constructor(public dialogRef: MatDialogRef<DialogDelete>) {}
  onYesClick() {}
  onNoClick() {
    this.dialogRef.close();
  }
}

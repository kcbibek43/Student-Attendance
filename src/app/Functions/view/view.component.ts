import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { httpService } from 'src/app/Shared/SERVICES/http.service';
import {
  Attendance,
} from 'src/app/Shared/model/student-attendence-details';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {

  displayedColumns: string[] = ['Date', 'Status'];
  clickedRows = new Set<Attendance>();
  studentName : string = "";
  isLoading = true;
  dataAvailable = true;
  id: string = '';
  attedenceDetails: Array<Attendance> = [];
  dataSource: Array<Attendance> = [];
  constructor(
    private httpService: httpService,
    private axctivatedRoute: ActivatedRoute
  ) {}
  paramMaps: ParamMap | undefined;
  ngOnInit() {
    this.axctivatedRoute.paramMap.subscribe((paramMaps: ParamMap) => {
      this.id = paramMaps.get('id')!;
    });

    this.httpService.getAllStudentAttedenceDetails().subscribe((data) => {
      const idx = data.findIndex((student) => student.sId === this.id);
      if (idx === -1) {
        this.dataAvailable = false;
      } else {
        data[idx].attendenceStatus.forEach(element => {
          element.date = element.date ;
        });
        this.dataSource = data[idx].attendenceStatus;
        this.studentName = data[idx].name;

      }
      this.isLoading = false;
    });
  }
}

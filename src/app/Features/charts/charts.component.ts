import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, Color} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { httpService } from 'src/app/Shared/SERVICES/http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  dateDetails = new Map<Date, number>();
  dateLabel : Array<string> = [];
  dataLabel : Array<number> = [];
  isLoading : boolean = true;

  constructor(private httpService : httpService,private datePipe : DatePipe){}
  
  ngOnInit(): void {
    this.httpService.getAllStudentAttedenceDetails().subscribe((data)=>{
      data.forEach(element => {
        element.attendenceStatus.forEach(element => {
          if(this.dateDetails.has(element.date)){
            var cnt = this.dateDetails.get(element.date)!+1;
            this.dateDetails.set(element.date,cnt);
          }
          else{
            this.dateDetails.set(element.date,1);
          }
        });
      });
      const sortedDetails = new Map([...this.dateDetails].sort());
      sortedDetails.forEach((value,key) =>{
        const date = this.datePipe.transform(key,"dd/MM/yyyy")
        this.dateLabel.push(date!);
        this.dataLabel.push(value);
    });
    this.isLoading = false;
    })
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
        max: 15,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];
  public barChartData: ChartData<'bar'> = {
    labels: this.dateLabel,
    datasets: [{ data: this.dataLabel, label: 'Student Attendence', backgroundColor :'rgba(54, 162, 235, 0.2)',borderColor:'rgb(54, 162, 235)',borderWidth: 2}],
  };
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }
}

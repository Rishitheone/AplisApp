import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SeriesFormComponent } from './series-form/series-form.component';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SeriesService } from 'src/app/shared/series.service';
import { DatumSeries, saveSeries } from 'src/app/shared/all.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { SeriesUpdateComponent } from './series-update/series-update.component';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  dataSource: DatumSeries[] = []
  isLoading = true;
  constructor(public dialog: MatDialog, private _router: Router, private toastr: ToastrService,
    public service: SeriesService, private fb: FormBuilder, ) { }

  onDelete(id: any) {
    this.deleteSeries(id.id);
  }

  openDialog() {

    let dialogRef = this.dialog.open(SeriesFormComponent, {
      width: '80%',
      autoFocus: true,
      disableClose: true,
    });
    //method run after dialog is close  
    dialogRef.afterClosed().subscribe(result => {
      this.service.getAllSeries().subscribe(
        data => this.dataSource = data.data,
        err => console.log(err));
    });
  };
  editSeries(series:DatumSeries){
    const index = this.dataSource.findIndex(c=>c.id === series.id);
    this.dataSource[index] = series;
  }
  getEditAll(){
    return this.dataSource;
  }

  onEdit(id:number) {
  const seriesAll = this.getEditAll().find(c => c.id === id);
    let dialogRef = this.dialog.open(SeriesUpdateComponent, {
      width: '80%',
      autoFocus: true,
      disableClose: true,
      data:seriesAll,
    });
    //method run after dialog is close  
    dialogRef.afterClosed().subscribe(result => {
      this.service.getAllSeries().subscribe(
        data => this.dataSource = data.data,
        err => console.log(err))
    });
  }



  ngOnInit() {
    this.service.getAllSeries()
      .subscribe(
        data => {
          this.isLoading = false,
            this.dataSource = data.data
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }

  deleteSeries(id: number) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteSeries(id)
        .subscribe(
          res => {
            this.toastr.warning('Deleted successfully', 'Payment Detail Register');
            this.service.getAllSeries()
              .subscribe(
                data => {
                  this.dataSource = data.data
                },
                err => console.log(err)
              )
          },
          err => {
            console.log(err);
          }
        )
    }
  }

}

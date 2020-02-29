import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators, FormGroup } from '@angular/forms';
import { SeriesService } from 'src/app/shared/series.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-series-form',
  templateUrl: './series-form.component.html',
  styleUrls: ['./series-form.component.scss']
})
export class SeriesFormComponent implements OnInit {

  form:FormGroup;
  constructor(private fb: FormBuilder, public service: SeriesService, private toastr: ToastrService,
    public dialogRef: MatDialogRef<SeriesFormComponent>) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['',Validators.required],
      series_code: ['',Validators.required],
      description: ['',Validators.required],
      status: ['published'],
    });
  }

 

  onSubmit(form) {
    if(!this.form.valid){
      return;
    }
    this.service.saveSeries(form.value).subscribe(
      res => {
        this.toastr.success('Inserted successfully', 'Series Register');
        form.reset();
        console.log(res); 
          this.dialogRef.close();
      },
        err => {
          console.log(err)
        }
      );
  }

}
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeriesService } from 'src/app/shared/series.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeriesFormComponent } from '../series-form/series-form.component';

@Component({
  selector: 'app-series-update',
  templateUrl: './series-update.component.html',
  styleUrls: ['./series-update.component.scss']
})
export class SeriesUpdateComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, public service: SeriesService, private toastr: ToastrService,
    public dialogRef: MatDialogRef<SeriesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.data.title, Validators.required],
      series_code: [this.data.series_code, Validators.required],
      description: [this.data.description, Validators.required],
      status: [this.data.status],
      series_id:[this.data.id]
    });

  }

  onSubmit(form) {
    if (!this.form.valid) {
      return;
    }
    this.service.updateSeries(form.value).subscribe(
      res => {
        this.toastr.success('Inserted successfully', 'Series Updated');
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
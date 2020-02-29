import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookPageCreateService } from 'src/app/shared/book-page-create.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editor-edit',
  templateUrl: './editor-edit.component.html',
  styleUrls: ['./editor-edit.component.scss']
})
export class EditorEditComponent implements OnInit {
  // for html editon starting
  Editorform: FormGroup;
  selectValue: string;
  myForm: FormGroup;
  arr: FormArray;
  topic_id:number;
 
  config: any = {
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['style', ['style']],
      ['misc', ['codeview', 'undo', 'redo']],
      ['font', ['bold', 'italic', 'underline', 'clear']],
      // ['fontsize', ['fontname', 'fontsize']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
      ['customButtons', ['testBtn']]
    ],
  };


  // end point
  constructor(private fb: FormBuilder, private _route: ActivatedRoute,
     private service: BookPageCreateService, private toastr: ToastrService, 
     private route:Router) { }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this.Editorform = this.fb.group({
      book_id: [+id],
      page_name: [],
      heading: [],
      mime_type: [],
      sub_heading: [],
      image_url: [],
      html_content: [],
      status: ['published']
    });
  }

  onSubmit(user) {
    // if (!this.form.valid) {
    //   return;
    // }
    const data = JSON.stringify(this.Editorform.value);
    console.log(this.Editorform.value)
    console.log(data)
    this.service.createTopic(data)
      .subscribe(
        res => {
          this.topic_id = +res.data.id
          this.toastr.success('Submitted successfully', 'Topic has been submitted');
          // this.Editorform.reset();
          console.log(res);
          if(+res.data.id){
            this.myForm = this.fb.group({
              arr: this.fb.array([
                this.fb.group({
                  topic_id:+this.topic_id,
                  heading: [],
                  sub_heading: [],
                  mime_type: [],
                  image_url: [],
                  html_content: [],
                  status: ['published']
                })
              ])
            })
          }
        },
        err => console.log(err)
      )

     
     
  }

  addItem() {
    this.arr = this.myForm.get('arr') as FormArray;
    this.arr.push(
      this.fb.group({
        topic_id:+this.topic_id,
        heading: [],
        sub_heading: [],
        mime_type: [],
        image_url: [],
        html_content: [],
        status: ['published']
      })
      );
  }

  onClick() {
    const  id = +this._route.snapshot.paramMap.get('id');
    console.log(id)
    const data = JSON.stringify(this.myForm.value.arr);
    console.log(this.myForm.value)
    console.log(data)
    this.service.createSubTopic(data)
      .subscribe(
        res => {
          this.toastr.success('Submitted successfully', 'Topic has been submitted');
          console.log(res);
          if (res.status === 1) {
            this.route.navigate(['home/book/edit/',id])
            this.service.setData(id);
          } else {
            return;
          }
        },
        err => console.log(err)
      )
  }

}

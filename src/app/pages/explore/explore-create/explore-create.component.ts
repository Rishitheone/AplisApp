import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SeriesService } from 'src/app/shared/series.service';
import { Datum } from '../../home/home.component';
import { BookService } from 'src/app/shared/book.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageUploadService } from 'src/app/shared/image-upload.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ExploreBrowseService } from 'src/app/shared/explore-browse.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-explore-create',
  templateUrl: './explore-create.component.html',
  styleUrls: ['./explore-create.component.scss']
})
export class ExploreCreateComponent implements OnInit {
 
  ARurl:string;
  pageTitle: string;
  percentDone: number;
  uploadSuccess: boolean;
  toppingList: Datum[] = [];
  selectValue: string;
  imgtype: string;
  
  fileUploads = { status: '', message: '', filePath: '' };
  // editorConfig = {
  //   "minHeight": "400",
  // };
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
  
  form: FormGroup;
  books = [];
  formExpolre: FormGroup;
  constructor(
    private location: Location, private seriesService: BookService,
    private fb: FormBuilder, private imageUpload: ImageUploadService,
    private explore: ExploreBrowseService,
    private _http: HttpClient, private toastr: ToastrService, private route: Router,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.fb.group({
      file: [''],
    })

    //update form
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Update Discover';
      this.explore.getExploreById(+id).subscribe(
        res => {
          const array1 = res.data["books"];
          var test2: any = [];
          array1.forEach(element => {
             test2.push(element.id);
          });
          this.formExpolre.patchValue({
            header_url: res.data["header_url"],
            discover_id: res.data["id"],
            ar_url: res.data["ar_url"],
            card_url: res.data["card_url"],
            mime_type: res.data["mime_type"],
            title: res.data["title"],
            title_description: res.data["title_description"],
            long_description: res.data["long_description"],
            status: res.data["status"],
            books: test2,
          });
        })
    } else {
      this.pageTitle = 'Create Book';
    }

    //submit Form
    this.formExpolre = this.fb.group({
      header_url: ['', Validators.required],
      ar_url: [''],
      discover_id: [null],
      card_url: [''],
      mime_type: ['', Validators.required],
      title: [''],
      title_description: [''],
      long_description: [''],
      status: ['published'],
      books: ['']
    })


    this.seriesService.getAllBook()
      .subscribe(
        data => this.toppingList = data.data,
        err => console.log(err)
      )

  }
  goBack(): void {
    this.location.back();
  }

  
  onARSelect(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        // this.pictureUrl = reader.result;
        this.form.get('file').setValue(file);
      }
    }

  }

  changeCity(e) {
    this.booksName.setValue(e.target.value, {
      onlySelf: true
    })
  }

  // Getter method to access formcontrols
  get booksName() {
    return this.formExpolre.get('books');
  }


  
  onSubmitAR() {
    const formData = new FormData();
    formData.append('file', this.form.get('file').value)
    this.imageUpload.uploadeAR(formData).subscribe(
      data => {
        // this.toastr.success('Submitted successfully', 'AR has been submitted');
        this.ARurl = data.data;
        this.fileUploads = data;
        console.log(data)
      },
      err => console.log(err)
    );
    console.log(this.form.value)
  }

  onSubmit(formExpolre) {
    const data = JSON.stringify(this.formExpolre.value);
    if (!this.formExpolre.valid) {
      return;
    }
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.explore.updateExplore(data).subscribe(
        res => {
          this.toastr.success('Submitted successfully', 'Explore has been Updated');
          this.formExpolre.reset();
          if (res.status === 1) {
            this.route.navigateByUrl('/home/Explore');
          } else {
            return;
          }
        },
        err => console.log(err)
      )
    } else {
      this.explore.uploadExplore(data).subscribe(
        res => {
          this.toastr.success('Submitted successfully', 'Explore has been submitted');
          this.formExpolre.reset();
          if (res.status === 1) {
            this.route.navigateByUrl('/home/Explore');
          } else {
            return;
          }
        },
        err => console.log(err)
      )
    }

  }

}




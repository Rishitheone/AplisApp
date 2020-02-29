import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-child',
  templateUrl: './category-child.component.html',
  styleUrls: ['./category-child.component.scss'],
})
export class CategoryChildComponent implements OnInit {
  form: FormGroup;
  //this is for dropdown value
  selectedFood2: string;
  pageTitle:string;
  // this is for fetch value for second dropdown
  public primary = [];
  public secondary = [];
  public higher = [];
  public SecondarySchool = [];
  public Friction = [];
  public NonFriction = [];
  public Comic = [];
  public EducationReference = [];
  public LiteraryCollections = [];
  public NonClassifiable = [];

  // 1st dropdown static value
  types = [
    { value: 'preschool', viewValue: 'Preschool' },
    { value: 'lower-middle-school', viewValue: 'Lower Middle School' },
    { value: 'upprer-middle-school', viewValue: 'Upprer Middle School' },
    { value: 'secondary-school', viewValue: 'Secondary School' },
    { value: 'friction', viewValue: 'Friction' },
    { value: 'non-friction', viewValue: 'Non-Friction' },
    { value: 'comic', viewValue: 'Comic' },
    { value: 'education-&-reference', viewValue: 'Education & Reference' },
    { value: 'literary-collections', viewValue: 'Literary Collections' },
    { value: 'non-classifiable', viewValue: 'Non Classifiable' },
  ];



  // for add keywords
  get tags() {
    return this.form.get('tags') as FormArray;
  }
  constructor(private service: CategoryService,
    private toastr: ToastrService, private fb: FormBuilder,
     private _http: CategoryService, private _router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Update Author Details';
      this.service.getCategoryById(+id).subscribe(
        res => {
          var test = res.data["tags"].split(',') 
          this.form.patchValue({
            status: res.data["status"],
            category_id: res.data["id"],
            name: res.data["name"],
            type: res.data["type"],
            description: res.data["description"],
            parent_category_id: res.data["parent_category_id"],
            tags: test,
          });
        }
      );
    } else {
      this.pageTitle = 'Create Author';
    }



    // form value
    this.form = this.fb.group({
      status: ['published', Validators.required],
      category_id:[null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      parent_category_id: [null],
      tags: this.fb.array([ //no
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
      ])
    });
    // value for primary dropdown
    this._http.getDropPrimary()
      .subscribe(data => this.primary = data.data,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        })

    // value for secondary dropdown
    this._http.getDropSecondary()
      .subscribe(data => this.secondary = data.data,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        })
    // value for Heigher dropdown
    this._http.getDropHigher()
      .subscribe(data => this.higher = data.data,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        })
    this._http.getSecondarySchool()
      .subscribe(
        data => this.SecondarySchool = data.data,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
    this._http.getFriction()
      .subscribe(
        data => this.Friction = data.data,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
    this._http.getNonFriction()
      .subscribe(
        data => this.NonFriction = data.data,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
    this._http.getComic()
      .subscribe(
        data => this.Comic = data.data,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
    this._http.getEducationReference()
      .subscribe(
        data => this.EducationReference = data.data,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
    this._http.getLiteraryCollections()
      .subscribe(
        data => this.LiteraryCollections = data.data,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
    this._http.getNonClassifiable()
      .subscribe(
        data => this.NonClassifiable = data.data,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }

  // For form submit
  onSubmit(user) {
    if (!this.form.valid) {
      return;
    }
    const data = JSON.stringify(this.form.value);
    this.service.updateBook(data)
      .subscribe(
        res => {
          this.toastr.success('Submitted successfully', 'Category has been Updated');
          this.form.reset();
          console.log(res);
          if (res.status === 1) {
            this._router.navigateByUrl('/home/category');
          } else {
            return;
          }
        },
        err => console.log(err)
      )
  }
}


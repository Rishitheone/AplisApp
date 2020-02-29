import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoryFormComponent } from './category-form/category-form.component';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/category.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoryChildComponent } from './category-child/category-child.component';
export interface NoNfIC{
  id:Number;
  parent_category_id:number;
  name:number;
  type:string;
  description:string;
  tags:string;
  status:string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public Primary = [];
  public Secondary = [];
  public Higher = [];
  public SecondarySchool = [];
  public Friction = [];
  public NonFriction = [];
  public Comic  = [];
  public EducationReference = [];
  public LiteraryCollections = [];
  public NonClassifiable = [];

  public AllSubCategory = [];
  isHidden = true;
  isLoading = true;

  public parent_category_id = '';
  constructor(public dialog: MatDialog, private service: UserService, private _allCategory: CategoryService,
    private _router: Router, private toastr: ToastrService) { }

  onSelect(selectedItem: any) {
    
    // this.parent_category_id = selectedItem.id;
    this.callSubCateApi(selectedItem.id);
    // console.log("Selected item Id: ", this.parent_category_id); // You get the Id of the selected item here

  }
  onDelete(id: any) {
    this.deleteCategory(id.id);

  }
  onDeleteSubCategory(id: any) {
    this.deleteSubCategory(id.id);

  }

  ngOnInit() {
    

  }
  populationForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    this.dialog.open(CategoryFormComponent, dialogConfig);
  }
  OnEditChild(category){
    this._router.navigate(['home/category/edit',category])
  }

  callSubCateApi(selectedItem) {
    this._allCategory.getAllSubCategory(selectedItem)
      .subscribe(
        data => {
          this.isLoading = false;
          this.AllSubCategory = data.data
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
  deleteCategory(id: number) {
    if (confirm('Are you sure to delete this record ?')) {
    this._allCategory.deleteCategory(id)
      .subscribe(
        res => {
          this.toastr.warning('Deleted category', 'Category Deleted');
          console.log(res)
        },
        err => console.log(err)
      )
    }
  }
  deleteSubCategory(id: number) {
    if (confirm('Are you sure to delete this record ?')) {
      this._allCategory.deleteSubCategory(id)
        .subscribe(
          res => {
            this._allCategory.getAllSubCategory(id)
              .subscribe(
                data => {
                  this.toastr.warning('SubCategory deleted successfully', 'SubCategory deleted');
                  this.AllSubCategory = data.data
                }
              )
            console.log(res)
          },
          err => console.log(err)
        )
    }
  }

  onClassifiable(){
    this._allCategory.getNonClassifiable()
    .subscribe(
      data => {
        this.isLoading = false;
        this.NonClassifiable = data.data;
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

  onCollections(){
    this._allCategory.getLiteraryCollections()
    .subscribe(
      data => {
        this.isLoading = false;
        this.LiteraryCollections = data.data;
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

  onReference(){
    this._allCategory.getEducationReference()
    .subscribe(
      data =>{
        this.isLoading = false;
        this.EducationReference = data.data;
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

  onComic(){
    this._allCategory.getComic()
    .subscribe(
      data => {
        this.isLoading = false;
        this.Comic = data.data;
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

  onNonFriction(){
    this._allCategory.getNonFriction()
      .subscribe(
        data => {
          this.isLoading = false;
          this.NonFriction = data.data;
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

  onFriction(){
    this._allCategory.getFriction()
      .subscribe(
        data => { 
          this.isLoading = false;
          this.Friction = data.data;
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

  onSecondary(){
    this._allCategory.getSecondarySchool()
    .subscribe(
      data => {
        this.isLoading = false;
        this.SecondarySchool = data.data;
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

  onUpprer(){
    this._allCategory.getDropHigher()
    .subscribe(
      data => {
        this.isLoading = false;
        this.Higher = data.data;
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

  onLower(){
    this._allCategory.getDropSecondary()
      .subscribe(
        data => {
          this.isLoading = false;
          this.Secondary = data.data;
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

  onPreschool(){
    this._allCategory.getDropPrimary()
    .subscribe(
      data =>{
        this.isLoading = false;
        this.Primary = data.data;
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
}

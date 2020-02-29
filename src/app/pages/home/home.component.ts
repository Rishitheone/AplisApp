import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { OrderPipe } from 'ngx-order-pipe';
export interface Datum {
  id: number;
  book_id: number;
  category_id: number;
  series_id: any;
  author_id: number;
  language: string;
  title: string;
  sub_title: any;
  description: string;
  min_age: number;
  max_age: number;
  book_cover: string;
  cover: any;
  status: string;
  isbn_code: string;
  tags: any;
  number_of_downloads: number;
  published_at: any;
  created_at: string;
  updated_at: string;
  template:number;
}

export interface RootObject {
  status: number;
  data: Datum[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  order: string = 'book.title'
  books:Datum[]=[];
  isLoading = true;
  short = ["Name","By Author","By Release Date"]
  searchText;
  p: number = 1;
  sortedCollection: any[];
  reverse: boolean = false;
  // fd:Datum[];
  constructor(private _allBook:BookService, private toastr: ToastrService,
    private router: Router,private userService:UserService,
    private orderPipe: OrderPipe) { 
    // this.fd = this._allBook.getData();
    this.sortedCollection = orderPipe.transform(this.books, 'book.title');
    // console.log(this.sortedCollection);
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
 

  ngOnInit() {
    this.userService.setTitle('Content');

    this._allBook.getAllBook()
    .subscribe(
      data=>{
        this.isLoading = false;
        this.books=data.data;
      },
      err=>console.log(err)
    )
  }

  onUpdate(id:number){
    this.router.navigate(['home/book/edit/',id])
      // this.fd.push(book);
      // this._allBook.setData(this.fd);
      // console.log(this.fd)
  }

  deleteAuthorList(id: number) {
    if (confirm('Are you sure to delete this record ?')) {
      this._allBook.deleteBook(+id)
        .subscribe(
          res => {
            this._allBook.getAllBook().subscribe(
              data=>this.books=data.data,
              err=>console.log(err)
            );
            this.toastr.warning('Deleted successfully', 'Payment Detail Register');
          },
          err => {
            console.log(err);
          }
        )
    }
  }
}

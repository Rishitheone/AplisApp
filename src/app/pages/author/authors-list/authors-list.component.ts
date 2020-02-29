import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthorService } from 'src/app/shared/author.service';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss']
})
export class AuthorsListComponent implements OnInit {
  AuthorList=[];
  error:string;
  isLoading = true;
  constructor(private service: AuthorService,
    private toastr: ToastrService,private router: Router) { }

  ngOnInit() {
     this.service.getAllAuthor().subscribe(
       data=>{
        this.isLoading = false;
         this.AuthorList=data;
       },
       error=>this.error = error
     );
    
  }
  onDelete(author: any) {
    this.deleteAuthorList(author.id);
   
  }
  deleteAuthorList(id: number) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteAuthor(+id)
        .subscribe(
          res => {
            this.service.getAllAuthor().subscribe(
              data=>this.AuthorList=data,
              error=>this.error = error
            );
            this.toastr.warning('Deleted successfully', 'Payment Detail Register');
          },
          err => {
            console.log(err);
          }
        )
    }
  }

  addAuthor(){
     this.router.navigateByUrl('home/author/create')
  }
  editAuthor(author){
     this.router.navigate(['home/author/edit',author.id])
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SeriesService } from 'src/app/shared/series.service';
import { AuthorService } from 'src/app/shared/author.service';
import { CategoryService } from 'src/app/shared/category.service';
import { BookService } from 'src/app/shared/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Datum, RootObject } from '../home/home.component';
import { UserService } from 'src/app/shared/user.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BookPageCreateService } from 'src/app/shared/book-page-create.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  form: FormGroup;
  pageTitle: string;
  isLinear = false;
  pictureUrl = null;
  coverUrl = null;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  responceValue: string = "Somthing worng";
  books: Datum[] = []
  randome: string;
  passingId:string;

  returnId:number;

  mainCategory = [
    { value: 'primary', viewValue: 'Primary' },
    { value: 'secondary', viewValue: 'Secondary' },
    { value: 'higher', viewValue: 'Higher' }
  ];

  types = [
    { value: 'preschool', viewValue: 'Pre School' },
    { value: 'lower-middle-school', viewValue: 'Lower Middle School' },
    { value: 'upper-middle-school', viewValue: 'Upper Middle School' },
    { value: 'secondary-school', viewValue: 'Secondary School' },
    { value: 'friction', viewValue: 'Friction' },
    { value: 'non-friction', viewValue: 'Non-Friction' },
    { value: 'comic', viewValue: 'Comic' },
    { value: 'education-&-reference', viewValue: 'Education & Reference' },
    { value: 'literary-collections', viewValue: 'Literary Collections' },
    { value: 'non-classifiable', viewValue: 'Non-Classifiable' },
  ]
  template = [
    { value: 1, viewValue: 'Template 1' },
    { value: 2, viewValue: 'Template 2' },
    { value: 3, viewValue: 'Template 3' },
    { value: 4, viewValue: 'Template 4' },
  ]
  minAge = [
    { value: 3, viewValue: '3 years' },
    { value: 4, viewValue: '4 years' },
    { value: 5, viewValue: '5 years' },
    { value: 6, viewValue: '6 years' },
    { value: 7, viewValue: '7 years' },
    { value: 8, viewValue: '8 years' },
    { value: 9, viewValue: '9 years' },
    { value: 10, viewValue: '10 years' },
    { value: 11, viewValue: '11 years' },
    { value: 12, viewValue: '12 years' },
    { value: 13, viewValue: '13 years' },
    { value: 14, viewValue: '14 years' },
    { value: 15, viewValue: '15 years' },
    { value: 16, viewValue: '16 years' },
    { value: 17, viewValue: '17 years' },
    { value: 18, viewValue: '18 years' },
  ];
  maxAge = [
    { value: 3, viewValue: '3 years' },
    { value: 4, viewValue: '4 years' },
    { value: 5, viewValue: '5 years' },
    { value: 6, viewValue: '6 years' },
    { value: 7, viewValue: '7 years' },
    { value: 8, viewValue: '8 years' },
    { value: 9, viewValue: '9 years' },
    { value: 10, viewValue: '10 years' },
    { value: 11, viewValue: '11 years' },
    { value: 12, viewValue: '12 years' },
    { value: 13, viewValue: '13 years' },
    { value: 14, viewValue: '14 years' },
    { value: 15, viewValue: '15 years' },
    { value: 16, viewValue: '16 years' },
    { value: 17, viewValue: '17 years' },
    { value: 18, viewValue: '18 years' },
  ];
  language: any[] = ['English', 'German', 'French', 'Spanish', 'Italian', 'Portuguese', 'Dutch', 'Japanese'
    , 'Afrikaans', 'Alsatian', 'Arabic', 'Basque', 'Bokmal Norwegian', 'Breton', 'Catalan', 'Chinese {Traditional)', 'Cornish'
    , 'Corsican', 'Danish', 'Eastern Frisian', 'Finnish', 'Frisian', 'Galician', 'Gujarati', 'Hindi', 'Icelandic'
    , 'Irish', 'Luxembourgish', 'Malayalam', 'Manx', 'Marathi', 'Northern Frisian', 'Norwegian ', 'Nynorsk Norwegian '
    , 'Provençal', 'Romansh', 'Scots', 'Scottish Gaelic', 'Swedish', 'Swedish', 'Tamil', 'Telgue'

  ];
  series = {};
  author = {};
  category = {};
  AllSubCategory = {};
  // for html editon starting
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
      ['customButtons', ['testBtn']],
      ['view', ['fullscreen']]
    ],
  };
  data: Datum[];
  constructor(private _formBuilder: FormBuilder,
    private seriesService: SeriesService, private location: Location,
    private authorService: AuthorService,
    private categoryService: CategoryService, private userService: UserService,
    private fb: FormBuilder, private bookService: BookService,
    private service:BookPageCreateService,
    private _route: ActivatedRoute, private toastr: ToastrService, private route: Router) {
    this.data = this.bookService.getData();
    const id = this._route.snapshot.paramMap.get('id');

  }

  ngOnInit() {

    this.returnId = this.service.getData()
    this.userService.setTitle('Book');
    // for series dropdown
    this.seriesService.getAllSeries()
      .subscribe(
        res => this.series = res,
        err => console.log(err)
      )

    //for author dropdown
    this.authorService.getAllAuthor()
      .subscribe(
        res => this.author = res,
        err => console.log(err)
      )

    //for Category DropDown
    this.categoryService.getAllCategory()
      .subscribe(
        res => this.category = res,
        err => console.log(err)
      )

    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Update Book';
      this.bookService.getBookById(+id).subscribe(
        res => {
          console.log(res.category.type)
          this.callAllType(res.category.type)
          this.callSubCateApi(res.category.parent_category_id)
          var test = res.tags.split(',')
          this.form.patchValue({
            book_id: res.id,
            series_id: res.series_id,
            author_id: res.author_id,
            title: res.title,
            sub_title: res.sub_title,
            description: res.description,
            status: res.status,
            book_cover: res.book_cover,//no
            cover: res.cover,//yes
            language: res.language,
            isbn_code: res.isbn_code,
            min_age: res.min_age,
            max_age: res.max_age,
            template: res.template,
            type: res.category["type"],
            category: res.category["parent_category_id"],
            category_id: res.category["id"],
            tags: test,
          });
          this.pictureUrl = res.book_cover;
          this.coverUrl = res.cover;
        }
      );
    } else {
      this.pageTitle = 'Create Book';
    }

    //form submit
    this.form = this.fb.group({
      category_id: ['', Validators.required],//yes
      book_id: [null],
      series_id: ['', Validators.required],//yes
      author_id: ['', Validators.required],//yes
      title: ['', Validators.required],//yes
      sub_title: ['', Validators.required],//yes
      description: ['', Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(4000)])],//yes
      status: ['', Validators.required],//yes
      language: ['', Validators.required],//yes
      book_cover: ['', Validators.required],//no
      cover: ['', Validators.required],//yes
      isbn_code: ['', Validators.required],//yes
      min_age: ['', Validators.required],//yes
      max_age: ['', Validators.required],//yes
      template: ['', Validators.required],//yes
      type: [null],//yes
      category: [null],//yes
      tags: this.fb.array([ //no
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
      ])
    });
  }
  selectedLanguage = this.language;

  onKey(value) {
    this.selectedLanguage = this.search(value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.language.filter(option => option.toLowerCase().startsWith(filter));
  }


  get tags() {
    return this.form.get('tags') as FormArray;
  }
  // addAlias() {
  //   this.tags.push(this.fb.control(''));
  // }
  onSubmit() {
    const formData = new FormData();
    formData.append('category_id', this.form.get('category_id').value)
    formData.append('series_id', this.form.get('series_id').value)
    formData.append('author_id', this.form.get('author_id').value)
    formData.append('book_id', this.form.get('book_id').value)
    formData.append('title', this.form.get('title').value)
    formData.append('sub_title', this.form.get('sub_title').value)
    formData.append('description', this.form.get('description').value)
    formData.append('status', this.form.get('status').value)
    formData.append('language', this.form.get('language').value)
    formData.append('isbn_code', this.form.get('isbn_code').value)
    formData.append('min_age', this.form.get('min_age').value)
    formData.append('max_age', this.form.get('max_age').value)
    formData.append('template', this.form.get('template').value)
    formData.append('book_cover', this.form.get('book_cover').value)
    formData.append('cover', this.form.get('cover').value)
    var tags = this.form.get('tags').value;
    for (var i = 0; i < tags.length; i++) {
      formData.append('tags[' + i + ']', tags[i]);
    }

    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    // var json = JSON.stringify(object);
    // console.log(json);
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.updateBook(formData).subscribe(
        res => {
          console.log(res),
          this.toastr.success('Book has been submitted', 'Book Updated successfully');
          this.form.reset();
          if (res.status === 1) {
            this.route.navigateByUrl('/home');
          } else {
            return;
          }
        },
        err => console.log(err)
      );
    } else {
      this.bookService.createBook(formData).subscribe(
        res => {
          console.log(res.data)
          const array1 = res.data;
          var test2;
          array1.forEach(element => {
             test2 = element.id;
          });
          this.passingId = test2;
          console.log(test2),
            this.toastr.success('Book has been submitted', 'Book created successfully');
          if (res.status === 1) {
            this.form.reset();
            // this.route.navigateByUrl('/home');
          } else {
            return;
          }
        },
        err => console.log(err)
      );
    }



    console.log(this.form.value)


  }
 
  passId(id:number){
    this.route.navigate(['edit/',id])
    console.log(id)
  }
  method(id:number){
    if(this.returnId){
      this.route.navigate(['edit/',this.returnId])
    }else{
      this.passId(id);
    }
  }
  onSelect(selectedItem: any) {
    this.callSubCateApi(selectedItem.id);
    console.log(selectedItem.id)
  }
  callSubCateApi(selectedItem) {
    this.categoryService.getAllSubCategory(selectedItem)
      .subscribe(
        data => {
          this.AllSubCategory = data
        },
        err => console.log(err)
      )
  }

  onFileSelect(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.pictureUrl = reader.result;
        this.form.get('book_cover').setValue(file);
      }
    }
  }
  onFileSelectCover(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.coverUrl = reader.result;
        this.form.get('cover').setValue(file);
      }
    }
  }


  // callPrimary() {
  //   this.categoryService.getDropPrimary()
  //     .subscribe(
  //       res => this.category = res,
  //       err => console.log(err)
  //     )
  // }
  // callSecondary() {
  //   this.categoryService.getDropSecondary()
  //     .subscribe(
  //       res => this.category = res,
  //       err => console.log(err)
  //     )
  // }
  // callSecondarySchool() {
  //   this.categoryService.getSecondarySchool()
  //     .subscribe(
  //       res => this.category = res,
  //       err => console.log(err)
  //     )
  // }
  // callFriction() {
  //   this.categoryService.getFriction()
  //     .subscribe(
  //       res => this.category = res,
  //       err => console.log(err)
  //     )
  // }
  // callNonFriction() {
  //   this.categoryService.getNonFriction()
  //     .subscribe(
  //       res => this.category = res,
  //       err => console.log(err)
  //     )
  // }
  // callComic() {
  //   this.categoryService.getComic()
  //     .subscribe(
  //       res => this.category = res,
  //       err => console.log(err)
  //     )
  // }
  // callEducation() {
  //   this.categoryService.getEducationReference()
  //     .subscribe(
  //       res => this.category = res,
  //       err => console.log(err)
  //     )
  // }
  // callLiterary() {
  //   this.categoryService.getLiteraryCollections()
  //     .subscribe(
  //       res => this.category = res,
  //       err => console.log(err)
  //     )
  // }
  // callNonClassifiable() {
  //   this.categoryService.getNonClassifiable()
  //     .subscribe(
  //       res => this.category = res,
  //       err => console.log(err)
  //     )
  // }
  // callHigher() {
  //   this.bookService.getDropHigher()
  //     .subscribe(
  //       res => this.category = res,
  //       err => console.log(err)
  //     )
  // }

  callAllType(type) {
    this.categoryService.getType(type)
      .subscribe(
        res => this.category = res,
        err => console.log(err)
      )
  }


  goBack(): void {
    this.location.back();
  }



}
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, NgForm, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthorService } from 'src/app/shared/author.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorsComponent implements OnInit {
  isLinear = true;
  languages = [
    { value: 'English', viewValue: 'English' },
    { value: 'Hindi', viewValue: 'Hindi' },
    { value: 'Marathi', viewValue: 'Marathi' }
  ];
  cover_pic = null;
  profile_pic = null;
  
  form:FormGroup;
 
  config: any = {
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['style', ['style']],
      ['misc', ['codeview', 'undo', 'redo']],
      ['font', ['bold', 'italic', 'underline','clear']],
      // ['fontsize', ['fontname', 'fontsize']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
      ['customButtons', ['testBtn']],
      ['view', ['fullscreen']]
    ],
  };
  error: string;
  pageTitle: string;
  uploadError: string;
  fileUpload = {status: '', message: '', filePath: ''};
  language:any[] = [ 'English','German','French','Spanish','Italian','Portuguese','Dutch' , 'Japanese' 
  ,'Afrikaans','Alsatian','Arabic','Basque', 'Bokmal Norwegian','Breton','Catalan','Chinese {Traditional)','Cornish'
    ,'Corsican','Danish','Eastern Frisian','Finnish','Frisian','Galician','Gujarati','Hindi','Icelandic'
    ,'Irish' ,'Luxembourgish','Malayalam','Manx','Marathi', 'Northern Frisian','Norwegian ' ,'Nynorsk Norwegian '
   ,'Provençal','Romansh','Scots' , 'Scottish Gaelic','Swedish','Swedish','Tamil','Telgue'
    
  ];
  constructor( private fb: FormBuilder, private service: AuthorService,
    private toastr: ToastrService, private http: HttpClient,private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Update Author Details';
      this.service.getAuthorByid(+id).subscribe(
        res => {
          var test = res.data["keywords"].split(',') 
          this.form.patchValue({
            role: res.data["role"],
            author_id: res.data["id"],
            first_name: res.data["first_name"],
            last_name: res.data["last_name"],
            description: res.data["description"],
            status: res.data["status"],
            profile_pic:res.data ["profile_pic"],//no
            cover_pic:res.data ["cover_pic"],//yes
            language: res.data["language"],
            keywords:test,
          });
          this.profile_pic = res.data["profile_pic"];
          this.cover_pic = res.data["cover_pic"];
        }
      );
    } else {
      this.pageTitle = 'Create Author';
    }
    this.form = this.fb.group({
      role: ['',Validators.required],
      author_id:[null],
      first_name: ['',Validators.required],
      last_name: ['',Validators.required],
      description: ['',Validators.compose([Validators.required,Validators.minLength(30),Validators.maxLength(4000)])],
      status: ['published'],
      language: ['',Validators.required],
      profile_pic: ['',Validators.required],
      cover_pic: ['',Validators.required],
      keywords: this.fb.array([
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
      ])
    });

  }

 
  onFileSelect(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.profile_pic = reader.result;
        this.form.get('profile_pic').setValue(file);
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
        this.cover_pic = reader.result;
        this.form.get('cover_pic').setValue(file);
      }      
    }
  }

  onSubmit() {
    
    const formData = new FormData();
    formData.append('role', this.form.get('role').value)
    formData.append('first_name',this.form.get('first_name').value)
    formData.append('author_id',this.form.get('author_id').value)
    formData.append('last_name',this.form.get('last_name').value)
    formData.append('description',this.form.get('description').value)
    formData.append('status', this.form.get('status').value)
    formData.append('language', this.form.get('language').value)
    formData.append('profile_pic', this.form.get('profile_pic').value)
    formData.append('cover_pic', this.form.get('cover_pic').value)
    var keywors = this.form.get('keywords').value;
    for (var i = 0; i < keywors.length; i++) {
      formData.append('keywords['+i+']', keywors[i]);
  }

    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);
    if(!this.form.valid){
      return;
    }
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.service.updateAuthor(formData).subscribe(
        res =>{ 
          console.log(res),
          this.toastr.success('Submitted successfully', 'Author has been Updated');
          this.form.reset();
          if(res.status === 1){
            this.router.navigateByUrl('/home/author');
          }else{
            return ;
          }
        },
        err => console.log(err)
      );
    }else{
    this.service.createAuthor(formData).subscribe(
      res =>{ 
        console.log(res),
        this.toastr.success('Submitted successfully', 'Book has been submitted');
        this.form.reset();
        if(res.status === 1){
          this.router.navigateByUrl('/home/author');
        }else{
          return ;
        }
      },
      err => console.log(err)
    );
    }
  }





  selectedLanguage = this.language;


  get keywords() {
    return this.form.get('keywords') as FormArray;
  }
  // addAlias() {
  //   this.keywords.push(this.fb.control(''));
  // }

  onBack(){
    this.router.navigateByUrl('/home/author')
  }
  onKey(value) { 
    this.selectedLanguage = this.search(value);
    }
    
    search(value: string) { 
      let filter = value.toLowerCase();
      return this.language.filter(option => option.toLowerCase().startsWith(filter));
    }
  

}


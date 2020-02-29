import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { MaterialModule } from './material/material.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UserService } from './shared/user.service';
import { AuthorsListComponent } from './pages/author/authors-list/authors-list.component';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryFormComponent } from './pages/category/category-form/category-form.component';
import { SeriesComponent } from './pages/series/series.component';
import { SeriesFormComponent } from './pages/series/series-form/series-form.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './_guards/auth.interceptor';
import { CategoryDispalyComponent } from './pages/category/category-dispaly/category-dispaly.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AuthorsComponent } from './pages/author/author.component';
import { EditorComponent } from './pages/editor/editor.component';
import { EditorEditComponent } from './pages/editor-edit/editor-edit.component';
import { SeriesService } from './shared/series.service';
import { CategoryService } from './shared/category.service';
import { AuthorService } from './shared/author.service';
import { SearchboxComponent } from './pages/searchbox/searchbox.component';
import { NgxEditorModule } from 'ngx-editor';
import { BookService } from './shared/book.service';
import { FilterPipe } from './pipe/search.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { ExploreCreateComponent } from './pages/explore/explore-create/explore-create.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { OrderModule } from 'ngx-order-pipe';
import { SeriesUpdateComponent } from './pages/series/series-update/series-update.component';
import { CategoryChildComponent } from './pages/category/category-child/category-child.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { GallaryComponent } from './file-upload/gallary/gallary.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AuthorsComponent,
    BookComponent,
    AuthorsListComponent,
    CategoryComponent,
    CategoryFormComponent,
    SeriesComponent,
    SeriesFormComponent,
    LoginComponent,
    CategoryDispalyComponent,
    EditorComponent,
    EditorEditComponent,
    SearchboxComponent,
    FilterPipe,
    ExploreComponent,
    ExploreCreateComponent,
    SeriesUpdateComponent,
    CategoryChildComponent,
    FileUploadComponent,
    GallaryComponent,
    
  ],
  imports: [
    BrowserModule,
    NgxSummernoteModule,
    FormsModule,
    OrderModule,
    NgxPaginationModule,
    NgxEditorModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularEditorModule,
    //Matrial Module
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
  ],
  exports:[MaterialModule],
  providers: [UserService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },SeriesService,CategoryService,AuthorService,BookService],
  bootstrap: [AppComponent],
  entryComponents: [
    CategoryFormComponent,
    SeriesFormComponent,
    SeriesUpdateComponent,
    GallaryComponent
  ],
})
export class AppModule { }

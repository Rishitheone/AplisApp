import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { AuthorsListComponent } from './pages/author/authors-list/authors-list.component';
import { CategoryComponent } from './pages/category/category.component';
import { SeriesComponent } from './pages/series/series.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthorsComponent } from './pages/author/author.component';
import { EditorComponent } from './pages/editor/editor.component';
import { EditorEditComponent } from './pages/editor-edit/editor-edit.component';
import { SearchboxComponent } from './pages/searchbox/searchbox.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { ExploreCreateComponent } from './pages/explore/explore-create/explore-create.component';
import { CategoryChildComponent } from './pages/category/category-child/category-child.component';

const routes: Routes = [
  { path: '', redirectTo:'/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
  { path: 'home/category', component: CategoryComponent,canActivate:[AuthGuard]},
  { path: 'home/category/edit/:id', component: CategoryChildComponent,canActivate:[AuthGuard]},
  { path: 'home/book/create', component: BookComponent,canActivate:[AuthGuard]},
  { path: 'home/book/edit/:id', component: BookComponent,canActivate:[AuthGuard]},
  { path: 'home/author', component: AuthorsListComponent ,canActivate:[AuthGuard]},
  { path: 'home/author/create', component: AuthorsComponent,canActivate:[AuthGuard] },
  { path: 'home/author/edit/:id', component: AuthorsComponent,canActivate:[AuthGuard] },
  { path: 'home/series', component: SeriesComponent,canActivate:[AuthGuard]},
  { path: 'home/editor', component: EditorComponent,canActivate:[AuthGuard]},
  { path: 'edit/:id', component: EditorEditComponent,canActivate:[AuthGuard]},
  { path: 'search', component: SearchboxComponent,canActivate:[AuthGuard]},
  { path: 'home/Explore', component: ExploreComponent,canActivate:[AuthGuard]},
  { path: 'home/Explore/create', component: ExploreCreateComponent,canActivate:[AuthGuard]},
  { path: 'home/Explore/edit/:id', component: ExploreCreateComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

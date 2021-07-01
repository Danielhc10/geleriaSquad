import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { TagsComponent } from './pages/tags/tags.component';
import { PostComponent } from './components/post/post.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UploadComponent } from './pages/upload/upload.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [HomeComponent, TagsComponent, PostComponent, PaginationComponent, UploadComponent],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    SharedModule
  ]
})
export class PrincipalModule { }


import { Component, OnInit } from '@angular/core';
import { IPost } from '@principal/models/post';
import { ArrivalsService } from '@principal/services/arrivals/arrivals.service';
import { DataPaginated } from '@principal/models/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: IPost[];
  metadata: DataPaginated<any>;
  query: { page?: string, tags?: string[] };

  constructor(
    private _arrivals: ArrivalsService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.posts = new Array<IPost>();
    this.metadata = {
      totalDocs: 0,
      limit: 0,
      page: 1,
      nextPage: null,
      prevPage: null,
      hasNextPage: false,
      hasPrevPage: false,
      totalPages: 1,
    }
    this.query = {};
  }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe(res => {
      if (res.has('page'))
        this.query.page = res.get('page');
      if (res.has('tags'))
        this.query.tags = res.getAll('tags');

      this.getPosts();
    });
  }

  getPosts() {
    const request = this.trendsEnabled()
      ? this._arrivals.getPosts(this.query)
      : this._arrivals.getTrendsPosts();

    request.subscribe(posts => {
      this.posts = posts.data;
      delete posts.data;
      this.metadata = posts;
    }, err => {
      console.log(err)
    }, () => { });
  }

  trendsEnabled(): boolean {
    return !this._router.url.endsWith('/trends');
  }
}

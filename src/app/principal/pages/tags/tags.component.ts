import { Component, OnInit } from '@angular/core';
import { ITag } from '@principal/models/tag';
import { ArrivalsService } from '@principal/services/arrivals/arrivals.service';
import { DataPaginated } from '@principal/models/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  host: { class: 'p-3'}
})
export class TagsComponent implements OnInit {
  tags: ITag[];
  page: number;
  metadata: DataPaginated<any>;
  isNaM
  constructor(
    private _route: ActivatedRoute,
    private _arrivals: ArrivalsService,
  ) { 
    
    this.tags = new Array<ITag>();
    this.page= 1;
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

  }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe(res => {
        this.page = !isNaN(Number(res.get('page'))) && Number(res.get('page')) > 0 ? Number(res.get('page')) : 1
        console.log(this.page)
      this.getTags();
    });
  }

  getTags() {
    this._arrivals.getTags(this.page).subscribe(tags => {
      this.tags = tags.data;
      delete tags.data;
      this.metadata = tags;
      console.log(tags)
    }, err => {
      console.log(err)
    }, () => { });
  }
}

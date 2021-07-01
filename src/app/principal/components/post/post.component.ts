import { Component, Input, OnChanges } from '@angular/core';
import { IPost } from '@principal/models/post';
import { ArrivalsService } from '@principal/services/arrivals/arrivals.service';
import { ExchangesService } from '@principal/services/exchanges/exchanges.service';
import { UserService } from '@auth/services/user/user.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  host: { class: 'p-1 col-sm-6 col-md-4 col-lg-3' },
})
export class PostComponent implements OnChanges {
  bool: boolean;
  @Input() post: IPost;


  constructor(
    public _user: UserService,
    private _arrivals: ArrivalsService,
    private _exchanges: ExchangesService,
  ) {

    this.bool = false;
    this.post = {
      image: {
        url: ''
      },
      author: {
        nickname: ''
      },
      tags: []
    }
  }

  ngOnChanges(): void {
    if (this._user.logged) {
      this.getLicked();
    }

  }

  getLicked(): void {
    this._arrivals.getLicked(this.post._id, this._user.getId).subscribe(({ data }) => this.bool = data.toogle);
  }

  licked($event): void {
    this._exchanges.updateLike(this.bool, this.post._id, this._user.getId).subscribe(({ data }) => this.bool = data.toogle);
  }
}

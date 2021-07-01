import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, Output, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
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
  timeoutHandler;
  confirmModal: Modal;
  target: EventTarget;
  toogleModal: boolean;
  @Input() post: IPost;
  @Output() onDestroy: EventEmitter<EventTarget>;
  @ViewChild('modal') modal: ElementRef<HTMLDivElement>;

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
    this.timeoutHandler = null;
    this.onDestroy = new EventEmitter<EventTarget>();
    this.confirmModal = null;
    this.toogleModal = false;
  }

  ngOnChanges(): void {
    if (this._user.logged)
      this.getLicked();
  }

  getLicked(): void {
    this._arrivals.getLicked(this.post._id, this._user.getId).subscribe(({ data }) => this.bool = data.toogle);
  }

  @HostListener('dblclick')
  likeToogle(): void {
    this._exchanges.updateLike(this.bool, this.post._id, this._user.getId).subscribe(({ data }) => this.bool = data.toogle);
  }

  @HostListener('mousedown', ['$event'])
  mousedown($event: MouseEvent) {
    this.target = $event.target;

    if (this._user.hasRole(['EDIT', 'GRANT', 'ADMIN']))
      this.timeoutHandler = setTimeout(() => {
        this.timeoutHandler = null;
        this.confirmModal = new Modal(this.modal.nativeElement, { keyboard: false });
        if (!this.toogleModal) {
          this.confirmModal.show();
          this.toogleModal = true;
        }
      }, 3000);
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  mouseup() {
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  }

  deletePost() {
    this.toogleModal = false;
    this._exchanges.delePost(this.post._id).subscribe(res => {
      this.onDestroy.emit(this.target);
    }, err => {

    });
  }
}

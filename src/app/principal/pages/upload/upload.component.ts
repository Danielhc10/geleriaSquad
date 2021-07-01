import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@auth/services/user/user.service';
import { ITag } from '@principal/models/tag';
import { ArrivalsService } from '@principal/services/arrivals/arrivals.service';
import { ShippingsService } from '@principal/services/shippings/shippings.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  tagArray: ITag[];
  tags: string[];
  optionalTags: string[];

  constructor(
    private _arrivals: ArrivalsService,
    private _shipping: ShippingsService,
    private _user: UserService,
    private _router: Router,
  ) {
    this.tagArray = new Array<ITag>();
    this.tags = new Array<string>();
    this.optionalTags = new Array<string>();
  }

  ngOnInit(): void {
    this.getTags();
  }

  getTags() {
    this._arrivals.listTags().subscribe(({ data }) => {
      this.optionalTags = data.map(tag => tag.name);
      this.tagArray = data;
    });
  }

  getFile(input: HTMLInputElement): File {
    return Array.from(input.files).pop();
  }

  onSubmit(file: File) {
    if (file && this.tags.length > 0) {
      let data = new FormData();
      data.append('image', file, file.name);
      data.append('author', this._user.getId);
      this.tags.map(tag => this.tagArray.find(({ name }) => name === tag)?._id)
        .filter(tag => tag)
        .forEach((tag, i) => data.append(`tags[${i}]`, tag));

      this._shipping.sendPost(data).subscribe(
        ({ data }) => {
          this._router.navigate(['/home']);
        }
      );
    }
  }
}

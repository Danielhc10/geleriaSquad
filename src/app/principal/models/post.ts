import { IImage } from "./image";
import { ITag } from "./tag";
import { IUser } from "./user";

export interface IPost {
  readonly _id?: string;
  readonly image: IImage;
  readonly author: IUser;
  readonly tags: ITag[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

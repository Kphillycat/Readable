import { schema } from 'normalizr';

export const post = new schema.Entity('post');
export const arrayOfPosts = new schema.Array(post);

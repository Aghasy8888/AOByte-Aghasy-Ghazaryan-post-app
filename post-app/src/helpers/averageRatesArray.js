import { pool } from '../data/postsObject';
import findAverage from './findAverage';

export const averageRatesArray = pool.map((post) => {
  const ratingArray = post.comments.map((comment) => comment.rating);

  post.rating = findAverage(ratingArray);

  return findAverage(ratingArray);
});

export const averageRatesArrayCopy = [...averageRatesArray];

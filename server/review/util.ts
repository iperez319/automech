import type { Review } from "./model";

export function formatReview(review: any) {
  const { name, rating, model, shop, content, author } = review;
  let model_text = `${model.year} ${model.make} ${model.model}`;
  return {
    name,
    rating,
    model: model_text,
    shop,
    content,
    author: author.name,
  };
}

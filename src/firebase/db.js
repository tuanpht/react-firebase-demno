import {db} from './firebase';

export const createQuote = (content, author) => {
  let quote = db
    .ref()
    .child('quotes')
    .push();
  return quote.set({
    content,
    author,
  });
};

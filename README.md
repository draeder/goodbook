# GoodBook
Return Books, Chapters and Verses of the Holy Bible (KJV)

## Example
```js
import GoodBook from 'goodbook'

const goodBook = new GoodBook()

let randomBook = goodBook.getRandom('book')
goodBook.on('book', results => {
  console.log(results)
})

let randomChapter = goodBook.getRandom('chapter')
goodBook.on('chapter', results => {
  console.log(results.book, results.chapter)
})

let randomVerse = goodBook.getRandom('verse')
goodBook.on('verse', results => {
  console.log(results.book + ' ' + results.chapter + ':' + results.verse, '-', results.text)
})
```

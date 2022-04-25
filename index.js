import fs from 'fs'
import { EventEmitter } from 'events'

const GoodBook = function(params){
  let goodBook = this
  let events = new EventEmitter()
  goodBook.on = events.on.bind(events)
  goodBook.once = events.once.bind(events)
  goodBook.off = events.off.bind(events)
  goodBook.emit = events.emit.bind(events)

  goodBook.params = params || {}

  let books = JSON.parse(fs.readFileSync('Bible/Books.json','utf8'))
  goodBook.getRandom = async params => {
    this.book = async () => {
      const book = Math.round(0 + Math.random() * await books.length - 1)
      if(book === -1) book = 0
      let name = await books[book]
      let bookFile = name.replace(/ /g, '') + '.json'
      let randomBook = JSON.parse(fs.readFileSync('Bible/'+bookFile,'utf8'))
      return randomBook
    }
    this.chapter = async book => {
      book = await book
      let chapter = Math.round(0 + Math.random() * await book.chapters.length - 1)
      if(chapter === -1) chapter = 0
      return book.chapters[chapter]
    }
    this.verse = async chapter => {
      let verse = Math.round(0 + Math.random() * await chapter.verses.length - 1)
      if(verse === -1) verse = 0
      return chapter.verses[verse]
    }
    if(params === 'book'){
      let book = await this.book()

      goodBook.emit('book', book)
    }
    if(params === 'chapter'){
      let book = await this.book()
      let chapter = await this.chapter(book)
      goodBook.emit('chapter', {book: book.book, chapter: Object.values(chapter)})
    }
    if(params === 'verse'){
      let book = await this.book()
      let chapter = await this.chapter(book)
      let verse = await this.verse(chapter)
      goodBook.emit('verse', {book: book.book, chapter: Object.values(chapter)[0], verse: Object.values(verse)[0], text: Object.values(verse)[1]})
    }
  }
}

export default GoodBook
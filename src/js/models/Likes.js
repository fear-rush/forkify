export default class Likes {
  constructor() {
    this.likes = [];
  }

  addItem(id, title, author, img) {
    const like = {
      id: id,
      title: title,
      author: author,
      img: img
    };
    this.likes.push(like);
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);
  }

  isLiked(id) {
    return this.items.find(el => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }

}
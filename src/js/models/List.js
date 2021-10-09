import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count: count,
      unit: unit,
      ingredient:ingredient
    };
    this.items.push(item);
    return item;
  }

  updateItem(id, newCount) {
    // find akan mereturn object pertama yang match pada array this.items
    this.items.find(el => el.id === id).count = newCount;
  }

  deleteItem(id) {
    const index = this.items.findIndex(el => el.id === id);
    // [2,4,8] splice(1,2) -> returns [4,8] and original array is [2]
    // [2,4,8] slice(1,2)-> returns [4] and original array is [2,4,8]
    // intinya splice mutate array dan slice tidak mutate array
    this.items.splice(index, 1);
  }

}
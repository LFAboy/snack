class Food {
  private X: number;
  private Y: number;
  private foodEle: HTMLElement;

  constructor() {
    this.foodEle = document.querySelector('.food') as HTMLElement;
    this.X = this.foodEle.offsetLeft;
    this.Y = this.foodEle.offsetTop;
  }

  changeAddress() {
    const newX = Math.round(Math.random() * 29 ) * 10;
    const newY = Math.floor(Math.random() * 30 ) * 10;
    if (newX !== this.X && newY !== this.Y ) {
      this.X = newX;
      this.Y = newY;
      this.foodEle.style.left = this.X + "px";
      this.foodEle.style.top = this.Y + "px";
    }else {
      this.changeAddress();
    }
  }

  get x() {
    return this.X
  };
  get y() {
    return this.Y
  };
}

export default Food;
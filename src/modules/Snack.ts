class Snack {
  snackEle: HTMLElement;
  headEle: HTMLElement;
  allSnack: HTMLCollection;


  constructor() {
    this.headEle = document.querySelector('.snack-head') as HTMLLIElement;
    this.snackEle = document.querySelector('.snack') as HTMLLIElement;
    this.allSnack = this.snackEle.getElementsByTagName('div') as HTMLCollection;
  }
  get x() {
    return this.headEle.offsetLeft;
  }
  get y() {
    return this.headEle.offsetTop;
  }
  set x(newValue: number) {
    if (this.x === newValue) {
      return;
    }
    if (newValue < 0 || newValue > 290) {
      throw new Error('撞墙身亡，不治而死，其实可以治的');
    }
    this.changeBody();
    this.headEle.style.left = newValue + 'px';
  }
  set y(newValue: number) {
    if (this.y === newValue) {
      return;
    }
    if (newValue < 0 || newValue > 290) {
      throw new Error('撞墙身亡，不治而死，只有十级就通关了，加油');
    }
    this.changeBody();
    this.headEle.style.top = newValue + 'px';
  }
  addBody() {
    // this.snackEle.appendChild(document.createElement("div"));
    this.snackEle.insertAdjacentHTML("beforeend", "<div></div>");
  }
  changeBody() {
    // console.log(this.x, this.y);
    // if (this.allSnack.length > 1) {
    //   console.log((this.allSnack[1] as HTMLElement).offsetLeft, (this.allSnack[1] as HTMLElement).offsetTop);
    // }

    for (let i = this.allSnack.length - 1; i >= 1; i--) {
      (this.allSnack[i] as HTMLElement).style.left = (this.allSnack[i - 1] as HTMLElement).offsetLeft + 'px';
      (this.allSnack[i] as HTMLElement).style.top = (this.allSnack[i - 1] as HTMLElement).offsetTop + 'px';
    }

    // for (let i = this.allSnack.length - 1; i > 0; i--) {
    //   // 获取前边身体的位置
    //   let X = (this.allSnack[i - 1] as HTMLElement).offsetLeft;
    //   let Y = (this.allSnack[i - 1] as HTMLElement).offsetTop;

    //   // 将值设置到当前身体上
    //   (this.allSnack[i] as HTMLElement).style.left = X + 'px';
    //   (this.allSnack[i] as HTMLElement).style.top = Y + 'px';
    // }
  }
}

export default Snack;
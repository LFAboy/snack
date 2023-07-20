import Snack from "./Snack";
import Food from "./Food";
import Score from "./Score";


class Control {
  snack: Snack;
  food: Food;
  score: Score;
  direction: string = '';
  snackAlive = true;

  constructor() {
    // 初始化实例，创建 score food snack 实例
    this.snack = new Snack();
    this.score = new Score(10);
    this.food = new Food();
    this.init();
  }

  init() {
    // 当游戏控制器实例被创建的时候，就调用这个方法，来执行初始化激活游戏。

    // 我们把键盘事件绑定给 document 对象。
    document.addEventListener('keydown', this.keyDown.bind(this));

    // 让蛇自动跑起来
    this.running();
  }
  keyDown(event: KeyboardEvent) {
    // 当点击 键盘改变方向的时候，我们只是改变了方向，并没有移动蛇的位置。
    // 为什么不移动蛇的位置？因为我们设置的是蛇自动移动，所以这里没有必要单独设置蛇的移动了。

    switch (event.key) {
      case 'w':
      case 'ArrowUp':
      case 'Up':
        this.direction = 'up';
        break;
      case 's':
      case 'ArrowDown':
      case 'Down':
        this.direction = 'down';
        break;
      case 'a':
      case 'ArrowLeft':
      case 'Left':
        this.direction = 'left';
        break;
      case 'd':
      case 'ArrowRight':
      case 'Right':
        this.direction = 'right';
        break;
    }
    // console.log(event.key);
  }
  isGetFood(x: number, y: number) {
    if (x == this.food.x && y == this.food.y) {
      // 如果 蛇 吃到了 食物，1，那么蛇就增加一节；2，让食物随机换个位置；3，加一分; 4, 查看是否需要升级
      this.food.changeAddress();
      this.score.updateScore();
      this.score.updateLevel();
      this.snack.addBody();
    }
  }
  running() {
    let x = this.snack.x;
    let y = this.snack.y;
    switch (this.direction) {
      case 'up':
        // this.snack.y -= 10;
        y = y - 10;
        break;
      case 'down':
        // this.snack.y += 10;
        y = y + 10;
        break;
      case 'left':
        // this.snack.x -= 10;
        x = x - 10;
        break;
      case 'right':
        // this.snack.x += 10;
        x = x + 10;
        break;
    }
    // debugger;
    // 当我们的蛇移动后，就判断一下是否吃到食物。
    this.isGetFood(x, y);

    // up: 判断是否会拿到食物，应该放在移动前面，因为添加新的蛇体应该在蛇移动的前面。
    try {
      // switch (this.direction) {
      //   case 'up':
      //     this.snack.y -= 10;
      //     break;
      //   case 'down':
      //     this.snack.y += 10;
      //     break;
      //   case 'left':
      //     this.snack.x -= 10;
      //     break;
      //   case 'right':
      //     this.snack.x += 10;
      //     break;
      // }
      this.snack.x = x
      this.snack.y = y
    } catch (error) {
      alert((error as Error).message);

      this.snackAlive = false
    }

    // this.isGetFood(this.snack.x, this.snack.y);

    // 如果还活着就调用自己，实现一个蛇自动移动的效果。
    this.snackAlive && setTimeout(this.running.bind(this), (this.score.maxLevel + 1 - this.score.level) * 20);
  }
}

export default Control;
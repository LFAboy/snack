class Score {
  private score: number = 0;
  level: number = 1;
  private scoreEle: HTMLElement;
  private levelEle: HTMLElement;

  constructor(public maxLevel = 10) {
    this.scoreEle = document.querySelector('.score') as HTMLElement;
    this.levelEle = document.querySelector('.level') as HTMLElement;
  }
  updateScore() {
    this.score++;
    this.scoreEle.innerText = `SCORE: ${this.score}`;
  }
  updateLevel() {
    if (this.level >= this.maxLevel) return;
    this.level = Math.floor(this.score / 10) + 1;
    this.levelEle.innerText = `LEVEL: ${this.level}`;
  }
}

export default Score;
const chalk = require('chalk');
const stdin = process.openStdin();
const gameInstances = [];

class BullsAndCowsGame {
  constructor() {
    this.cows = 0;
    this.bulls = 0;
    this.tries = 0;
    this.pickedNumberAsArray = this.getRandomNumberAsArray(4);
  }

  getRandomNumberAsArray(digits) {
    // Getting number as array without duplicates
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5).slice(0, digits);
  }

  resetBullsAndCows() {
    this.bulls = 0;
    this.cows = 0;
  }

  countBovine(num, guess) {
    this.tries++;
    this.resetBullsAndCows();
    let guessAsArray = guess.split('');
    for (let i = 0; i < num.length; i++) {
      let digPresent = guess.search(num[i]) !== -1;
      if (num[i] == guessAsArray[i]) {
        this.bulls++;
      } else if (digPresent) {
        this.cows++;
      }
    }
    if (this.bulls == 4) {
      return console.log(chalk.white.bgMagenta(`Congratulations! You win, my number was ${this.pickedNumberAsArray.join('')}!\nTries amount: ${this.tries}\nType restart to play again or exit to finish!`));
    }
    console.log(chalk.black.bgWhite(`Guess: ${guess}\nBulls: ${this.bulls} Cows: ${this.cows}.`));
  }

  checkGuess(guess) {
    if (!Number.isInteger(+guess)) {
      return console.log(chalk.white.bgRed('Oops, it is not an 4 digit number, try again!'));
    }
    return this.countBovine(this.pickedNumberAsArray, guess);
  }

  static restartMessage() {
    return console.log(chalk.white.bgBlue('Try to guess again:'));
  }

  static exitMessage() {
    return console.log(chalk.black.bgGreen('Thanks for the game, bye!'));
  }
}


// Remove old instance and create the new one
function restart() {
  gameInstances.length = 0;
  gameInstances.push(new BullsAndCowsGame());
}

gameInstances.push(new BullsAndCowsGame());

console.log(chalk.white.bgBlue(`Welcome to Bulls and Cows game!\nTry to guess my number!\nEnter it below:`));

stdin.addListener('data', (passedValue) => {
  // note: passedValue is an object
  let enteredMessage = passedValue.toString().trim();
  if (enteredMessage === 'restart') {
    BullsAndCowsGame.restartMessage();
    return restart();
  } else if (enteredMessage === 'exit') {
    BullsAndCowsGame.exitMessage();
    return process.exit(0);
  }
  return gameInstances[0].checkGuess(enteredMessage);
});

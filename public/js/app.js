var coins = ['coin1.png', 'coin2.png', 'coin3.png', 'coin4.png', 'coin5.png', 'coin6.png', 'coin7.png']

// Number of rows, cols
var rows = 6
var cols = 7

// Select a random coin
var playerOneCoin = coins[Math.floor(Math.random(coins.length) * coins.length)]
coins.splice(coins.indexOf(playerOneCoin), 1) // to avoid same image
var playerTwoCoin = coins[Math.floor(Math.random(coins.length) * coins.length)]

// Place a coin
var currentLocationID = 'r0-c4'
var firstCoinLocation = document.getElementById(currentLocationID)

var coinLocation = firstCoinLocation

var playerOneCoinObj = createCoin(playerOneCoin)
var playerTwoCoinObj = createCoin(playerTwoCoin)
// coinLocation.appendChild(playerOneCoinObj)

var currentPlayer = 'one'
var player = playerOneCoinObj
var coin = playerOneCoin

// for win condition
var playerOneCount = 0
var playerTwoCount = 0
var playerOneAnswerArr = [[], [], [], [], [], []]
var playerTwoAnswerArr = [[], [], [], [], [], []]

// Score
var playerOneScore = 0
var playerTwoScore = 0

// Time for dropping coin
var dropCoinTime = 1000

// Time for showing alert(timer, switch player)
var alertMsgTime = 1000

// Time for displaying the winner
var winDisplayTime = 1500

// Time for highlighting the four coins that make the win
var highlightCoinstime = 1000

// Create a coin
function createCoin(coin) {
  var coinObj = document.createElement('IMG')
  coinObj.setAttribute('src', 'img/' + coin)
  coinObj.classList.add('coin')
  return coinObj
}

// switch users
function switchPlayer(obj) {
  var nextPlayer = ''
  removeAllEvents()

  coinLocation = document.getElementById(currentLocationID)

  // Display player's turn
  setTimeout(function() {
    modalMgmt(modalType1)

    if (currentPlayer === 'one') {
      currentPlayer = 'two'
      userNameOnePort.style.color = 'white'
      userNameTwoPort.style.color = 'gold'
      userNameOneLand.style.color = 'white'
      userNameTwoLand.style.color = 'gold'
      nextPlayer = playerTwo.value
    } else {
      currentPlayer = 'one'
      userNameOnePort.style.color = 'gold'
      userNameTwoPort.style.color = 'white'
      userNameOneLand.style.color = 'white'
      userNameTwoLand.style.color = 'gold'
      nextPlayer = playerOne.value
    }

    type1Msg1.textContent = nextPlayer + "'" + 's turn'
    type1Msg2.textContent = ''
    playAgainBtn.style.display = 'none'

    coinLocation.removeChild(player)

    if (currentPlayer === 'one') {
      player = playerOneCoinObj
      coin = playerOneCoin
    } else {
      player = playerTwoCoinObj
      coin = playerTwoCoin
    }
    coinLocation.appendChild(player)

    player.style.display = 'none'
    timeLeft = 10

    setTimeout(function () {

      modalMgmt(null)
      playAgainBtn.style.display = 'inline'

      player.style.display = 'block'

      removeDropCoinAnimation(player)
      displayTarget()
      addAllEvents()
    }, alertMsgTime)

  }, dropCoinTime)
}

// Show destination spot
var targetObj
function displayTarget() {
  if (document.getElementById('r1-c' + currentLocationID[4]).childNodes.length !== 1) {
    for (var i = rows - 1; i >= 0; i--) {
      targetObj = document.getElementById('r' + (i + 1) + '-c' + currentLocationID[4])
      if (targetObj.childNodes.length === 0) {
        // target.style.backgroundColor = 'gold'
        targetObj.style.backgroundColor = 'rgb(249,215,73,0.9)'
        break
      }
    }
  }
}

// Remove destination spot
function removeTarget() {
  var target
  if (document.getElementById('r1-c' + currentLocationID[4]).childNodes.length !== 1) {
    for (var i = rows - 1; i >= 0; i--) {
      target = document.getElementById('r' + (i + 1) + '-c' + currentLocationID[4])
      if (target.childNodes.length === 0) {
        target.style.backgroundColor = ''
        break
      }
    }
  }
}

// Move coin by mouseover
var clickToMove = document.querySelectorAll('.to-move')

var moveHandler = function moveEvent(e) {
  if (e.target.nodeName !== 'IMG') {
    if (e.clientX < player.getBoundingClientRect().left) {
      moveLeft(player)
    } else if (e.clientX > player.getBoundingClientRect().right) {
      moveRight(player)
    }
  }
}

function addAllEvents() {
  for (var i = 0; i < clickToMove.length; i++) {
    addSingleMouseOvertoMoveEvent(clickToMove[i])
    addSingleClicktoMoveEvent(clickToMove[i])
  }

  addAllClickToDropEvent()
  addKeydownEvent()
}

function removeAllEvents() {
  for (var i = 0; i < clickToMove.length; i++) {
    removeSingleMouseOvertoMoveEvent(clickToMove[i])
    removeSingleClicktoMoveEvent(clickToMove[i])
  }

  removeAllClickToDropEvent()
  removeKeydownEvent()
}

function addSingleMouseOvertoMoveEvent(obj) {
  obj.addEventListener('mouseover', moveHandler)
}

function addSingleClicktoMoveEvent(obj) {
  obj.addEventListener('click', moveHandler)
}

function removeSingleMouseOvertoMoveEvent(obj) {
  obj.removeEventListener('mouseover', moveHandler)
}

function removeSingleClicktoMoveEvent(obj) {
  obj.removeEventListener('click', moveHandler)
}

// Click to drop
var clickToDrop = document.querySelectorAll('.on-hold-blocks')
var clickToDropHandler = function clickToDropFunction(e) {
  if (e.target.nodeName === 'IMG') {
    dropCoin(player, coin)
  }
}

function addAllClickToDropEvent() {
  for (var i = 0; i < clickToDrop.length; i++) {
    addSingleClickToDropEvent(clickToDrop[i])
  }
}

function removeAllClickToDropEvent() {
  for (var i = 0; i < clickToDrop.length; i++) {
    removeSingleClickToDropEvent(clickToDrop[i])
  }
}

function addSingleClickToDropEvent(obj) {
  obj.addEventListener('click', clickToDropHandler)
}

function removeSingleClickToDropEvent(obj) {
  obj.removeEventListener('click', clickToDropHandler)
}

// Move the coin with arrow keys just in case
function addKeydownEvent() {
  document.body.onkeydown = function (e) {
    getKeyAndMove(e)
  }
}

function removeKeydownEvent() {
  document.body.onkeydown = function (e) {
    // intentionally left this null
  }
}

function getKeyAndMove(e) {
  var key_code = e.which || e.keyCode;
  switch (key_code) {
    case 37: //left arrow key
      moveLeft(player)
      break;
    case 38: //Up arrow key
      break;
    case 39: //right arrow key
      moveRight(player)
      break;
    case 40: //down arrow key
      dropCoin(player, coin)
      break;
  }
}

function moveLeft(obj) {
  moveCoin.play()
  removeTarget()
  if (obj.parentNode.previousElementSibling) {
    obj.parentNode.previousElementSibling.appendChild(obj)
  }
  currentLocationID = obj.parentNode.id
  displayTarget()
}

function moveRight(obj) {
  moveCoin.play()
  removeTarget()
  if (obj.parentNode.nextElementSibling) {
    obj.parentNode.nextElementSibling.appendChild(obj)
  }
  currentLocationID = obj.parentNode.id
  displayTarget()
}

//resetGame
function resetGame(modalObj, time) {
  playerOneCount = 0
  playerTwoCount = 0
  modalMgmt(modalObj)
  startGame(time)
}

var modal = document.querySelector('.modal')
var modalUsername = document.querySelector('.modal-username')
var modalType1 = document.querySelector('.modal-type1')

var playAgainBtn = document.querySelector('.play-again')
var pauseBtnPort = document.querySelector('.pause-btn-port')
var newGameBtnPort = document.querySelector('.new-game-btn-port')
var newGameBtnLand = document.querySelector('.new-game-btn-land')
var pauseBtnLand = document.querySelector('.pause-btn-land')

var type1Msg1 = document.querySelector('.type1-msg1')
var type1Msg2 = document.querySelector('.type1-msg2')

playAgainBtn.addEventListener('click', function () {
  clickSound.play()
  resetGame(modalType1, timeLeft)
})
newGameBtnPort.addEventListener('click', function () {
  clickSound.play()
  clearInterval(interval)
  indicateTimePort.textContent = 'Time Left'
  indicateTimeLand.textContent = 'Time Left'
  removeKeydownEvent()
  modalMgmt(modalType1)
  type1Msg1.textContent = 'Do you want to play again?'
  type1Msg2.textContent = ''
  playAgainBtn.textContent = 'Play'
  timeLeft = 10
})
pauseBtnPort.addEventListener('click', function () {
  clickSound.play()
  clearInterval(interval)
  removeKeydownEvent()
  modalMgmt(modalType1)
  type1Msg1.textContent = 'Paused!'
  type1Msg2.textContent = 'Please take your time!'
  playAgainBtn.textContent = 'Resume'
})
newGameBtnLand.addEventListener('click', function () {
  clickSound.play()
  clearInterval(interval)
  indicateTimePort.textContent = 'Time Left'
  indicateTimeLand.textContent = 'Time Left'
  removeKeydownEvent()
  modalMgmt(modalType1)
  type1Msg1.textContent = 'Do you want to play new game?'
  type1Msg2.textContent = ''
  playAgainBtn.textContent = 'Play'
  timeLeft = 10
})
pauseBtnLand.addEventListener('click', function () {
  clickSound.play()
  clearInterval(interval)
  removeKeydownEvent()
  modalMgmt(modalType1)
  type1Msg1.textContent = 'Paused!'
  type1Msg2.textContent = 'Please take your time!'
  playAgainBtn.textContent = 'Resume'
})

// Restart game totally by new game Btn
// var newGameBtn = document.querySelector('.new-game-btn')
// newGameBtnPort.addEventListener("click", function() {
//   clickSound.play()
//   startOver
// })

function startOver() {
  playerOneCount = 0
  playerTwoCount = 0
  timeLeft = 10
  clearInterval(interval)
  indicateTimePort.textContent = 'Time Left'
  indicateTimeLandt.textContent = 'Time Left'
  clearScoreFields()
}

// var transformForCoin = 720
// var transformForCoin = Math.floor(Math.random(0,1)*360)
function addDropCoinAnimation(obj) {
  switch (targetObj.id[1]) {
    case '6':
      obj.classList.add('coin-drop-animation-row6')
      // transformForCoin = 360
      dropCoinTime = 1000
      break
    case '5':
      obj.classList.add('coin-drop-animation-row5')
      // transformForCoin = 300
      dropCoinTime = 800
      break
    case '4':
      obj.classList.add('coin-drop-animation-row4')
      // transformForCoin = 240
      dropCoinTime = 650
      break
    case '3':
      obj.classList.add('coin-drop-animation-row3')
      // transformForCoin = 180
      dropCoinTime = 500
      break
    case '2':
      obj.classList.add('coin-drop-animation-row2')
      // transformForCoin = 120
      dropCoinTime = 350
      break
    case '1':
      obj.classList.add('coin-drop-animation-row1')
      // transformForCoin = 60
      dropCoinTime = 200
      break
  }
  return obj
}

function removeDropCoinAnimation(obj) {
  obj.classList.remove('coin-drop-animation-row6')
  obj.classList.remove('coin-drop-animation-row5')
  obj.classList.remove('coin-drop-animation-row4')
  obj.classList.remove('coin-drop-animation-row3')
  obj.classList.remove('coin-drop-animation-row2')
  obj.classList.remove('coin-drop-animation-row1')
}

var isWin = false

function dropCoin(obj, coin) {
  removeAllEvents()
  coinDrop.play()

  indicateTimePort.textContent = '0: 10'
  indicateTimeLand.textContent = '0: 10'

  currentLocationID = obj.parentNode.id

  var currentCol = currentLocationID[4]
  var target

  if (document.getElementById('r1-c' + currentCol).childNodes.length === 1) {
    setTimeout(function () {
      // indicateTimePort.textContent = ''
      // indicateTimeLand.textContent = ''
    }, 500)
    indicateTimePort.textContent = 'No More Drop!'
    indicateTimeLand.textContent = 'No More Drop!'
    alertSound.play();
  } else {
    obj = addDropCoinAnimation(obj)
    for (var i = rows - 1; i >= 0; i--) {
      target = document.getElementById('r' + (i + 1) + '-c' + currentCol)
      if (target.childNodes.length === 0) {
        setTimeout(function() {
          // createCoin(coin).style.transform = 'rotate(600deg)'
          var tempCoin = createCoin(coin)
          var transformForCoin = Math.floor(Math.random(0,1)*360)
          tempCoin.style.transform = 'rotate('+transformForCoin+'deg)'
          target.appendChild(tempCoin)
        }, dropCoinTime)
        coinDrop.play()
        target.style.backgroundColor = ''
        if (currentPlayer === 'one') {
          playerOneAnswerArr[i][currentCol - 1] = 1
          playerOneCount++
        } else if (currentPlayer === 'two') {
          playerTwoAnswerArr[i][currentCol - 1] = 1
          playerTwoCount++
        }
        isWin = checkWinCondition(currentPlayer, i, currentCol)
        checkDraw()
        break
      }
    }
    if(!isWin) {
      switchPlayer(obj)
      // displayTarget()
    }
  }
}

// Highlight four coins that made the win
function highlightFourCoins(type, row, col) {
  setTimeout(function() {
    switch (type) {
      case '4row':
        for (var i = 0; i < 4; i++) {
          highlightCoin(row + 1, col + i + 1)
        }
        break
      case '4col':
        for (var i = 0; i < 4; i++) {
          highlightCoin(row + i + 1, col + 1)
        }
        break
      case '4diag-asc':
        for (var i = 0; i < 4; i++) {
          highlightCoin(row + 1 - i, col + 1 + i)
        }
        break
      case '4diag-des':
        for (var i = 0; i < 4; i++) {
          highlightCoin(row + 1 + i, col + 1 + i)
        }
        break
    }
  }, highlightCoinstime)
}

// Way of highlight the four coins which make the win
function highlightCoin(row, col) {
  document.getElementById('r' + row + '-c' + col).style.background = 'red'
}

// Check win condition
function checkWinCondition(currentPlayer, row, col) {
  var currentCount = 0
  var currentPlayerAnswerArr
  if (currentPlayer === 'one') {
    currentCount = playerOneCount
    currentPlayerAnswerArr = playerOneAnswerArr
  } else if (currentPlayer === 'two') {
    currentCount = playerTwoCount
    currentPlayerAnswerArr = playerTwoAnswerArr
  }

  if (currentCount >= 4) {
    // 4 in a row check
    var rowForCheck = Number(row)
    for (var i = 0; i < 4; i++) {
      if (currentPlayerAnswerArr[rowForCheck][i] === 1 &&
        currentPlayerAnswerArr[rowForCheck][i + 1] === 1 &&
        currentPlayerAnswerArr[rowForCheck][i + 2] === 1 &&
        currentPlayerAnswerArr[rowForCheck][i + 3] === 1) {
        highlightFourCoins('4row', rowForCheck, i)
        score(currentPlayer)
        displayWinner(currentPlayer)
        winSound.play();
        timeLeft = 10
        clearInterval(interval)
        indicateTimePort.textContent = 'Time Left'
        indicateTimeLand.textContent = 'Time Left'
        return true
        break
      }
    }
    // 4 in a col check
    var colForCheck = Number(col) - 1
    for (var j = 0; j < 4; j++) {
      if (j + 1 < (cols - 1) && j + 2 < (cols - 1) && j + 3 < (cols - 1)) {
        if (currentPlayerAnswerArr[j][colForCheck] === 1 &&
          currentPlayerAnswerArr[j + 1][colForCheck] === 1 &&
          currentPlayerAnswerArr[j + 2][colForCheck] === 1 &&
          currentPlayerAnswerArr[j + 3][colForCheck] === 1) {
          highlightFourCoins('4col', j, colForCheck)
          score(currentPlayer)
          displayWinner(currentPlayer)
          winSound.play();
          timeLeft = 10
          clearInterval(interval)
          indicateTimePort.textContent = 'Time Left'
          indicateTimeLand.textContent = 'Time Left'
          return true
          break
        }
      }
    }

    // 4 in a diagonal line check
    // acsending
    for (var k = rows - 1; k > rows - 4; k--) {
      for (var l = 0; l <= rows - 3; l++) {
        if (currentPlayerAnswerArr[k][l] === 1 &&
          currentPlayerAnswerArr[k - 1][l + 1] === 1 &&
          currentPlayerAnswerArr[k - 2][l + 2] === 1 &&
          currentPlayerAnswerArr[k - 3][l + 3] === 1) {
          highlightFourCoins('4diag-asc', k, l)
          score(currentPlayer)
          displayWinner(currentPlayer)
          winSound.play();
          timeLeft = 10
          clearInterval(interval)
          indicateTimePort.textContent = 'Time Left'
          indicateTimeLand.textContent = 'Time Left'
          return true
          break
        }
      }
    }

    // descending
    for (var k = 0; k < rows - 3; k++) {
      for (var l = 0; l < rows - 3; l++) {
        if (currentPlayerAnswerArr[k][l] === 1 &&
          currentPlayerAnswerArr[k + 1][l + 1] === 1 &&
          currentPlayerAnswerArr[k + 2][l + 2] === 1 &&
          currentPlayerAnswerArr[k + 3][l + 3] === 1) {
          highlightFourCoins('4diag-des', k, l)
          score(currentPlayer)
          displayWinner(currentPlayer)
          winSound.play()
          timeLeft = 10
          clearInterval(interval)
          indicateTimePort.textContent = 'Time Left'
          indicateTimeLand.textContent = 'Time Left'
          return true
          break
        }
      }
    }
  }
}

// Check draw condition
function checkDraw() {
  if (playerOneCount + playerTwoCount === 42) {
    modalMgmt(modalType1)
    type1Msg1.textContent = 'Draw!'
    type1Msg2.textContent = 'Play Start Again!'
    timeLeft = 10
    clearInterval(interval)
    indicateTimePort.textContent = 'Time Left'
    indicateTimeLand.textContent = 'Time Left'
    alertSound.play();
  }
}

function resetArray() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      playerOneAnswerArr[i][j] = 0
      playerTwoAnswerArr[i][j] = 0
    }
  }
}

// if there's any child node, remove them all
function resetGameBoard() {
  for (var i = 1; i <= rows; i++) {
    for (var j = 1; j <= cols; j++) {
      var currentNode = document.getElementById('r' + i + '-c' + j)
      currentNode.style.background = ''
      if (currentNode.firstChild) {
        currentNode.firstChild.remove()
      }
    }
  }
}

var username1ScorePort = document.querySelector('.username1-score-port')
var username2ScorePort = document.querySelector('.username2-score-port')
var username1ScoreLand = document.querySelector('.username1-score-land')
var username2ScoreLand = document.querySelector('.username2-score-land')

function score(player) {
  if (player === 'one') {
    playerOneScore++
    username1ScorePort.textContent = playerOneScore
    username1ScoreLand.textContent = playerOneScore

  } else if (player === 'two') {
    playerTwoScore++
    username2ScorePort.textContent = playerTwoScore
    username2ScoreLand.textContent = playerTwoScore
  }
}

// Display score after win condition happened
function displayWinner(player) {
  setTimeout(function() {
    modalMgmt(modalType1)
    timeLeft = 10
    if (player === 'one') {
      type1Msg1.textContent = 'Congratulations, ' + playerOne.value + '!'
      type1Msg2.textContent = ' You won!'
    } else if (player === 'two') {
      type1Msg1.textContent = 'Congratulations, ' + playerTwo.value + '!'
      type1Msg2.textContent = ' You won!'
    }
  }, winDisplayTime)
}

// Clear Score
function clearScoreFields() {
  playerOneScore = 0;
  playerTwoScore = 0;
  username1ScorePort.textContent = playerOneScore;
  username2ScorePort.textContent = playerTwoScore;
  username1ScoreLand.textContent = playerOneScore;
  username2ScoreLand.textContent = playerTwoScore;
}

// Add sound effect
var isSoundOn = false
var moveCoin = new playSound("audio/move.mp3", false);
var coinDrop = new playSound("audio/drop.mp3", false);
var alertSound = new playSound("audio/draw.mp3", false);
var winSound = new playSound("audio/win.mp3", false);
var clickSound = new playSound("audio/click.mp3", false);

function playSound(src, isLoop) {
  this.sound = document.createElement("audio")
  this.sound.src = src
  this.sound.loop = isLoop
  this.sound.autoplay = false
  this.sound.setAttribute("preload", "auto")
  this.sound.setAttribute("controls", "none")
  this.sound.style.display = "none"
  document.body.appendChild(this.sound)
  this.play = function () {
    if (isSoundOn) {
      this.sound.play()
    }
  }
  this.stop = function () {
    this.sound.pause()
  }
}

// Timer setting
var timeLeft
var minutes = 0
var seconds = 0
var indicateTimePort = document.querySelector('.time-left-port')
var indicateTimeLand = document.querySelector('.time-left-land')
var interval

function timer(obj, time) {
  timeLeft = time
  clearInterval(interval)
  interval = setInterval(function () {
    if (timeLeft % 60 < 10) {
      seconds = '0' + (timeLeft % 60);
    } else {
      seconds = timeLeft % 60;
    }

    indicateTimePort.textContent = '0: ' + seconds;
    indicateTimeLand.textContent = '0: ' + seconds;

    if (timeLeft === 0) {
      setTimeout(function () {
        // indicateTimePort.textContent = ' '
        // indicateTimeLand.textContent = ' '
      }, alertMsgTime)
      indicateTimePort.textContent = 'Time Out!'
      indicateTimeLand.textContent = 'Time Out!'
      alertSound.play()
      switchPlayer(obj)
    }
    timeLeft--
  }, 1000)
}

// Sound toggle
var soundBtnPort = document.querySelector('.sound-btn-port')
var soundOnOffPort = document.querySelector('.sound-onoff-port')
var soundBtnLand = document.querySelector('.sound-btn-land')
var soundOnOffLand = document.querySelector('.sound-onoff-land')

soundBtnPort.addEventListener('click', function () {
  clickSound.play()
  soundToggle()
})
soundBtnLand.addEventListener('click', function () {
  clickSound.play()
  soundToggle()
})

function soundToggle() {
  isSoundOn = !isSoundOn
  if (isSoundOn) {
    soundOnOffPort.textContent = 'ON'
    soundOnOffPort.style.color = 'greenyellow'
    soundOnOffLand.textContent = 'ON'
    soundOnOffLand.style.color = 'greenyellow'
  } else {
    soundOnOffPort.textContent = 'OFF'
    soundOnOffPort.style.color = 'red'
    soundOnOffLand.textContent = 'OFF'
    soundOnOffLand.style.color = 'red'
  }
}

function modalMgmt(modalObj) {
  modal.style.display = 'none'
  modalUsername.style.display = 'none'
  modalType1.style.display = 'none'
  if(modalObj) {
    modal.style.display = 'block'
    modalObj.style.display = 'block'
  }
}

// Start game functions
var startBtn = document.querySelector('.start-btn')
startBtn.addEventListener('click', function() {
  clickSound.play()
  startGame(10)
})

var playerOne = document.querySelector('.player1')
var playerTwo = document.querySelector('.player2')

//for portrait
var userNameOnePort = document.querySelector('.username1-port')
var userNameTwoPort = document.querySelector('.username2-port')

//for landscape
var userNameOneLand = document.querySelector('.username1-land')
var userNameTwoLand = document.querySelector('.username2-land')

function startGame(time) {
  isWin = false
  modalMgmt(null)
  resetArray()
  resetGameBoard()

  if (playerOne.value === '') {
    playerOne.value = 'player 1'
  }
  if (playerTwo.value === '') {
    playerTwo.value = 'player 2'
  }

  userNameOnePort.textContent = playerOne.value
  userNameTwoPort.textContent = playerTwo.value
  userNameOneLand.textContent = playerOne.value
  userNameTwoLand.textContent = playerTwo.value

  coinLocation = firstCoinLocation
  currentLocationID = 'r0-c4'

  var playerCoinObj
  if (currentPlayer === 'one') {
    userNameOnePort.style.color = 'gold'
    userNameTwoPort.style.color = 'white'
    userNameOneLand.style.color = 'gold'
    userNameTwoLand.style.color = 'white'
    coinLocation.appendChild(playerOneCoinObj)
    playerCoinObj = playerOneCoinObj
  } else {
    userNameOnePort.style.color = 'white'
    userNameTwoPort.style.color = 'gold'
    userNameOneLand.style.color = 'white'
    userNameTwoLand.style.color = 'gold'
    coinLocation.appendChild(playerTwoCoinObj)
    playerCoinObj = playerTwoCoinObj
  }

  playerCoinObj = removeDropCoinAnimation(playerCoinObj)

  displayTarget()
  addAllEvents()
  timer(playerCoinObj, time)
}

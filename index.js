const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/'

const newGameBtn = document.querySelector("#new-game")
const inputField = document.querySelector("#game-name")
const playerName = document.querySelector("#player-name")
const newScoreField = document.querySelector("#score-field")
const newScoreBtn = document.querySelector("#new-score")
let gameId = 0


async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

const validInput = (name) => {
  return (name.length > 0)
}


newGameBtn.addEventListener('click', () => {
  const input = inputField.value;
  if (!validInput(input)) {
    return;
  }
  inputField.value = "";
  const gameObj = {
    "name": input
  }
  postData(api + 'games', gameObj)
    .then(data => {
      gameId = data.result.match(/Game with ID: ([^ ]+)/)[1];
      console.log(gameId)
    });
})

newScoreBtn.addEventListener('click', () => {
  const newScore = newScoreField.value;
  const newName = playerName.value;
  if (gameId == 0 || !validInput(newScore) || !validInput(newName)) {
    return;
  }
  const scoreObj = {
    "user": newName,
    "score": newScore
  }
  postData(api + 'games/' + gameId + '/scores', scoreObj)
    .then(data => console.log(data));

})

const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/'

const newGameBtn = document.querySelector("#new-game")
const inputField = document.querySelector("#game-name")
const playerName = document.querySelector("#player-name")
const newScoreField = document.querySelector("#score-field")
const newScoreBtn = document.querySelector("#new-score")
const refreshBtn = document.querySelector("#refresh")
const leaderList = document.querySelector('#leader-list');
let gameId = 0

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

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


newGameBtn.addEventListener('click', (gameId) => {
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

newScoreBtn.addEventListener('click', (gameId) => {
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


refreshBtn.addEventListener('click', (gameId) => {
  let leaderboard
  getData(api + 'games/' + gameId + '/scores')
    .then(data => {
        leaderboard = data.result
        console.log(leaderboard)
        leaderList.textContent = ""
        leaderboard.forEach((item) => {
          const listItem = document.createElement("li")
          listItem.textContent = `Player: ${item.user}. Score: ${item.score}`
          leaderList.appendChild(listItem)
        })
      }

    );
})

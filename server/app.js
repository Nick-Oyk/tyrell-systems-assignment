const express = require('express')
const app = express()

function distributeCards (numPeople) {
  const suits = ['S', 'H', 'D', 'C']
  const cards = []

  //assign suits to cards
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 13; j++) {
      cards.push(
        `${suits[i]}-${
          j > 1 && j < 11
            ? j
            : j === 1
            ? 'A'
            : j === 10
            ? 'X'
            : j === 11
            ? 'J'
            : j === 12
            ? 'Q'
            : 'K'
        }`
      )
    }
  }

  // Shuffle the cards
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }

  const distribution = {}
  let personIndex = 0

  cards.forEach(card => {
    if (!distribution[personIndex]) {
      distribution[personIndex] = []
    }
    distribution[personIndex].push(card)
    personIndex = (personIndex + 1) % numPeople
  })

  return distribution
}

app.post('/distribute-cards/:numPeople', (req, res) => {
  const numPeople = parseInt(req.params.numPeople)

  if (isNaN(numPeople) || numPeople < 1) {
    res.status(400).send('Input value does not exist or value is invalid')
    return
  }

  const cardDistribution = distributeCards(numPeople)
  res
    .header({ 'Access-Control-Allow-Origin': 'http://localhost:3000' })
    .json(cardDistribution)
})

const PORT = 3300
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

import React, { useState } from 'react'
import axios from 'axios'
import './App.css' // Import CSS file

function App () {
  const [numPeople, setNumPeople] = useState('')
  const [cardDistribution, setCardDistribution] = useState([])
  const [error, setError] = useState('')

  const handleInputChange = e => {
    setNumPeople(e.target.value)
  }

  const distributeCards = () => {
    axios
      .post(`http://localhost:3300/distribute-cards/${numPeople}`)
      .then(response => {
        if (!response.data) {
          throw new Error('No data received')
        }
        setCardDistribution(response.data)
        setError('')
      })
      .catch(error => {
        setError('Error distributing cards. Please try again.')
        console.error('There was an error distributing cards:', error)
      })
  }

  return (
    <div className='card-distribution-container'>
      <h2>Card Distribution</h2>
      <div className='input-section'>
        <label htmlFor='numPeople'>Enter the number of people:</label>
        <input
          type='number'
          id='numPeople'
          min='1'
          value={numPeople}
          onChange={handleInputChange}
        />
        <button onClick={distributeCards}>Distribute Cards</button>
      </div>

      {error && <p className='error-message'>{error}</p>}

      <div className='card-output'>
        {Object.entries(cardDistribution).map(([personIndex, cards]) => (
          <p key={personIndex}>
            Person {parseInt(personIndex) + 1}: {cards.join(',')}
          </p>
        ))}
      </div>
    </div>
  )
}

export default App

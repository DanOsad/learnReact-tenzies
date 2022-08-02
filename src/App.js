import React, {useState, useEffect} from 'react'
import Die from './components/Die'
import {nanoid} from 'nanoid'

export default function App() {

/**
 * Challenge: Update the `holdDice` function to flip
 * the `isHeld` property on the object in the array
 * that was clicked, based on the `id` prop passed
 * into the function.
 * 
 * Hint: as usual, there's > 1 way to accomplish this.
 * I'll be using `dice.map()` and checking for the `id`
 * of the die to determine which one to flip `isHeld` on,
 * but you can do whichever way makes the most sense to you.
 */

  const randomDice = () => {
    let diceArr = []
    for (let i=0; i<10; i++) {
      let randomNum = Math.ceil(Math.random() * 6)
      diceArr.push({ 
        id: nanoid(),
        value: randomNum, 
        isHeld: false,
      })
    }
    return diceArr
  }

  const holdDice = id => {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }
  
  const [dice, setDice] = useState(randomDice())
  
  const diceArr = dice.map(die => {
    return (
      <Die 
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    )
  })

  return (
    <main>
      <div className='die-container'>
        {diceArr}
      </div>
      <button type='button' className='roll-dice-btn' onClick={() => setDice(randomDice)}>Roll</button>
    </main>
  )
}
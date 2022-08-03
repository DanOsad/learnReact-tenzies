import React, {useState, useEffect} from 'react'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

  // CREATES RANDOM DICE
  const randomDice = () => {
    let diceArr = []
    for (let i=0; i<10; i++) {
      diceArr.push({ 
        id: nanoid(),
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
      })
    }
    return diceArr
  }
  
  // SETS STATES
  const [dice, setDice] = useState(randomDice)
  const [tenzies, setTenzies] = useState(false)

  // HOLDS DICE VALUE
  const holdDice = id => {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  // ROLLS DICE IF !isHeld
  const rollDice = () => {
    if (tenzies) {
      setDice(randomDice())
      setTenzies(prevState => !prevState)
    } else {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? 
               die : 
               { 
                id: nanoid(),
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
              }
      }))
    }
  }
  
  // MAPS OUT ALL DICE INTO JSX ELEMENTS
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

  // CHECK FOR WIN CONDITIONS
  useEffect(() => {
    if (dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)) {
      setTenzies(prevState => !prevState)
      console.log("You won!")
    }
  }, [dice])

  // COMPONENT RENDER
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='die-container'>
        {diceArr}
      </div>
      <button 
        type='button' 
        className='roll-dice-btn' 
        onClick={() => rollDice()}
      >
        { tenzies ? "Reset" : "Roll"}
      </button>
    </main>
  )
}
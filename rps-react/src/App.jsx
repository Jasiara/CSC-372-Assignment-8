import { useEffect, useState } from 'react'
import PlayerThrow from './components/PlayerThrow'
import ComputerThrow from './components/ComputerThrow'
import ResultDisplay from './components/ResultDisplay'
import ScoreBoard from './components/ScoreBoard'
import ResetButton from './components/ResetButton'
import './App.css'

const THROW_OPTIONS = [
  {
    id: 'rock',
    label: 'Rock',
    image: '/images/rock.PNG',
    alt: 'Closed fist representing rock',
  },
  {
    id: 'paper',
    label: 'Paper',
    image: '/images/paper.PNG',
    alt: 'Open hand representing paper',
  },
  {
    id: 'scissors',
    label: 'Scissors',
    image: '/images/scissors.PNG',
    alt: 'Hand showing two fingers representing scissors',
  },
]

const QUESTION_THROW = {
  id: 'waiting',
  label: 'Waiting for your selection',
  image: '/images/question-mark.PNG',
  alt: 'Question mark indicating the computer is waiting',
}

const WIN_RULES = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
}

const determineResult = (player, computer) => {
  if (!player || !computer) return ''
  if (player === computer) return 'tie'
  return WIN_RULES[player] === computer ? 'win' : 'lose'
}

function App() {
  const [playerChoice, setPlayerChoice] = useState('')
  const [computerChoice, setComputerChoice] = useState('')
  const [displayedComputerThrow, setDisplayedComputerThrow] = useState(QUESTION_THROW)
  const [result, setResult] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 })

  useEffect(() => {
    if (!isAnimating || !playerChoice) {
      return undefined
    }

    const shuffleIntervalMs = 500
    const animationDurationMs = 3000
    let currentIndex = 0

    const intervalId = setInterval(() => {
      setDisplayedComputerThrow(THROW_OPTIONS[currentIndex % THROW_OPTIONS.length])
      currentIndex += 1
    }, shuffleIntervalMs)

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId)
      const finalChoice = THROW_OPTIONS[Math.floor(Math.random() * THROW_OPTIONS.length)]
      setComputerChoice(finalChoice.id)
      setDisplayedComputerThrow(finalChoice)
      const roundResult = determineResult(playerChoice, finalChoice.id)
      setResult(roundResult)
      setScore((prev) => ({
        wins: prev.wins + (roundResult === 'win' ? 1 : 0),
        losses: prev.losses + (roundResult === 'lose' ? 1 : 0),
        ties: prev.ties + (roundResult === 'tie' ? 1 : 0),
      }))
      setIsAnimating(false)
    }, animationDurationMs)

    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [isAnimating, playerChoice])

  const handlePlayerSelect = (choice) => {
    if (isAnimating) return
    setPlayerChoice(choice)
    setComputerChoice('')
    setDisplayedComputerThrow(QUESTION_THROW)
    setResult('')
    setIsAnimating(true)
  }

  const handleReset = () => {
    setPlayerChoice('')
    setComputerChoice('')
    setDisplayedComputerThrow(QUESTION_THROW)
    setResult('')
    setIsAnimating(false)
    setScore({ wins: 0, losses: 0, ties: 0 })
  }

  const computerLabel = displayedComputerThrow?.label || QUESTION_THROW.label

  return (
    <main className="app-shell">
      <header>
        <p className="eyebrow">CSC 372 • Assignment 8</p>
        <h1>Rock · Paper · Scissors</h1>
        <p className="lead">
          Choose a throw, watch the computer shuffle, and see who wins each round. Track your score across games
          and reset any time.
        </p>
      </header>

      <div className="panels-grid">
        <PlayerThrow
          options={THROW_OPTIONS}
          selectedThrow={playerChoice}
          onSelect={handlePlayerSelect}
          disabled={isAnimating}
        />

        <ComputerThrow
          imageSrc={displayedComputerThrow.image}
          label={computerLabel}
          isAnimating={isAnimating}
        />

        <ResultDisplay result={result} playerChoice={playerChoice} computerChoice={computerChoice} />
      </div>

      <div className="footer-grid">
        <ScoreBoard wins={score.wins} losses={score.losses} ties={score.ties} />
        <ResetButton onReset={handleReset} disabled={isAnimating && !result} />
      </div>

      <section className="rules-panel">
        <h2>How winners are decided</h2>
        <ul>
          <li>Rock crushes scissors.</li>
          <li>Paper covers rock.</li>
          <li>Scissors cut paper.</li>
        </ul>
        <p>Each round accounts for all nine possible combinations to ensure fair outcomes.</p>
      </section>
    </main>
  )
}

export default App

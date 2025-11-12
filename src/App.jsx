import { useEffect, useState } from 'react' // Import React hooks for state and effects
import PlayerThrow from './components/PlayerThrow' // Bring in the player interaction component
import ComputerThrow from './components/ComputerThrow' // Bring in the computer display component
import ResultDisplay from './components/ResultDisplay' // Bring in the round outcome component
import ScoreBoard from './components/ScoreBoard' // Bring in the scoreboard component
import ResetButton from './components/ResetButton' // Bring in the reset control component
import './App.css' // Load the page-level styles

// Preload the three possible throws so components can render consistently
const THROW_OPTIONS = [ // List of selectable throws for both player and computer
  {
    id: 'rock', // Identifier for rock
    label: 'Rock', // Label shown to the player
    image: '/images/rock.PNG', // Image path for rock
    alt: 'Closed fist representing rock', // Accessible description for the rock image
  },
  {
    id: 'paper', // Identifier for paper
    label: 'Paper', // Label shown to the player
    image: '/images/paper.PNG', // Image path for paper
    alt: 'Open hand representing paper', // Accessible description for the paper image
  },
  {
    id: 'scissors', // Identifier for scissors
    label: 'Scissors', // Label shown to the player
    image: '/images/scissors.PNG', // Image path for scissors
    alt: 'Hand showing two fingers representing scissors', // Accessible description for the scissors image
  },
]

// Default object for the computer panel before the player chooses
const QUESTION_THROW = {
  id: 'waiting', // Placeholder identifier so hooks have data
  label: 'Waiting for your selection', // Copy shown before the round starts
  image: '/images/question-mark.PNG', // Question mark graphic path
  alt: 'Question mark indicating the computer is waiting', // Accessible description for placeholder
}

// Simple lookup table: key beats value (rock beats scissors, etc.)
const WIN_RULES = {
  rock: 'scissors', // Rock defeats scissors
  paper: 'rock', // Paper defeats rock
  scissors: 'paper', // Scissors defeat paper
}

// Compare player/computer throws and return win/lose/tie labels
const determineResult = (player, computer) => {
  if (!player || !computer) return '' // Guard against incomplete data
  if (player === computer) return 'tie' // Identical throws always tie
  return WIN_RULES[player] === computer ? 'win' : 'lose' // Check lookup map for winner
}

function App() {
  // Primary round state: both choices, what the computer is showing, and round result
  const [playerChoice, setPlayerChoice] = useState('') // Stores the player's current selection
  const [computerChoice, setComputerChoice] = useState('') // Stores the computer's final selection
  const [displayedComputerThrow, setDisplayedComputerThrow] = useState(QUESTION_THROW) // Controls what image is shown during shuffling
  const [result, setResult] = useState('') // Tracks the round outcome label
  const [isAnimating, setIsAnimating] = useState(false) // Flags when the computer is mid-animation
  // Track totals for extra credit scoring
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 }) // Aggregate scoreboard counts

  useEffect(() => {
    if (!isAnimating || !playerChoice) {
      return undefined // Skip animation work until a round is actually running
    }

    // Spin through each throw every 500ms to mimic shuffle animation
    const shuffleIntervalMs = 500 // Interval length for swapping images
    const animationDurationMs = 3000 // Total time the animation should run
    let currentIndex = 0 // Counter so we rotate through the three images

    const intervalId = setInterval(() => {
      setDisplayedComputerThrow(THROW_OPTIONS[currentIndex % THROW_OPTIONS.length]) // Swap to the next throw image
      currentIndex += 1 // Move pointer ahead for the next cycle
    }, shuffleIntervalMs) // Run the swap at the defined interval

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId) // Stop the shuffle loop once time expires
      // After animation finishes, pick a random throw for the computer
      const finalChoice = THROW_OPTIONS[Math.floor(Math.random() * THROW_OPTIONS.length)] // Select a random throw
      setComputerChoice(finalChoice.id) // Record the computer's definitive choice
      setDisplayedComputerThrow(finalChoice) // Show the final image in the UI
      const roundResult = determineResult(playerChoice, finalChoice.id) // Figure out who won
      setResult(roundResult) // Store the textual result for display
      setScore((prev) => ({
        wins: prev.wins + (roundResult === 'win' ? 1 : 0), // Increment wins when appropriate
        losses: prev.losses + (roundResult === 'lose' ? 1 : 0), // Increment losses when appropriate
        ties: prev.ties + (roundResult === 'tie' ? 1 : 0), // Increment ties when appropriate
      }))
      setIsAnimating(false) // Mark the animation as complete
    }, animationDurationMs) // Run the timeout for the full animation duration

    return () => {
      clearInterval(intervalId) // Clean up the interval when dependencies change
      clearTimeout(timeoutId) // Clean up the timeout as well
    }
  }, [isAnimating, playerChoice]) // Re-run effect whenever animation flag or player choice changes

  // Start a round when the player picks a throw
  const handlePlayerSelect = (choice) => {
    if (isAnimating) return // Ignore clicks while shuffle is already running
    setPlayerChoice(choice) // Store the newly chosen throw
    setComputerChoice('') // Clear out the previous computer result
    setDisplayedComputerThrow(QUESTION_THROW) // Reset the computer panel to question mark
    setResult('') // Clear previous outcome text
    setIsAnimating(true) // Trigger the shuffle effect
  }

  // Reset button clears everything, including the scoreboard
  const handleReset = () => {
    setPlayerChoice('') // Drop the player choice back to empty
    setComputerChoice('') // Drop the computer choice back to empty
    setDisplayedComputerThrow(QUESTION_THROW) // Show the question mark again
    setResult('') // Remove the last result label
    setIsAnimating(false) // Ensure no animation is running
    setScore({ wins: 0, losses: 0, ties: 0 }) // Reset all scoreboard totals
  }

  const computerLabel = displayedComputerThrow?.label || QUESTION_THROW.label // Derive text shown under the computer image

  return ( // Render the complete application UI
    <main className="app-shell">{/* Primary layout wrapper */}
      <header>{/* Introductory copy for the assignment */}
        <p className="eyebrow">CSC 372 • Assignment 8</p>
        <h1>Rock · Paper · Scissors</h1>
        <p className="lead">
          Choose a throw, watch the computer shuffle, and see who wins each round. Track your score across games
          and reset any time.
        </p>
      </header>

      <div className="panels-grid">{/* Three-panel layout for player/computer/results */}
        <PlayerThrow
          options={THROW_OPTIONS}
          selectedThrow={playerChoice}
          onSelect={handlePlayerSelect}
          disabled={isAnimating}
        />{/* Pass configuration and handlers to the player component */}

        <ComputerThrow
          imageSrc={displayedComputerThrow.image}
          label={computerLabel}
          isAnimating={isAnimating}
        />{/* Show the shuffled/final computer throw */}

        <ResultDisplay result={result} playerChoice={playerChoice} computerChoice={computerChoice} />{/* Announce the outcome */}
      </div>

      <div className="footer-grid">{/* Footer row with scoreboard plus reset control */}
        <ScoreBoard wins={score.wins} losses={score.losses} ties={score.ties} />{/* Display cumulative stats */}
        <ResetButton onReset={handleReset} disabled={isAnimating && !result} />{/* Let players clear progress */}
      </div>

      <section className="rules-panel">{/* Reminder of the game rules */}
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

export default App // Export component for use in main entry

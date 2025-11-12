import PropTypes from 'prop-types' // Import PropTypes for runtime prop checks

// Announces the round outcome plus a short descriptive sentence
const ResultDisplay = ({ result, playerChoice, computerChoice }) => {
  let statusText = 'Make a selection to start the round.' // Default helper text before play begins

  if (result && playerChoice && computerChoice) {
    const playerLabel = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1) // Format player's throw nicely
    const computerLabel = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1) // Format computer's throw nicely
    statusText = `You chose ${playerLabel}. The computer chose ${computerLabel}.` // Build descriptive sentence
  }

  return (
    <section className="panel result-panel" aria-live="polite">{/* Area for textual outcome updates */}
      <h2>Round Result</h2>
      <p className="result-text" data-result={result || 'pending'}>
        {result ? result.toUpperCase() : 'Ready?'}{/* Data attribute lets CSS color-code win/lose/tie */}
      </p>
      <p className="status-text">{statusText}</p>{/* Secondary sentence describing both throws */}
    </section>
  )
}

ResultDisplay.propTypes = {
  result: PropTypes.string, // Accept win/lose/tie/pending text
  playerChoice: PropTypes.string, // Accept player's raw choice
  computerChoice: PropTypes.string, // Accept computer's raw choice
}

ResultDisplay.defaultProps = {
  result: '', // No result until a round finishes
  playerChoice: '', // Assume no choice yet
  computerChoice: '', // Assume no computer throw yet
}

export default ResultDisplay // Export for use inside App

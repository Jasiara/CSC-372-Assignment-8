import PropTypes from 'prop-types'

const ResultDisplay = ({ result, playerChoice, computerChoice }) => {
  let statusText = 'Make a selection to start the round.'

  if (result && playerChoice && computerChoice) {
    const playerLabel = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
    const computerLabel = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
    statusText = `You chose ${playerLabel}. The computer chose ${computerLabel}.`
  }

  return (
    <section className="panel result-panel" aria-live="polite">
      <h2>Round Result</h2>
      <p className="result-text" data-result={result || 'pending'}>
        {result ? result.toUpperCase() : 'Ready?'}
      </p>
      <p className="status-text">{statusText}</p>
    </section>
  )
}

ResultDisplay.propTypes = {
  result: PropTypes.string,
  playerChoice: PropTypes.string,
  computerChoice: PropTypes.string,
}

ResultDisplay.defaultProps = {
  result: '',
  playerChoice: '',
  computerChoice: '',
}

export default ResultDisplay

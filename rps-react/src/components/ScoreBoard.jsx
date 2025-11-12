import PropTypes from 'prop-types' // Import PropTypes for validation

// Simple stat display for wins / losses / ties (extra credit requirement)
const ScoreBoard = ({ wins, losses, ties }) => {
  return (
    <section className="panel scoreboard-panel" aria-live="polite">{/* Grouping for score totals */}
      <h2>Scoreboard</h2>
      <dl className="score-grid">{/* Definition list keeps label/value pairs semantic */}
        <div>
          <dt>Wins</dt>
          <dd>{wins}</dd>{/* Display running win count */}
        </div>
        <div>
          <dt>Losses</dt>
          <dd>{losses}</dd>{/* Display running loss count */}
        </div>
        <div>
          <dt>Ties</dt>
          <dd>{ties}</dd>{/* Display running tie count */}
        </div>
      </dl>
    </section>
  )
}

ScoreBoard.propTypes = {
  wins: PropTypes.number, // Accept numeric wins
  losses: PropTypes.number, // Accept numeric losses
  ties: PropTypes.number, // Accept numeric ties
}

ScoreBoard.defaultProps = {
  wins: 0, // Default wins to zero
  losses: 0, // Default losses to zero
  ties: 0, // Default ties to zero
}

export default ScoreBoard // Export component for inclusion in the footer area

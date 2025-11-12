import PropTypes from 'prop-types'

const ScoreBoard = ({ wins, losses, ties }) => {
  return (
    <section className="panel scoreboard-panel" aria-live="polite">
      <h2>Scoreboard</h2>
      <dl className="score-grid">
        <div>
          <dt>Wins</dt>
          <dd>{wins}</dd>
        </div>
        <div>
          <dt>Losses</dt>
          <dd>{losses}</dd>
        </div>
        <div>
          <dt>Ties</dt>
          <dd>{ties}</dd>
        </div>
      </dl>
    </section>
  )
}

ScoreBoard.propTypes = {
  wins: PropTypes.number,
  losses: PropTypes.number,
  ties: PropTypes.number,
}

ScoreBoard.defaultProps = {
  wins: 0,
  losses: 0,
  ties: 0,
}

export default ScoreBoard

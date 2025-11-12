import PropTypes from 'prop-types'

const PlayerThrow = ({ options, selectedThrow, onSelect, disabled }) => {
  return (
    <section className="panel player-panel" aria-live="polite">
      <h2>Player Throw</h2>
      <p className="panel-subtitle">Pick a move to challenge the computer.</p>
      <div className="throw-grid">
        {options.map((option) => {
          const isSelected = selectedThrow === option.id
          return (
            <button
              key={option.id}
              type="button"
              className={`throw-button ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(option.id)}
              disabled={disabled}
              aria-pressed={isSelected}
              aria-label={`Choose ${option.label}`}
            >
              <img src={option.image} alt={option.alt} />
              <span>{option.label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

PlayerThrow.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedThrow: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

PlayerThrow.defaultProps = {
  selectedThrow: '',
  disabled: false,
}

export default PlayerThrow

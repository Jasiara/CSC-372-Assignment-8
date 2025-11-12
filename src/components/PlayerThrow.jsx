import PropTypes from 'prop-types' // Import PropTypes to validate component props

// Player-facing list of throw options with selection highlighting
const PlayerThrow = ({ options, selectedThrow, onSelect, disabled }) => {
  return (
    <section className="panel player-panel" aria-live="polite">{/* Container for the player's controls */}
      <h2>Player Throw</h2>
      <p className="panel-subtitle">Pick a move to challenge the computer.</p>
      <div className="throw-grid">{/* Grid keeps buttons evenly spaced */}
        {options.map((option) => {
          const isSelected = selectedThrow === option.id // Track which throw is currently active
          return (
            <button
              key={option.id} // Ensure React can reconcile list updates
              type="button" // Explicit button type prevents implicit form behavior
              className={`throw-button ${isSelected ? 'selected' : ''}`} // Add highlight class when chosen
              onClick={() => onSelect(option.id)} // Inform parent which throw was clicked
              disabled={disabled} // Prevent clicks while animation runs
              aria-pressed={isSelected} // Convey toggle state to assistive tech
              aria-label={`Choose ${option.label}`} // Describe the action for screen readers
            >
              <img src={option.image} alt={option.alt} />{/* Icon representing the throw */}
              <span>{option.label}</span>{/* Text label for each throw */}
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
      id: PropTypes.string.isRequired, // Each option needs an id
      label: PropTypes.string.isRequired, // Label must be a string
      image: PropTypes.string.isRequired, // Image path must be provided
      alt: PropTypes.string.isRequired, // Accessible alt text is required
    })
  ).isRequired, // Options array itself is required
  selectedThrow: PropTypes.string, // Player choice can be empty or string
  onSelect: PropTypes.func.isRequired, // Parent must supply click handler
  disabled: PropTypes.bool, // Button group can be disabled
}

PlayerThrow.defaultProps = {
  selectedThrow: '', // Default to no selection
  disabled: false, // Allow clicks unless parent overrides
}

export default PlayerThrow // Export component for app-level use

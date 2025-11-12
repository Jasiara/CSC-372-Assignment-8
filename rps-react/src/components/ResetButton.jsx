import PropTypes from 'prop-types' // Import PropTypes for prop validation

// Dedicated control so players can clear both the current round and scoreboard
const ResetButton = ({ onReset, disabled }) => {
  return (
    <button
      type="button" // Explicitly render a button element
      className="reset-button" // Apply special styling
      onClick={onReset} // Trigger parent-provided reset handler
      disabled={disabled} // Prevent interaction when animation is active
    >
      Reset Game
    </button>
  )
}

ResetButton.propTypes = {
  onReset: PropTypes.func.isRequired, // Parent must supply a handler
  disabled: PropTypes.bool, // Disabled state optional
}

ResetButton.defaultProps = {
  disabled: false, // Default to enabled button
}

export default ResetButton // Export for inclusion alongside the scoreboard

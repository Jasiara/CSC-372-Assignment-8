import PropTypes from 'prop-types'

const ResetButton = ({ onReset, disabled }) => {
  return (
    <button
      type="button"
      className="reset-button"
      onClick={onReset}
      disabled={disabled}
    >
      Reset Game
    </button>
  )
}

ResetButton.propTypes = {
  onReset: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

ResetButton.defaultProps = {
  disabled: false,
}

export default ResetButton

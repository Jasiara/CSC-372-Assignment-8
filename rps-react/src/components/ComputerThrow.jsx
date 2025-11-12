import PropTypes from 'prop-types'

const ComputerThrow = ({ imageSrc, label, isAnimating }) => {
  return (
    <section className="panel computer-panel" aria-live="polite">
      <h2>Computer Throw</h2>
      <div className={`computer-display ${isAnimating ? 'shuffling' : ''}`}>
        <img src={imageSrc} alt={label} />
        <p>{isAnimating ? 'Shuffling...' : label}</p>
      </div>
    </section>
  )
}

ComputerThrow.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isAnimating: PropTypes.bool,
}

ComputerThrow.defaultProps = {
  isAnimating: false,
}

export default ComputerThrow

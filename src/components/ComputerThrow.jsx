import PropTypes from 'prop-types' // Import PropTypes to keep props well-defined

// Shows either the question mark or the computer's active throw + animation state
const ComputerThrow = ({ imageSrc, label, isAnimating }) => {
  return (
    <section className="panel computer-panel" aria-live="polite">{/* Dedicated area for computer status */}
      <h2>Computer Throw</h2>
      <div className={`computer-display ${isAnimating ? 'shuffling' : ''}`}>{/* Add pulse class while shuffling */}
        <img src={imageSrc} alt={label} />{/* Swap images as animation progresses */}
        <p>{isAnimating ? 'Shuffling...' : label}</p>{/* Show text feedback for animation vs final label */}
      </div>
    </section>
  )
}

ComputerThrow.propTypes = {
  imageSrc: PropTypes.string.isRequired, // Require an image path to render
  label: PropTypes.string.isRequired, // Require label text for alt + caption
  isAnimating: PropTypes.bool, // Animation flag is optional
}

ComputerThrow.defaultProps = {
  isAnimating: false, // Default to a static display
}

export default ComputerThrow // Allow other files to import this panel

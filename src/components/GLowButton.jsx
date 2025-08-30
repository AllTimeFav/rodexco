export default function GlowButton ({ children, className, onClick, simple = false }) {
  return (
    <button
      onClick={onClick}
      className={`glow-button ${className || ''}`}
      data-animate-on-view
    >
      {/* Animated glow border */}
      <div className={simple ? '' : 'glow-border'} />
      {/* Orb traveling around the border */}
      {simple ? null : (
        <div className="glow-orb-track">
          <span className="glow-orb" />
        </div>
      )}
      <div className="glow-button-bg" />

      {/* Button content */}
      <span className="glow-button-content">{children}</span>

      {/* Inner glow effect */}
      <div className="glow-inner" />
    </button>
  )
}
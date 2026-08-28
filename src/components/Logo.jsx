export default function Logo({ size = 18, style = {} }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 3, textDecoration: 'none', ...style }}>
      <span style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 900,
        fontSize: size, color: '#f0ede6', letterSpacing: '-0.02em',
      }}>I.D.E.A</span>
      <span style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 900,
        fontSize: size, color: '#5ed29c', letterSpacing: '-0.02em',
        marginLeft: 3,
      }}>Code</span>
    </span>
  )
}

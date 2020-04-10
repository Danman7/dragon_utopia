import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.45,
  googleFonts: [
    {
      name: 'Roboto Slab',
      styles: ['200', '300', '400', '600', '800']
    }
  ],
  headerFontFamily: ['Roboto Slab', 'serif'],
  bodyFontFamily: ['Roboto Slab', 'sans-serif']
})

// Insert styles directly into the <head>
typography.injectStyles()

export default typography

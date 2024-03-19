/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

/**
 * plugin for radial gradients (tailwind currently don't support radial gradients)
 */
const radialGradientPlugin = plugin(
  function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        // map to bg-radient-[*]
        'bg-radient': value => ({
          'background-image': `radial-gradient(${value},var(--tw-gradient-stops))`,
        }),
      },
      { values: theme('radialGradients') }
    )
  },
  {
    theme: {
      radialGradients: _presets(),
    },
  }
)

/**
 * utility for radial gradient presets
 */
function _presets() {
  const shapes = ['circle', 'ellipse'];
  const pos = {
    c: 'center',
    t: 'top',
    b: 'bottom',
    l: 'left',
    r: 'right',
    tl: 'top left',
    tr: 'top right',
    bl: 'bottom left',
    br: 'bottom right',
  };
  let result = {};
  for (const shape of shapes)
    for (const [posName, posValue] of Object.entries(pos))
      result[`${shape}-${posName}`] = `${shape} at ${posValue}`;

  return result;
}

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/preline/preline.js',
    './node_modules/@mediakular/gridcraft/dist/themes/**/*.{js,svelte}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
    radialGradientPlugin
  ],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
    colors: {
      'primary': '#8bcd50',
      'primary-50': '#F9F9F9',
      'primary-100': '#E8F5DC',
      'primary-200': '#EEF8E6',
      'blue': '#1491D9',
      'blue-900': '#002251',
      'black': '#000000',
      'black-200': '#242424',
      'black-100': '#161616',
      'black-300': '#1A1D1E',
      'white': '#ffffff',
      'gray': '#A4A4A6',
      'gray-strong': '#4A4A4A',
      'gray-light': '#E6E6E6',
      'light-gray': '#F2F2F2',
      'gray-50': '#E3E8F1',
      'gray-100': '#DADADA',
      'gray-200': '#C0C0C0',
      'gray-300': '#4D4D4D',
      'gray-400': '#777777',
      'gray-500': '#434343',
      'gray-600': '#4F4F4F',
      'gray-800': '#6A6A6A',
      'gray-700': '#2F2F2F',
      'green-100': '#F4F4F4',
      'transparent': 'transparent',
      'orange': '#EC5B22',
      'orange-100': '#EEA86C',
      'yellow': '#FFBF2C',
      'purple-900': '#2D264B',
      'red-300': 'rgb(239 68 68)',
      'red-200': '#FF5757'
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ]
}

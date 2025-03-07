import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'cursor-pointer relative inline-flex items-center justify-center gap-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300',
  {
    variants: {
      color: {
        default: '',
        secondary: '', // Gray
        muted: '',
        primary: '', // Indigo
        info: '', // Blue
        success: '', // Green
        warning: '', // Yellow
        error: '', // Red
        transparent: ''
      },
      variant: {
        solid: '',
        pastel: '',
        outlined: ''
      },
      shape: {
        straight: '',
        rounded: 'rounded-md',
        smooth: 'rounded-lg',
        curved: 'rounded-xl',
        full: 'rounded-full'
      },
      size: {
        sm: 'h-8 px-2.5 py-2',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-5 py-2'
      },
      shadow: {
        none: '',
        default: 'hover:enabled:shadow-xl',
        secondary: 'hover:enabled:shadow-xl',
        muted: 'hover:enabled:shadow-xl',
        primary:
          'hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/50 dark:hover:enabled:shadow-indigo-800/20',
        info: 'hover:enabled:shadow-xl hover:enabled:shadow-blue-500/50 dark:hover:enabled:shadow-blue-800/20',
        success:
          'hover:enabled:shadow-xl hover:enabled:shadow-green-500/50 dark:hover:enabled:shadow-green-800/20',
        warning:
          'hover:enabled:shadow-xl hover:enabled:shadow-yellow-500/50 dark:hover:enabled:shadow-yellow-800/20',
        error:
          'hover:enabled:shadow-xl hover:enabled:shadow-red-500/50 dark:hover:enabled:shadow-red-800/20'
      }
    },

    compoundVariants: [
      {
        color: 'default',
        variant: 'solid',
        className:
          '[&>span>.loader]:text-gray-500 dark:[&>span>.loader]:text-gray-200 bg-white hover:enabled:bg-gray-50 active:enabled:bg-gray-100 hover:enabled:border-gray-300 dark:hover:enabled:border-gray-600 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 dark:bg-gray-800 dark:hover:enabled:bg-gray-700 dark:active:enabled:bg-gray-800'
      },
      {
        color: 'secondary',
        variant: 'solid',
        className:
          '[&>span>.loader]:text-gray-500 dark:[&>span>.loader]:text-gray-200 bg-gray-500 hover:enabled:bg-gray-600 active:enabled:bg-gray-100 hover:enabled:border-gray-300 dark:hover:enabled:border-gray-700 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-100 dark:bg-gray-950 dark:hover:enabled:bg-gray-900 dark:active:enabled:bg-gray-950'
      },
      {
        color: 'muted',
        variant: 'solid',
        className:
          '[&>span>.loader]:text-gray-500 dark:[&>span>.loader]:text-gray-200 border border-gray-200 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-100 enabled:hover:bg-gray-300 dark:enabled:hover:bg-gray-700 active:enabled:bg-gray-100 dark:active:enabled:bg-gray-800'
      },
      {
        color: 'primary',
        variant: 'solid',
        className:
          '[&>span>.loader]:text-gray-100 border border-indigo-500 bg-indigo-500 text-white enabled:hover:bg-indigo-600 active:enabled:bg-indigo-400'
      },
      {
        color: 'info',
        variant: 'solid',
        className:
          '[&>span>.loader]:text-gray-100 border border-blue-500 bg-blue-500 text-white enabled:hover:bg-blue-600 active:enabled:bg-blue-400'
      },
      {
        color: 'success',
        variant: 'solid',
        className:
          '[&>span>.loader]:text-gray-100 border border-green-500 bg-green-500 text-white enabled:hover:bg-green-600 active:enabled:bg-green-400'
      },
      {
        color: 'warning',
        variant: 'solid',
        className:
          '[&>span>.loader]:text-gray-100 border border-yellow-500 bg-yellow-500 text-white enabled:hover:bg-yellow-600 active:enabled:bg-yellow-400'
      },
      {
        color: 'error',
        variant: 'solid',
        className:
          '[&>span>.loader]:text-gray-100 border border-red-500 bg-red-500 text-white enabled:hover:bg-red-600 active:enabled:bg-red-400'
      },
      {
        color: 'default',
        variant: 'pastel',
        className:
          '[&>span>.loader]:text-gray-500 dark:[&>span>.loader]:text-gray-200 border-none bg-gray-300/30 dark:bg-gray-300/10 text-gray-500 dark:text-gray-400 enabled:hover:bg-gray-300/60 dark:enabled:hover:bg-gray-300/20 active:enabled:bg-gray-300/30 dark:active:enabled:bg-gray-300/10'
      },

      {
        color: 'secondary',
        variant: 'pastel',
        className:
          '[&>span>.loader]:text-gray-500 dark:[&>span>.loader]:text-gray-200 border-none bg-gray-300/30 dark:bg-gray-300/10 text-gray-500 dark:text-gray-400 enabled:hover:bg-gray-300/60 dark:enabled:hover:bg-gray-300/20 active:enabled:bg-gray-300/30 dark:active:enabled:bg-gray-300/10'
      },
      {
        color: 'muted',
        variant: 'pastel',
        className:
          '[&>span>.loader]:text-gray-500 dark:[&>span>.loader]:text-gray-200 bg-gray-300/30 dark:bg-gray-300/10 text-gray-500 dark:text-gray-400 enabled:hover:bg-gray-300/60 dark:enabled:hover:bg-gray-300/20 active:enabled:bg-gray-300/30 dark:active:enabled:bg-gray-300/10'
      },
      {
        color: 'primary',
        variant: 'pastel',
        className:
          '[&>span>.loader]:text-indigo-500 bg-indigo-100 dark:bg-indigo-900 text-indigo-500 enabled:hover:bg-indigo-200 dark:enabled:hover:bg-indigo-950 active:enabled:bg-indigo-100 dark:active:enabled:bg-indigo-950'
      },
      {
        color: 'info',
        variant: 'pastel',
        className:
          '[&>span>.loader]:text-blue-500 bg-blue-500/10 dark:bg-blue-500/20 text-blue-500 enabled:hover:bg-blue-500/20 dark:enabled:hover:bg-blue-500/30 active:enabled:bg-blue-500/10 dark:active:enabled:bg-blue-500/10'
      },
      {
        color: 'success',
        variant: 'pastel',
        className:
          '[&>span>.loader]:text-green-500 bg-green-500/10 dark:bg-green-500/20 text-green-500 enabled:hover:bg-green-500/20 dark:enabled:hover:bg-green-500/30 active:enabled:bg-green-500/10 dark:active:enabled:bg-green-500/10'
      },
      {
        color: 'warning',
        variant: 'pastel',
        className:
          '[&>span>.loader]:text-yellow-500 bg-yellow-500/10 dark:bg-yellow-500/20 text-yellow-500 enabled:hover:bg-yellow-500/20 dark:enabled:hover:bg-yellow-500/30 active:enabled:bg-yellow-500/10 dark:active:enabled:bg-yellow-500/10'
      },
      {
        color: 'error',
        variant: 'pastel',
        className:
          '[&>span>.loader]:text-red-500 bg-red-500/10 dark:bg-red-500/20 text-red-500 enabled:hover:bg-red-500/20 dark:enabled:hover:bg-red-500/30 active:enabled:bg-red-500/10 dark:active:enabled:bg-red-500/10'
      },
      {
        color: 'default',
        variant: 'outlined',
        className:
          '[&>span>.loader]:text-gray-500 dark:[&>span>.loader]:text-gray-200 border border-gray-300 dark:border-gray-700 text-gray-500 hover:bg-white hover:enabled:bg-gray-100 dark:hover:enabled:bg-gray-800 active:enabled:bg-gray-50 dark:active:enabled:bg-gray-700 hover:enabled:text-gray-600 dark:hover:enabled:text-gray-100'
      },
      {
        color: 'secondary',
        variant: 'outlined',
        className:
          '[&>span>.loader]:text-gray-500 dark:[&>span>.loader]:text-gray-200 border border-gray-300 dark:border-gray-700 text-gray-500 hover:bg-white hover:enabled:bg-gray-100 dark:hover:enabled:bg-gray-950 active:enabled:bg-gray-50 dark:active:enabled:bg-gray-900 hover:enabled:text-gray-600 dark:hover:enabled:text-gray-100'
      },
      {
        color: 'muted',
        variant: 'outlined',
        className:
          '[&>span>.loader]:text-gray-500 dark:[&>span>.loader]:text-gray-200 border border-gray-300 dark:border-gray-700 text-gray-500 hover:bg-white hover:enabled:bg-gray-100 dark:hover:enabled:bg-gray-800 active:enabled:bg-gray-50 dark:active:enabled:bg-gray-700 hover:enabled:text-gray-600 dark:hover:enabled:text-gray-100'
      },
      {
        color: 'primary',
        variant: 'outlined',
        className:
          '[&>span>.loader]:text-indigo-500 border border-indigo-500 text-indigo-500 hover:bg-indigo-500 active:enabled:bg-indigo-400 hover:text-white'
      },
      {
        color: 'info',
        variant: 'outlined',
        className:
          '[&>span>.loader]:text-blue-500 border border-blue-500 text-blue-500 hover:bg-blue-500 active:enabled:bg-blue-400 hover:text-white'
      },
      {
        color: 'success',
        variant: 'outlined',
        className:
          'border border-green-500 text-green-500 hover:bg-green-500 active:enabled:bg-green-400 hover:text-white'
      },
      {
        color: 'warning',
        variant: 'outlined',
        className:
          '[&>span>.loader]:text-yellow-500 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 active:enabled:bg-yellow-400 hover:text-white'
      },
      {
        color: 'error',
        variant: 'outlined',
        className:
          '[&>span>.loader]:text-red-500 border border-red-500 text-red-500 hover:bg-red-500 active:enabled:bg-red-400 hover:text-white'
      },
      //transparent
      {
        color: 'transparent',
        variant: 'solid',
        className:
          '[&>span>.loader]:text-gray-500 bg-transparent text-gray-500 hover:enabled:text-indigo-500 active:enabled:bg-gray-200/20'
      },
      {
        color: 'transparent',
        variant: 'pastel',
        className:
          '[&>span>.loader]:text-gray-500 bg-transparent text-gray-500 hover:enabled:text-indigo-500 active:enabled:bg-gray-200/20'
      },
      {
        color: 'transparent',
        variant: 'outlined',
        className:
          '[&>span>.loader]:text-gray-500 bg-transparent border border-gray-300 text-gray-500 hover:enabled:text-indigo-500 active:enabled:bg-gray-200/20'
      }
    ],

    defaultVariants: {
      color: 'default',
      variant: 'solid',
      shape: 'smooth',
      shadow: 'none'
    }
  }
);
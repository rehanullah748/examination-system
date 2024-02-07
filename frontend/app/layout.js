
"use client"
import './globals.css'
import { Toaster } from 'react-hot-toast'
import PrelineSetup from '@/components/PrelineSetup'
import ReactQuerySetup from '@/components/ReactQuerySetup'
import NextTopLoader from 'nextjs-toploader'
import { store } from '@/Store'
import { Provider } from 'react-redux'

export default function RootLayout({ children }) {
  return (
    
    
      <html lang="en">
      <body><PrelineSetup/>
      <Provider store={store}>
      <Toaster toastOptions={{duration: 5000}}
       position="top-right"
       reverseOrder={false}
/>
<NextTopLoader />
 <ReactQuerySetup>
      {children}
  </ReactQuerySetup>
  </Provider>
      </body>
      </html>
    
    
  )
}




import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import PrelineSetup from '@/components/PrelineSetup'
import ReactQuerySetup from '@/components/ReactQuerySetup'
import NextTopLoader from 'nextjs-toploader'


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    
    
      <html lang="en">
      <body className={inter.className}><PrelineSetup/>
      
      <Toaster toastOptions={{duration: 5000}}
       position="top-right"
       reverseOrder={false}
/>
<NextTopLoader />
 <ReactQuerySetup>
      {children}
  </ReactQuerySetup>
      </body>
      </html>
    
    
  )
}



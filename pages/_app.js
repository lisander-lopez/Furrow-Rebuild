import '../styles/globals.scss'
import { ThemeProvider } from 'next-themes'
import {GlobalProvider} from '../context/globalContext';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  
  const [mounted, setMounted] = useState(false);
  
  // When mounted on client, now we can show the UI, Taken from DOCS
  // I think we are making sure server theme == client theme 
  useEffect(() => setMounted(true), [])

  if (!mounted) return null;

  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </ThemeProvider>
  )
}

export default MyApp

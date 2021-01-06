import '../styles/globals.scss';
import { ThemeProvider, useTheme } from 'next-themes';
import {GlobalProvider} from '../context/globalContext';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  
  const [mounted, setMounted] = useState(false);
  //const { theme, setTheme } = useTheme();
  // When mounted on client, now we can show the UI, Taken from DOCS
  // I think we are making sure server theme == client theme 
  useEffect(() => setMounted(true), [])

  if (!mounted) return null;

  // if (localStorage.getItem("theme") === null) {
    
  // }

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </ThemeProvider>
  )
}

export default MyApp

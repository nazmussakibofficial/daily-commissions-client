import { useState } from 'react';
import AuthProvider from '../contexts/AuthProvider';
import Main from '../layouts/Main'
import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Main darkMode={darkMode} setDarkMode={setDarkMode}>
          <Component {...pageProps} />
        </Main>
      </AuthProvider>
    </QueryClientProvider>

  )
}

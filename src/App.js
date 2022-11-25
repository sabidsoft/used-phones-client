import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/route'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './contexts/AuthProvider'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App

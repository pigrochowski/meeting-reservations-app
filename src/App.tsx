import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { Provider, useSelector } from 'react-redux'
import { store, RootState } from './store/store'
import { theme } from './theme'
import { LoginForm } from './components/auth/LoginForm'
import { Dashboard } from './components/Dashboard'
import './App.css'

const AppRoutes: React.FC = () => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

	return (
		<Routes>
			<Route path='/login' element={!isAuthenticated ? <LoginForm /> : <Navigate to='/dashboard' />} />
			<Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Navigate to='/login' />} />
			<Route path='/' element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
		</Routes>
	)
}

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router>
					<AppRoutes />
				</Router>
			</ThemeProvider>
		</Provider>
	)
}

export default App

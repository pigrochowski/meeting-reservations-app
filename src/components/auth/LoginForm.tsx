import React, { useState } from 'react'
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../store/authSlice'

export const LoginForm: React.FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const dispatch = useDispatch()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		// Demo logowanie
		if (email === 'admin@test.com' && password === 'admin123') {
			dispatch(
				loginSuccess({
					user: {
						id: 1,
						username: 'admin',
						email: 'admin@test.com',
						password: '',
						role: 'admin',
						createdAt: new Date(),
					},
					token: 'demo-token',
				})
			)
		} else {
			setError('Błędne dane logowania')
		}
	}

	return (
		<Container maxWidth='sm'>
			<Box sx={{ mt: 8 }}>
				<Paper elevation={3} sx={{ p: 4 }}>
					<Typography variant='h4' align='center' gutterBottom>
						Logowanie
					</Typography>

					{error && (
						<Alert severity='error' sx={{ mb: 2 }}>
							{error}
						</Alert>
					)}

					<form onSubmit={handleSubmit}>
						<TextField
							fullWidth
							label='Email'
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							margin='normal'
							required
						/>
						<TextField
							fullWidth
							label='Hasło'
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							margin='normal'
							required
						/>
						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							Zaloguj się
						</Button>
					</form>

					<Typography variant='body2' color='text.secondary' align='center'>
						Demo: admin@test.com / admin123
					</Typography>
				</Paper>
			</Box>
		</Container>
	)
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, User } from '../types'

const initialState: AuthState = {
	user: null,
	token: null,
	isAuthenticated: false,
	loading: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
			state.user = action.payload.user
			state.token = action.payload.token
			state.isAuthenticated = true
			state.loading = false
		},
		logout: state => {
			state.user = null
			state.token = null
			state.isAuthenticated = false
			state.loading = false
		},
	},
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer

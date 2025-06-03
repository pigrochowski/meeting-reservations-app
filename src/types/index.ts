export interface User {
	id: string | number
	username: string
	email: string
	password: string
	role: 'admin' | 'user'
	createdAt: Date
}

export interface Meeting {
	id: string | number
	title: string
	description: string
	date: Date
	startTime: string
	endTime: string
	participants: string[]
	createdBy: string
	status: 'scheduled' | 'canceled'
}

export interface AuthState {
	user: User | null
	token: string | null
	isAuthenticated: boolean
	loading: boolean
}

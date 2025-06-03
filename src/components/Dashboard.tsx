import React, { useState } from 'react'
import { Container, AppBar, Toolbar, Typography, Button, Box, Avatar, Menu, MenuItem } from '@mui/material'
import { ExitToApp, Person } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { logout } from '../store/authSlice'
import { MeetingList } from './meetings/MeetingList'
import { MeetingForm } from './meetings/MeetingForm'
import { Meeting } from '../types'

export const Dashboard: React.FC = () => {
	const dispatch = useDispatch()
	const user = useSelector((state: RootState) => state.auth.user)

	const [meetings, setMeetings] = useState<Meeting[]>([
		{
			id: 1,
			title: 'Spotkanie zespołu',
			description: 'Comiesięczne spotkanie zespołu programistów',
			date: new Date('2025-06-05'),
			startTime: '10:00',
			endTime: '11:30',
			participants: ['jan@example.com', 'anna@example.com'],
			createdBy: 'admin',
			status: 'scheduled',
		},
		{
			id: 2,
			title: 'Prezentacja projektu',
			description: 'Prezentacja postępów w projekcie React',
			date: new Date('2025-06-07'),
			startTime: '14:00',
			endTime: '15:00',
			participants: ['client@example.com', 'manager@example.com'],
			createdBy: 'admin',
			status: 'scheduled',
		},
	])

	const [isFormOpen, setIsFormOpen] = useState(false)
	const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null)
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleUserMenuClose = () => {
		setAnchorEl(null)
	}

	const handleLogout = () => {
		dispatch(logout())
		handleUserMenuClose()
	}

	const handleAddMeeting = () => {
		setEditingMeeting(null)
		setIsFormOpen(true)
	}

	const handleEditMeeting = (meeting: Meeting) => {
		setEditingMeeting(meeting)
		setIsFormOpen(true)
	}

	const handleSaveMeeting = (meetingData: Omit<Meeting, 'id'>) => {
		if (editingMeeting) {
			// Edytuj istniejące spotkanie
			setMeetings(prev =>
				prev.map(meeting => (meeting.id === editingMeeting.id ? { ...meetingData, id: editingMeeting.id } : meeting))
			)
		} else {
			// Dodaj nowe spotkanie
			const newMeeting: Meeting = {
				...meetingData,
				id: Date.now(), // Prosta generacja ID
			}
			setMeetings(prev => [...prev, newMeeting])
		}
		setIsFormOpen(false)
		setEditingMeeting(null)
	}

	const handleDeleteMeeting = (id: string | number) => {
		setMeetings(prev => prev.filter(meeting => meeting.id !== id))
	}

	return (
		<>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						Meeting Reservations
					</Typography>

					<Box display='flex' alignItems='center' gap={2}>
						<Typography variant='body2'>Witaj, {user?.username}!</Typography>
						<Button
							color='inherit'
							onClick={handleUserMenuClick}
							startIcon={
								<Avatar sx={{ width: 32, height: 32 }}>
									<Person />
								</Avatar>
							}>
							{user?.email}
						</Button>
					</Box>

					<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleUserMenuClose}>
						<MenuItem onClick={handleLogout}>
							<ExitToApp sx={{ mr: 1 }} />
							Wyloguj
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>

			<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
				<MeetingList
					meetings={meetings}
					onAddMeeting={handleAddMeeting}
					onEditMeeting={handleEditMeeting}
					onDeleteMeeting={handleDeleteMeeting}
				/>
			</Container>

			<MeetingForm
				open={isFormOpen}
				onClose={() => {
					setIsFormOpen(false)
					setEditingMeeting(null)
				}}
				onSave={handleSaveMeeting}
				editingMeeting={editingMeeting}
			/>
		</>
	)
}

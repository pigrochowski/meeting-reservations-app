import React, { useState, useEffect } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Box,
	Chip,
	IconButton,
	Typography,
} from '@mui/material'
import { Close, Add } from '@mui/icons-material'
import { Meeting } from '../../types'

interface MeetingFormProps {
	open: boolean
	onClose: () => void
	onSave: (meeting: Omit<Meeting, 'id'>) => void
	editingMeeting?: Meeting | null
}

export const MeetingForm: React.FC<MeetingFormProps> = ({ open, onClose, onSave, editingMeeting }) => {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		date: '',
		startTime: '',
		endTime: '',
		participants: [] as string[],
		newParticipant: '',
	})

	const [errors, setErrors] = useState<{ [key: string]: string }>({})

	useEffect(() => {
		if (editingMeeting) {
			setFormData({
				title: editingMeeting.title,
				description: editingMeeting.description,
				date: new Date(editingMeeting.date).toISOString().split('T')[0],
				startTime: editingMeeting.startTime,
				endTime: editingMeeting.endTime,
				participants: editingMeeting.participants,
				newParticipant: '',
			})
		} else {
			setFormData({
				title: '',
				description: '',
				date: '',
				startTime: '',
				endTime: '',
				participants: [],
				newParticipant: '',
			})
		}
		setErrors({})
	}, [editingMeeting, open])

	const handleInputChange = (field: string, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }))
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: '' }))
		}
	}

	const addParticipant = () => {
		const email = formData.newParticipant.trim()
		if (email && !formData.participants.includes(email)) {
			setFormData(prev => ({
				...prev,
				participants: [...prev.participants, email],
				newParticipant: '',
			}))
		}
	}

	const removeParticipant = (email: string) => {
		setFormData(prev => ({
			...prev,
			participants: prev.participants.filter(p => p !== email),
		}))
	}

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {}

		if (!formData.title.trim()) newErrors.title = 'Tytuł jest wymagany'
		if (!formData.date) newErrors.date = 'Data jest wymagana'
		if (!formData.startTime) newErrors.startTime = 'Godzina rozpoczęcia jest wymagana'
		if (!formData.endTime) newErrors.endTime = 'Godzina zakończenia jest wymagana'

		if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
			newErrors.endTime = 'Godzina zakończenia musi być później niż rozpoczęcia'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = () => {
		if (!validateForm()) return

		const meetingData: Omit<Meeting, 'id'> = {
			title: formData.title.trim(),
			description: formData.description.trim(),
			date: new Date(formData.date),
			startTime: formData.startTime,
			endTime: formData.endTime,
			participants: formData.participants,
			createdBy: 'current-user',
			status: 'scheduled',
		}

		onSave(meetingData)
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
			<DialogTitle>
				<Box display='flex' justifyContent='space-between' alignItems='center'>
					{editingMeeting ? 'Edytuj Spotkanie' : 'Nowe Spotkanie'}
					<IconButton onClick={onClose}>
						<Close />
					</IconButton>
				</Box>
			</DialogTitle>

			<DialogContent>
				<Box display='flex' flexDirection='column' gap={3} pt={1}>
					<TextField
						fullWidth
						label='Tytuł spotkania'
						value={formData.title}
						onChange={e => handleInputChange('title', e.target.value)}
						error={!!errors.title}
						helperText={errors.title}
					/>

					<TextField
						fullWidth
						label='Opis'
						multiline
						rows={3}
						value={formData.description}
						onChange={e => handleInputChange('description', e.target.value)}
					/>

					<TextField
						fullWidth
						label='Data'
						type='date'
						value={formData.date}
						onChange={e => handleInputChange('date', e.target.value)}
						InputLabelProps={{ shrink: true }}
						error={!!errors.date}
						helperText={errors.date}
					/>

					<Box display='flex' gap={2}>
						<TextField
							label='Godzina rozpoczęcia'
							type='time'
							value={formData.startTime}
							onChange={e => handleInputChange('startTime', e.target.value)}
							InputLabelProps={{ shrink: true }}
							error={!!errors.startTime}
							helperText={errors.startTime}
						/>
						<TextField
							label='Godzina zakończenia'
							type='time'
							value={formData.endTime}
							onChange={e => handleInputChange('endTime', e.target.value)}
							InputLabelProps={{ shrink: true }}
							error={!!errors.endTime}
							helperText={errors.endTime}
						/>
					</Box>

					<Box>
						<Typography variant='subtitle1' gutterBottom>
							Uczestnicy
						</Typography>
						<Box display='flex' gap={1} mb={2}>
							<TextField
								label='Email uczestnika'
								type='email'
								value={formData.newParticipant}
								onChange={e => handleInputChange('newParticipant', e.target.value)}
								onKeyPress={e => e.key === 'Enter' && addParticipant()}
								sx={{ flex: 1 }}
							/>

							<Button variant='outlined' onClick={addParticipant} startIcon={<Add />}>
								Dodaj
							</Button>
						</Box>
						<Box display='flex' flexWrap='wrap' gap={1}>
							{formData.participants.map(email => (
								<Chip
									key={email}
									label={email}
									onDelete={() => removeParticipant(email)}
									color='primary'
									variant='outlined'
								/>
							))}
						</Box>
					</Box>
				</Box>
			</DialogContent>

			<DialogActions>
				<Button onClick={onClose}>Anuluj</Button>
				<Button onClick={handleSubmit} variant='contained'>
					{editingMeeting ? 'Zapisz' : 'Dodaj'}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

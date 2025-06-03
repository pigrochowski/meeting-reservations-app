import React, { useState } from 'react'
import {
	Box,
	Typography,
	Button,
	TextField,
	InputAdornment,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material'
import { Add, Search } from '@mui/icons-material'
import { MeetingCard } from './MeetingCard'
import { Meeting } from '../../types'

interface MeetingListProps {
	meetings: Meeting[]
	onAddMeeting: () => void
	onEditMeeting: (meeting: Meeting) => void
	onDeleteMeeting: (id: string | number) => void
}

export const MeetingList: React.FC<MeetingListProps> = ({ meetings, onAddMeeting, onEditMeeting, onDeleteMeeting }) => {
	// Stany dla różnych filtrów i opcji sortowania
	const [searchTerm, setSearchTerm] = useState('') // Tekst wyszukiwania
	const [statusFilter, setStatusFilter] = useState('all') // Filtr statusu spotkań
	const [sortBy, setSortBy] = useState('date') // Opcja sortowania
	const [dateFrom, setDateFrom] = useState('') // Data początkowa zakresu
	const [dateTo, setDateTo] = useState('') // Data końcowa zakresu

	// Funkcja filtrowania i sortowania spotkań
	const filteredAndSortedMeetings = meetings
		.filter(meeting => {
			// Sprawdzanie czy tytuł lub opis zawiera szukany tekst
			const matchesSearch =
				meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				meeting.description.toLowerCase().includes(searchTerm.toLowerCase())

			// Sprawdzanie czy status spotkania pasuje do filtru
			const matchesStatus = statusFilter === 'all' || meeting.status === statusFilter

			// Konwersja daty spotkania do formatu YYYY-MM-DD dla porównania
			const meetingDate = new Date(meeting.date).toISOString().split('T')[0]
			const matchesDateFrom = !dateFrom || meetingDate >= dateFrom // Sprawdzenie daty od
			const matchesDateTo = !dateTo || meetingDate <= dateTo // Sprawdzenie daty do

			return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo
		})
		.sort((a, b) => {
			// Sortowanie spotkań według wybranego kryterium
			switch (sortBy) {
				case 'title':
					return a.title.localeCompare(b.title) // Alfabetycznie po tytule
				case 'date':
					return new Date(a.date).getTime() - new Date(b.date).getTime() // Chronologicznie
				case 'created':
					return b.id.toString().localeCompare(a.id.toString()) // Najnowsze pierwsz
				default:
					return 0
			}
		})

	return (
		<Box>
			{/* Nagłówek z tytułem i przyciskiem dodawania */}
			<Box display='flex' justifyContent='space-between' alignItems='center' sx={{ mb: 3 }}>
				<Typography variant='h4' component='h1'>
					Moje Spotkania
				</Typography>
				<Button variant='contained' startIcon={<Add />} onClick={onAddMeeting}>
					Dodaj Spotkanie
				</Button>
			</Box>

			{/* Sekcja filtrów i wyszukiwania */}
			<Box sx={{ mb: 3 }}>
				{/* Pole wyszukiwania tekstu */}
				<TextField
					fullWidth
					placeholder='Szukaj spotkań...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<Search />
							</InputAdornment>
						),
					}}
					sx={{ mb: 2 }}
				/>

				{/* Filtry i opcje sortowania */}
				<Box display='flex' gap={2} flexWrap='wrap'>
					{/* Filtr statusu spotkań */}
					<FormControl size='small' sx={{ minWidth: 120 }}>
						<InputLabel>Status</InputLabel>
						<Select value={statusFilter} label='Status' onChange={e => setStatusFilter(e.target.value)}>
							<MenuItem value='all'>Wszystkie</MenuItem>
							<MenuItem value='scheduled'>Zaplanowane</MenuItem>
							<MenuItem value='canceled'>Anulowane</MenuItem>
						</Select>
					</FormControl>

					{/* Opcje sortowania */}
					<FormControl size='small' sx={{ minWidth: 120 }}>
						<InputLabel>Sortuj</InputLabel>
						<Select value={sortBy} label='Sortuj' onChange={e => setSortBy(e.target.value)}>
							<MenuItem value='date'>Po dacie</MenuItem>
							<MenuItem value='title'>Po tytule</MenuItem>
							<MenuItem value='created'>Najnowsze</MenuItem>
						</Select>
					</FormControl>

					{/* Filtr zakresu dat */}
					<TextField
						label='Od daty'
						type='date'
						size='small'
						value={dateFrom}
						onChange={e => setDateFrom(e.target.value)}
						InputLabelProps={{ shrink: true }}
						sx={{ width: 150 }}
					/>

					<TextField
						label='Do daty'
						type='date'
						size='small'
						value={dateTo}
						onChange={e => setDateTo(e.target.value)}
						InputLabelProps={{ shrink: true }}
						sx={{ width: 150 }}
					/>
				</Box>
			</Box>

			{/* Lista spotkań lub komunikat o braku wyników */}
			{filteredAndSortedMeetings.length === 0 ? (
				<Box textAlign='center' sx={{ py: 8 }}>
					<Typography variant='h6' color='text.secondary'>
						{searchTerm ? 'Nie znaleziono spotkań' : 'Brak spotkań'}
					</Typography>
					<Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
						{!searchTerm && 'Dodaj swoje pierwsze spotkanie!'}
					</Typography>
				</Box>
			) : (
				<Box>
					{/* Renderowanie przefiltrowanych i posortowanych spotkań */}
					{filteredAndSortedMeetings.map(meeting => (
						<Box key={meeting.id} sx={{ mb: 2 }}>
							<MeetingCard meeting={meeting} onEdit={onEditMeeting} onDelete={onDeleteMeeting} />
						</Box>
					))}
				</Box>
			)}
		</Box>
	)
}

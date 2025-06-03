import React from 'react'
import { Card, CardContent, Typography, Box, Chip, IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVert, AccessTime, Person } from '@mui/icons-material'
import { Meeting } from '../../types'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

interface MeetingCardProps {
	meeting: Meeting
	onEdit?: (meeting: Meeting) => void
	onDelete?: (id: string | number) => void
}

export const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, onEdit, onDelete }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

	const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleEdit = () => {
		onEdit?.(meeting)
		handleMenuClose()
	}

	const handleDelete = () => {
		onDelete?.(meeting.id)
		handleMenuClose()
	}

	return (
		<Card sx={{ mb: 2, boxShadow: 2 }}>
			<CardContent>
				<Box display='flex' justifyContent='between' alignItems='start'>
					<Box flex={1}>
						<Typography variant='h6' component='h3' gutterBottom>
							{meeting.title}
						</Typography>

						<Typography variant='body2' color='text.secondary' gutterBottom>
							{meeting.description}
						</Typography>

						<Box display='flex' alignItems='center' gap={2} mt={1}>
							<Box display='flex' alignItems='center' gap={0.5}>
								<AccessTime fontSize='small' color='action' />
								<Typography variant='body2'>
									{format(new Date(meeting.date), 'dd MMM yyyy', { locale: pl })} |{meeting.startTime} -{' '}
									{meeting.endTime}
								</Typography>
							</Box>
						</Box>

						<Box display='flex' alignItems='center' gap={0.5} mt={1}>
							<Person fontSize='small' color='action' />
							<Typography variant='body2'>Uczestnicy: {meeting.participants.length}</Typography>
						</Box>

						<Box mt={1}>
							<Chip
								label={meeting.status === 'scheduled' ? 'Zaplanowane' : 'Anulowane'}
								color={meeting.status === 'scheduled' ? 'success' : 'error'}
								size='small'
							/>
						</Box>
					</Box>

					<IconButton onClick={handleMenuClick}>
						<MoreVert />
					</IconButton>
				</Box>

				<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
					<MenuItem onClick={handleEdit}>Edytuj</MenuItem>
					<MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
						Usuń
					</MenuItem>
				</Menu>
			</CardContent>
		</Card>
	)
}

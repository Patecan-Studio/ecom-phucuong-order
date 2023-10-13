export const convertUTCToGMT7 = (date: Date) => {
	if (isCurrentTimezoneUtc()) {
		const localDate = new Date(date.getTime() + 7 * 3600 * 1000) // Convert UTC to GMT+7
		return localDate
	}
	return date
}

const isCurrentTimezoneUtc = () => {
	return Intl.DateTimeFormat().resolvedOptions().timeZone === 'UTC'
}

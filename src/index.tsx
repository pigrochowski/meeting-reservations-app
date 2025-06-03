import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals() // Uruchomienie monitorowania wydajności aplikacji

// Rejestracja Service Worker dla funkcji PWA
if ('serviceWorker' in navigator) {
	// Sprawdzenie czy przeglądarka obsługuje service workery
	window.addEventListener('load', () => {
		// Czekamy aż strona się w pełni załaduje
		navigator.serviceWorker
			.register('/sw.js') // Rejestrujemy plik service workera
			.then(registration => {
				// Jeśli rejestracja przebiegła pomyślnie
				console.log('Service Worker zarejestrowany pomyślnie: ', registration)
			})
			.catch(registrationError => {
				// Jeśli wystąpił błąd podczas rejestracji
				console.log('Błąd rejestracji Service Worker: ', registrationError)
			})
	})
}

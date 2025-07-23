# Meeting Reservations App

Aplikacja React do zarządzania rezerwacjami spotkań z funkcjonalnością PWA, napisana w TypeScript z wykorzystaniem Material-UI.

## Funkcjonalności

### Podstawowe funkcje

- **System logowania** - bezpieczna autoryzacja użytkowników
- **Zarządzanie spotkaniami** - dodawanie, edycja i usuwanie spotkań
- **Zarządzanie uczestnikami** - dodawanie email uczestników do spotkań
- **Responsywny design** - Material-UI zapewnia nowoczesny wygląd

### Zaawansowane funkcje

- **Filtrowanie spotkań** - po tekście, statusie i zakresie dat
- **Sortowanie** - według daty, tytułu lub kolejności dodania
- **Wyszukiwanie w czasie rzeczywistym** - błyskawiczne znajdowanie spotkań
- **PWA (Progressive Web App)** - możliwość instalacji jako aplikacja

## Technologie

- **Frontend**: React 18 + TypeScript
- **Zarządzanie stanem**: Redux Toolkit
- **UI Framework**: Material-UI (MUI)
- **Routing**: React Router v6
- **Style**: Emotion (CSS-in-JS)
- **PWA**: Service Workers + Web App Manifest

## Instalacja

### Wymagania

- Node.js >= 18.0.0
- npm >= 8.0.0

### Kroki instalacji

1. **Klonowanie repozytorium**
   git clone https://github.com/pigrochowski/meeting-reservations-app.git
   cd meeting-reservations-app


2. **Instalacja zależności**
   npm install

3. **Uruchomienie aplikacji**
   npm start

Aplikacja uruchomi się na `http://localhost:3000`

## Logowanie (Demo)

Użyj tych danych do zalogowania:

- **Email**: admin@test.com
- **Hasło**: admin123

## Instalacja PWA

1. Otwórz aplikację w przeglądarce Chrome/Edge
2. Kliknij ikonę "Zainstaluj" w pasku adresu
3. Potwierdź instalację
4. Aplikacja zostanie dodana do menu/pulpitu


### Strona logowania

- Elegancki formularz z walidacją
- Demo dane dostępowe
- Automatyczne przekierowanie po zalogowaniu

### Dashboard

- Górna nawigacja z informacjami użytkownika
- Lista spotkań w kartach
- Zaawansowane filtry i wyszukiwanie

### Zarządzanie spotkaniami

- Modal z formularzem dodawania/edycji
- Walidacja pól formularza
- Zarządzanie listą uczestników

## funkcje filtrowania

- **Wyszukiwanie tekstowe** - po tytule i opisie
- **Filtr statusu** - zaplanowane/anulowane/wszystkie
- **Zakres dat** - od/do określonej daty
- **Sortowanie** - po dacie, tytule lub kolejności

## Dostępne skrypty

npm start # Uruchomienie w trybie development
npm run build # Budowanie wersji produkcyjnej
npm test # Uruchomienie testów
npm run eject # Eksport konfiguracji (nieodwracalne)

## 👨‍💻 Autor

Piotr Grochowski

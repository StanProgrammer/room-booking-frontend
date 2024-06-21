# Room Booking App

## Features

- **Booking Rooms with Multiple Slots**: Users can select multiple time slots for booking a room. The app handles overlapping bookings and prevents double booking.
  
- **Room Search**: Users can search for a particular room by name or other criteria. The search feature provides a convenient way to find available rooms.
  
- **Availability Check**: The app displays the earliest available slot for the selected room.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Other**: Moment.js, bootstrap

## Functionality Overview

1. **Booking Process**
   - User selects a room, then date and chooses one or more time slots.
   - User confirms the booking, and the app sends the request to the server.
   - The server validates the booking and updates the database.
   - The app displays a confirmation message to the user.

2. **Room Search**
   - User enters the room name.
   - The app filters the rooms based on the room name and displays the results.

3. **Availability Check**
   - Earliest availability of room is displayed in the room's card


## Live Url: 
https://room-booking-frontend-ion3.onrender.com
  

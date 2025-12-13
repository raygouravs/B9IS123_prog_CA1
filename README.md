# B9IS123 Programming for Information Systems CA 2025
Project Objective:

Develop a CRUD web-app for a Co-working space, for hot-desking management and utilisation tracker system, using Javascript frameworks for FE, BE and SQLite for database.

Documentation: Google Docs (Editor access) - https://docs.google.com/document/d/1c1o9KqsrZfVuDRD6Pch3GU-iB2A9X6-vvMPCYlhlH_E/edit?tab=t.0
[Updated Google Doc is uploaded in this Github repository folder structure]


Core Modules:

- Desk management
- User/Member management
- Zone Management
- Booking management
- Booking status page / Check-in Screen
- Reports & Analytics Screen
- Settings/Configuration Screen
			

Features:

Create - create desk & meeting room assets, member profiles in the system, consisting of data like membership type, joining date etc.


Read - read the updated booking and desk availability status from the remote database, and filter out un-available desks to show only the unoccupied desks in the create new booking flow. 


Update - update the assets, bookings and members details in the system.


Delete - delete assets, bookings, members data from the remote database.


Overview:


- Desk booking and management
- Sorting of available desks grouping them by desk type
- Searching for available seats, before creating a new booking
- Searching for free slots for a seat, in the upcoming week, before re-scheduling the booking
- Handle validations on the server-side like valid input for booking date, ensuring booking a desk on a past date is not possible
- Utilisation dashboard consisting of charts like pie chart/ bar chart for utilisation data visualisation
- Additional Metrics like occupancy %, member activity
- Manage master data and system setup
	- Add/Edit Booking Durations (first half, second half, full day)
	- Manage Zones (names, floors, descriptions)



Tools & Technologies:

- Frontend: React
- Backend: Node.js + Express
- Database: SQLite
- Version Control: GitHub
- Testing Framework: Jest, Supertest (via NPM)
- Documentation: Google Docs (Editor access) - https://docs.google.com/document/d/1c1o9KqsrZfVuDRD6Pch3GU-iB2A9X6-vvMPCYlhlH_E/edit?tab=t.0

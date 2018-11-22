# Getstruments - Music Equipment Rental (front end)
This repo represents the front end React application created by Austin Scholl of Eleven Fifty Academy. This half of a full stack project was submitted on week 8 in completion of the Blue Badge phase of Eleven Fifty's JavaScript boot camp.

View the deployed application (in its current state) at https://getstrumentsclient.herokuapp.com

Back-end repository: https://github.com/austinmscholl/getstrumentsServer

# Features:
* Single page app format with a central switch statement that renders one of three possible interfaces:
 * List an Instrument: A table user-specific, listed instruments with options to Create, Update and Delete.
 * Rent an Instrument: Search listed instruments by type.
 * Booking: Two calendars for begin rental date and end rental date. Creates a database entry associated with itemId.
 
* Authentication required for all queries to the back end (JWT credentials circulated throughout components by way of Context)

* Reusable component for substituting foreign keys with data (e.g. showing first and last names associated with assignments or submissions)

# Reconnect Frontend Test

Frontend test solution prepared by Christian de Witt

# Reviewer notes

Please view the below notes for application and pattern context

# Dataset
The following rules/filters are applied to the data set:
- Only records with type “Movie”
- Duplicates are removed based on “Title”, “Address” and “Site”
- Grouped on “Title” and shoot times are aggregated into a collection

**Please note:**
The URI to the movies data source is currently set to a static JSON file located in the app dir structure as
- The ABQ API is down or timing out and
- JSON cannot be loaded cross domain from JS

# Environmental Variables
Environmental Variables that need to be set:

| Variable | Description |
| ------ | ------ |
| REACT_APP_MOVIES_API_URI | URI to the movies data source |
| REACT_APP_GOOGLE_MAPS_API_KEY | Google Maps API key |

**Please note:**
- The environmental variables are already set on the deployed cloud version of the app
- There is an .env.example file if not hosted on a cloud solution or if it must be tested locally

# Timezone
Date/time detects and is displayed in the browser’s timezone

# Shoot times
If more than one shoot time per location is detected, they are listed below one another

# Map & Markers
- Marker clustering is turned on for markers groups more than 5 (default, but configurable) and at zoom level +2 of initial zoom
- Initial zoom set at 8 (configurable)
- Initial center point is Albuquerque (configurable)

# Unit/feature tests
No unit/feature tests were completed as they weren’t explicitly requested, but can be added on request

# State management
Redux is used for app state management and the dev tools extension is enabled in production mode as well for review purposes

# Todos
- Unit/feature tests
- Decoupling map, markers and info window components as functional components
- Toast messages for user feedback on errors, etc
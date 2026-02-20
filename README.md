## Project Structure

```
Notes/
├── src/
│   ├── cfg.js          # Database configuration
│   └── responses.js    # Response definitions
├── db/
│   └── schema.sql      # Database schema
├── api.js              # Main API server
└── README.md           # Project documentation
```

## Database Schema

The `notes` table includes:
- `id` - Auto-increment primary key
- `title` - Note title (required, max 255 characters)
- `note` - Note content (optional)
- `created_at` - Timestamp of creation
- `modified_at` - Timestamp of last modification

## Environment Variables

Create a `.env` file with the following variables:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=notes_db
DB_PORT=3306
```

## Endpoint Details

### GET `/notes`
Returns all notes from the database.

### GET `/note/:id`
Retrieve a specific note by ID. Returns 404 if not found.

### GET `/note/search/:note`
Search notes by content using pattern matching.

### POST `/note`
Create a new note. Requires `title` and `note` in request body.

### PUT `/note/:id`
Update a note's content. Requires `title` and `note` in request body.

### DELETE `/note/:id`
Delete a specific note by ID.

### DELETE `/note/deleteAll`
Delete all notes from the database.

# Notes API

A simple Express.js REST API for managing notes with MySQL database integration.

## Features

- Create, read, update, and delete notes
- CORS enabled for cross-origin requests
- JSON request/response format
- Database persistence with MySQL
- API availability status checking

## Prerequisites

- Node.js
- MySQL server
- npm packages: `express`, `mysql2`, `cors`

## Installation

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install express mysql2 cors
    ```
3. Configure database credentials in `src/cfg.js`
4. Start the server:
    ```bash
    node api.js
    ```

The API runs on `http://localhost:3000`

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notes` | Retrieve all notes |
| GET | `/note/search/:note` | Search note |
| POST | `/note` | Create a new note |
| PUT | `/note/:id` | Update a note by ID |
| DELETE | `/note/:id` | Delete a specific note |
| DELETE | `/notes` | Delete all notes |

## API Version

Current version: `1.0.0`

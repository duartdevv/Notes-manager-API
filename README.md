
# Habits API

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
| GET | `/allNotes` | Retrieve all notes |
| POST | `/note/create` | Create a new note |
| PUT | `/note/edit/:id` | Update a note by ID |
| DELETE | `/note/delete/:id` | Delete a specific note |
| DELETE | `/notes/deleteAll` | Delete all notes |

## API Version

Current version: `1.0.0`

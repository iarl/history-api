# Ukraine History API

This is a GraphQL API for managing historical events and personalities in Ukrainian history.

## Features
- CRUD operations for events and personalities
- Role-based access control (User, Moderator, Admin)
- Automatic documentation generation with SpectaQL
- MongoDB integration

## Installation

### Prerequisites
- Node.js v18+
- MongoDB instance (local or remote)

### Clone the Repository
```bash
git clone https://github.com/your-repo/ukraine-history-api.git
cd ukraine-history-api
```

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory with the following content:

```env
MONGO_URI=mongodb://localhost:27017/ukraine-history
JWT_SECRET=your_jwt_secret
PORT=4000
```

### Running the App
```bash
npm run dev
```
The server will start at `http://localhost:4000/`

## Authentication

### Register
#### Endpoint: `mutation register`
Payload:
```graphql
mutation {
  register(username: "moderator", password: "password", role: "moderator") {
    token
  }
}
```

### Login
#### Endpoint: `mutation login`
Payload:
```graphql
mutation {
  login(username: "moderator", password: "password") {
    token
  }
}
```

### Roles
| Role       | Permissions        |
|------------|------------------|
| User       | Read-only queries |
| Moderator  | Add, Update       |
| Admin      | Delete           |

## Queries

### Get All Events
```graphql
query {
  events {
    id
    title
    year
    description
  }
}
```

### Get Single Event
```graphql
query {
  event(id: "EVENT_ID") {
    title
    year
    description
  }
}
```

## Mutations

### Add Event (Moderator)
```graphql
mutation {
  addEvent(title: "Event Title", year: 2023, description: "Event Description") {
    id
    title
  }
}
```

### Update Event (Moderator)
```graphql
mutation {
  updateEvent(id: "EVENT_ID", title: "Updated Title") {
    id
    title
  }
}
```

### Delete Event (Admin)
```graphql
mutation {
  deleteEvent(id: "EVENT_ID")
}
```

## Documentation
The API documentation is available at:
```
http://localhost:4000/docs
```

## License
This project is licensed under the MIT License.


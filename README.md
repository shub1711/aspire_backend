# Backend

Node.js with GraphQL 
PostgreSQL for database management
Octokit for interacting with GitHub API
GraphQL for querying and mutating data

# Loom Videos for demo
https://www.loom.com/share/0cfc30f9dcf641e7b79cad5c5b3cc7dc
https://www.loom.com/share/ec050f4a6baf4de29ac1c9b547587d20

# Features

GraphQL API: Exposes endpoints to manage repositories, retrieve release information, and update seen statuses.

PostgreSQL Database: Stores repository metadata, release details, and user-specific statuses.

GitHub API Integration: Utilizes Octokit to fetch repository and release data from GitHub.

# Technology Stack

Node.js: Backend runtime environment.

GraphQL Framework: Apollo Server or GraphQL Yoga for building the API.

PostgreSQL: Database to persist data.

Octokit: GitHub API client library.

Prisma: Optional ORM for managing PostgreSQL schema and queries.

# Installation and Setup

Clone the repository:

git clone 
cd backend

Install dependencies:

npm install

Configure environment variables:

Create a .env file and provide the following:

DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database_name>
GITHUB_TOKEN=<your_github_token>

Run database migrations:

npx prisma migrate dev

Start the development server:

npm run start









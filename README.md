# Backend

Node.js with GraphQL 
PostgreSQL for database management
Octokit for interacting with GitHub API
GraphQL for querying and mutating data

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

Clone the repository:

bash
Copy code
git clone
cd aspire_backend
npm install
Set up PostgreSQL database:

Install PostgreSQL and create a new database.
Set up environment variables for database connection and GitHub API credentials in .env file.
npm run start

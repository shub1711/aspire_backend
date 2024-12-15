# Backend
# Technologies
Node.js with GraphQL (Apollo Server or GraphQL Yoga)
PostgreSQL for database management
Octokit for interacting with GitHub API
GraphQL for querying and mutating data
# Features
Track Repositories: Store tracked repositories in the database.
Release Metadata: Store release details such as version number, release date, and release notes.
Seen Status: Track user-specific seen status for each release.
GraphQL API: Expose a GraphQL API for querying and managing repositories, releases, and user statuses.
GitHub Integration: Use Octokit to fetch repository data (releases) from GitHub.

Clone the repository:

bash
Copy code
git clone
cd repository-tracker/backend
Install dependencies:

bash
Copy code
npm install
Set up PostgreSQL database:

Install PostgreSQL and create a new database.
Set up environment variables for database connection and GitHub API credentials in .env file.
Start the server:


npm run start

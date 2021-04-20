### gitlab-clean-envs

This is a little Node.js app that I made to clean up an bunch of old environments in a GitLab project in batch.

### Prerequisites

1. Install dependencies with `npm install`.  
1. Touch a file called `.env` with the following contents:

```dotenv
CI_JOB_TOKEN={YOUR PROJECT ACCESS TOKEN}
GITLAB_PROJECT_ID={THE ID OF YOUR GITLAB PROJECT}
```

### Running the app

Just run `npm start` and all of your stopped environments in your GitLab project will be deleted.
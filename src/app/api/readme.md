# API Documentation

## Endpoint: `/api/auth/sign-up`

### Description
This endpoint registers a new user. It performs the following actions:

- Checks if all required fields (`username`, `email`, `password`) are provided.
- Validates input using the `signUpValidation` schema.
- Checks if the email is already used by another user:
  - If used by a verified user, registration is blocked.
  - If used by an unverified user, the record is updated with the new username, password, and verification code.
- If the email is new, a new user is created with empty arrays for `solutions`, `submission`, and `solvedQuestions`.
- Generates a 6-digit verification code with 5-minute expiry.
- Hashes the password before storing it in the database.
- Sends a verification email containing the code using `sendVerificationEmail`.

### Method
`POST`

### Request Body

Send a JSON object with the following fields:

- `username`: A unique string (required)
- `email`: A valid email address (required)
- `password`: A string with a secure password (required)

#### Example Request
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```
### Example Response
The response will be a JSON object with the following fields:

- `success` (boolean): Indicates whether the request was successful (`true`) or not (`false`).
- `message` (string): Provides additional information about the result. For example, success confirmation or error description.

#### Success Response
```json
{
    "success": true,
    "message": "User registered successfully. Please verify your email"
}
```
# Interactive JWT Authentication Visualizer

## Project Objective
The original task was to add JSON Web Token (JWT) authentication to an existing RESTful API, ensure secure handling of tokens, and implement a protected route. This project expands on that objective by creating an interactive, visually appealing frontend to demonstrate JWT authentication in action.

## Project Overview
This project implements a secure authentication system using JSON Web Tokens (JWT) with a RESTful API backend and an interactive frontend. It visualizes the JWT as a 3D digital access card, providing a unique and engaging way to understand token-based authentication.

## Features
- User registration and login functionality
- JWT-based authentication
- Protected route implementation
- Interactive 3D digital access card visualization
- Token expiration countdown
- Animated token usage demonstration

## Technologies Used
- Backend:
  - Node.js
  - Express.js
  - JSON Web Tokens (jsonwebtoken)
  - bcrypt for password hashing
- Frontend:
  - HTML5
  - CSS3 (with 3D transforms)
  - Vanilla JavaScript

## How It Works
1. The backend implements user registration and login endpoints, generating JWTs upon successful authentication.
2. A middleware function verifies JWTs for protected routes.
3. The frontend allows users to register and log in, displaying the JWT as a 3D digital access card.
4. The access card shows a partial token and includes a countdown to token expiration.
5. Users can test the protected route, triggering an animation of the access card when accessed successfully.

## Setup and Running
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the backend server: `node server.js`
4. Open `index.html` in a web browser

## Security Considerations
- Passwords are hashed using bcrypt before storage
- JWTs are used for stateless authentication
- Token expiration is implemented to limit the validity period of tokens
- CORS is implemented to control access to the API

## Future Enhancements
- Implement refresh tokens for improved security
- Add more interactive elements to the frontend
- Implement additional security measures like rate limiting

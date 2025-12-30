# LeetCode Clone – Competitive Programming Platform

**Live Link:** 

<<<<<<< HEAD
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
=======
First, run the development server:
<img width="1920" height="1080" alt="ss1" src="https://github.com/user-attachments/assets/04705a8d-f19f-4df3-8c03-b5e61473881f" />
<img width="1920" height="1080" alt="ss2" src="https://github.com/user-attachments/assets/4f9bcd91-3151-4989-93e6-b9771ab29d2f" />
<img width="1920" height="1080" alt="ss3" src="https://github.com/user-attachments/assets/0e5ed5ac-83e8-40ab-984d-40172c0578ee" />
<img width="15773" height="12127" alt="diagram-export-12-25-2025-8_47_33-PM (1) (1)" src="https://github.com/user-attachments/assets/f4e9049a-5196-426e-b567-cd028314c9ff" />


>>>>>>> 4150ac8e453678a45e27e385c7f597378b5435ac

## Website Preview
### Code Editor
![ride1](https://github.com/user-attachments/assets/04705a8d-f19f-4df3-8c03-b5e61473881f)

### Profile
![ride1](https://github.com/user-attachments/assets/4f9bcd91-3151-4989-93e6-b9771ab29d2f)

### Submissions
![ride1](https://github.com/user-attachments/assets/0e5ed5ac-83e8-40ab-984d-40172c0578ee)

## Overview
This LeetCode Clone is a high-performance platform designed for developers to practice coding problems, execute code in real-time, and share detailed solutions. By integrating the Monaco Editor (the engine behind VS Code) and JudgeAPI, it provides a production-grade environment for mastering Data Structures and Algorithms.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Multi-Language Execution:** Support for **C, C++, Python, JavaScript, and Java** using a secure remote execution engine.
- **Advanced Code Editor:** Integrated **Monaco-React Editor** providing a VS Code-like experience with syntax highlighting and indentation.
- **Real-Time Code Running:** Leverage **JudgeAPI** to run code against test cases and receive instant feedback on performance and errors.
- **Solution Sharing:** A dedicated space for users to write and share their logic using **React-MD Editor** for beautiful Markdown formatting.
- **AI Leet Bot:** A built-in chat assistant to help users brainstorm algorithms, explain time complexity, or debug code logic.
- **Progress Tracking:** Personalized dashboard displaying the total count of solved problems and a comprehensive history of all user submissions.
- **Secure Authentication:** Robust sign-up flow with **email verification** via **Resend Mail** and schema validation using **Zod**.

## Technologies Used

- **Next.js:** Full-stack React framework for optimized routing and server-side rendering.
- **Tailwind CSS:** For a sleek, responsive, and developer-centric UI/UX.
- **MongoDB:** Database for managing users, coding problems, and shared solutions.
- **TypeScript:** Ensuring end-to-end type safety and better developer experience.
- **JudgeAPI:** External API for compiling and executing code in a sandboxed environment.
- **Monaco-React:** The industry-standard web code editor.
- **React-MD Editor:** A powerful Markdown editor for community solution posts.
- **Resend:** Professional email API for handling account verification.
- **React Hook Form & Zod:** For efficient form management and strict data validation.

## Project Setup

### Getting Started

Follow these steps to set up the project on your local machine:

1. **Clone the Repository**
```bash
git clone https://github.com/Avijit200318/Uber-Clone.git
```
2. **Add all the .env variables**
- Make sure to update the values (like API keys, Mongo URI, etc.) inside both .env files according to .env.txt file local setup or environment.
3. **Install Dependencies**
```bash
npm install
```
4. **Run the Development Server**
```bash
npm run dev
```
The application will be accessible at http://localhost:3000.

## API Documentation
 For API documentation [**click here**](https://github.com/Avijit200318/Leetcode-Clone/blob/main/src/app/api/readme.md)

## Usage

### For Users:

1. **Account Verification:** Sign up and verify your email through the link sent by **Resend**.
2. **Solve Problems:** Choose a challenge, select your preferred language (C, C++, Python, JS, Java), and write code in the **Monaco Editor**.
3. **Run & Submit:** Use the **Run** button to test your logic against sample cases via **JudgeAPI** and **Submit** to permanently save your progress and update your solved count.
4. **Chat with Bot:** Use the **Leet Bot** to get hints, clarify problem statements, or brainstorm logic when stuck.

### For Community & Sharing:

1. **Post Solutions:** Navigate to the solution tab and use the **Markdown Editor** (React-MD) to explain your approach with formatted code blocks and text.
2. **Track Growth:** View your profile to see the total count of problems solved and review your entire submission history.

## Contributing

Contributions are welcome! Whether you're fixing a bug, enhancing features, or suggesting improvements, feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for full details.


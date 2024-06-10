# Taskify
Taskify is a clone of the Trello site, built using modern web technologies including Next.js, React, Tailwind CSS, Prisma, and more. This project aims to provide a flexible and user-friendly task management application.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Scripts](#scripts)

## Features
- User authentication and management with Clerk
- Drag-and-drop functionality using @hello-pangea/dnd
- UI components from Shadcn/ui
- State management with Zustand
- API integration with Stripe for payment processing
- Responsive design with Tailwind CSS

## Tech Stack
- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [Clerk](https://clerk.dev/)
- **Drag-and-Drop:** [@hello-pangea/dnd](https://github.com/atlassian/react-beautiful-dnd)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Database:** [Prisma](https://www.prisma.io/)
- **Payment Processing:** [Stripe](https://stripe.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)

## Installation
To set up this project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/taskify.git
    cd taskify
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
    ```bash
    DATABASE_URL=your_database_url
    NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_next_public_unsplash_access_key
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_frontend_api
    CLERK_SECRET_KEY=your_clerk_secret_key
    STRIPE_API_KEY=your_stripe_api_key
    ```

4. **Set up the database:**
   ```bash
   npx prisma migrate dev --name init
   ```
## Running the Project
To run the project locally, use the following command:
   ```bash
   npm run dev
   ```
This will start the Next.js development server at http://localhost:3000.

## Scripts
- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for linting errors.

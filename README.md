# Bankker: Bank CSP Management System

> A comprehensive management system for Bank Customer Service Points (CSPs), designed to securely store daily transaction data and provide CRUD functionalities. Bankker offers an administrative interface for user management and a user-friendly platform for CSPs to record their daily transactions.

> Add more badges for CI/CD, code quality, etc., as needed.

## Features

-   **Secure Transaction Data Storage:** Safeguards daily transaction records for Bank CSPs.
-   **CRUD Functionalities:** Enables Create, Read, Update, and Delete operations for transaction data.
-   **User Management:** An admin interface to create and manage user accounts.
-   **Role-Based Access Control:** Differentiates access levels between admin and regular users.
-   **Intuitive User Interface:** User-friendly design for easy navigation and data input.
-   **Data Visualization:** Use of recharts to represent data in graphs and charts.
-   **Authentication:** Secure authentication using NextAuth.js.
-   **Modern UI:** Built with Radix UI and Tailwind CSS for a clean and accessible user experience.

## Technologies Used

-   [Next.js](https://nextjs.org/) - React framework for building performant web applications (v14.2.8).
-   [Prisma](https://www.prisma.io/) - Next-generation ORM.
-   [NextAuth.js](https://next-auth.js.org/) - Authentication library for Next.js.
-   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling (v3.4.1).
-   [Radix UI](https://www.radix-ui.com/) - Set of unstyled UI primitives for building accessible React apps.
-   [bcryptjs](https://github.com/dcodeIO/bcrypt.js/) - Password hashing.
-   [recharts](http://recharts.org/en-US/) - Data visualization library.
-   [Typescript](https://www.typescriptlang.org/) - Superset of JavaScript which primarily provides optional static typing.

> Add or modify technologies based on your project's stack.

## Getting Started

Follow these steps to set up the Bankker project locally.

### Prerequisites

-   [Node.js](https://nodejs.org/) (>=18)
-   [npm](https://www.npmjs.com/)
-   [Git](https://git-scm.com/)

### Installation

1.  Clone the repository:

        > npm install
        
    Create a `.env` file in the root of your project and configure the necessary environment variables, such as database connection strings, NextAuth secrets, etc.  Refer to `.env.example` if available.

4.  Run Prisma migrations:


        > npm run dev
    -   **Admin User:**

    > Log in with the admin credentials you created during the first registration. Use the admin interface to create and manage user accounts and roles.

-   **Regular Users (Bank CSPs):**

    > Log in with your credentials and start recording daily transaction data. Utilize the CRUD functionalities to manage your entries effectively.

## Learn More

To learn more about the technologies used, refer to the following resources:

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Prisma Documentation](https://www.prisma.io/docs/)
-   [NextAuth.js Documentation](https://next-auth.js.org/docs)
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
-   [Radix UI Documentation](https://www.radix-ui.com/docs)
-   [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js/)
-   [recharts Documentation](http://recharts.org/en-US/)
-   [Typescript Documentation](https://www.typescriptlang.org/docs/)
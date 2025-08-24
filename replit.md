# ToolHub - Online Calculators & Tools

## Overview

ToolHub is a full-stack web application that provides free online calculators, converters, and utility tools. The platform emphasizes privacy by performing all calculations client-side in the browser, ensuring no user data is transmitted to servers. Built with a modern React frontend and Express.js backend, the application features a responsive design with shadcn/ui components and a comprehensive set of utility tools including age calculators, BMI calculators, and more planned features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing with file-based page structure
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: shadcn/ui components built on Radix UI primitives for accessible, customizable interface elements
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for consistent theming
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture  
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript throughout for consistent type checking across client and server
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) that can be extended to database backends
- **Development**: Hot module replacement and development server integration with Vite middleware

### Data Storage Solutions
- **Database ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Database**: PostgreSQL (configured via Neon Database serverless) for production data persistence
- **Schema Management**: Centralized schema definitions in shared directory with Zod validation
- **Development Storage**: In-memory storage for development and testing scenarios

### Authentication and Authorization
- **Session Management**: Connect-pg-simple for PostgreSQL-backed session storage
- **User Model**: Basic user schema with username/password fields and UUID primary keys
- **Storage Interface**: User CRUD operations abstracted through IStorage interface

### External Dependencies
- **Database Provider**: Neon Database (@neondatabase/serverless) for serverless PostgreSQL hosting
- **Font Loading**: Google Fonts (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono) for typography
- **Icon System**: Font Awesome 6.4.0 for consistent iconography throughout the application
- **Development Tools**: Replit integration with development banner and cartographer plugin for enhanced development experience
- **Form Handling**: React Hook Form with Hookform Resolvers for robust form validation and user input processing
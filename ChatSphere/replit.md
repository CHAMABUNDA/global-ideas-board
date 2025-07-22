# Project Overview

This is a full-stack React application for sharing and collaborating on ideas aligned with the UN Sustainable Development Goals (SDGs). The application allows users to submit ideas, categorize them by SDG, track their development stage, and engage through comments and likes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and bundling
- **UI Components**: Comprehensive shadcn/ui component system with Radix UI primitives

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Real-time**: WebSocket integration for live updates
- **File Handling**: Multer for image uploads with 5MB limit
- **API Design**: RESTful endpoints with comprehensive CRUD operations

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Drizzle Kit for migrations
- **Connection**: Neon serverless with WebSocket support

## Key Components

### Data Models
- **Ideas**: Core entity with title, description, author, SDG category, development stage, tags, and image support
- **Comments**: Threaded discussions on ideas with author attribution
- **Users**: Basic user system (schema defined but not fully implemented)

### Development Stages
Ideas progress through four stages:
1. **Concept** (💡) - Initial idea formation
2. **Prototype** (⚙️) - Working prototype development
3. **Pilot** (🚀) - Testing and validation phase
4. **Impact** (📈) - Full implementation and scaling

### SDG Integration
- Full support for all 17 UN Sustainable Development Goals
- Visual icons and descriptions for each SDG
- Categorization and filtering by SDG focus areas

### Real-time Features
- WebSocket connections for live updates
- Automatic broadcasting of new ideas and comments
- Connection status monitoring with reconnection logic

## Data Flow

### Client-Server Communication
1. **React Query** manages server state and caching
2. **REST API** handles CRUD operations for ideas and comments
3. **WebSocket** provides real-time updates across connected clients
4. **Form validation** using Zod schemas shared between client and server

### File Upload Process
1. Images processed through Multer middleware
2. Base64 encoding for database storage
3. Size and type validation (images only, 5MB max)
4. Integration with idea creation and editing

### Search and Filtering
- Text search across idea titles and descriptions
- Category filtering by SDG
- Stage-based filtering for development progress
- Tag-based organization with auto-suggestion

## External Dependencies

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Chart.js**: Data visualization capabilities

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety across the stack
- **ESBuild**: Fast bundling for production
- **Replit Integration**: Development environment optimizations

### Backend Services
- **Neon Database**: Serverless PostgreSQL hosting
- **WebSocket (ws)**: Real-time communication
- **Express Session**: Session management setup

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Assets**: Static files served from build directory

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable
- **Development**: Hot reload with Vite middleware
- **Production**: Compiled JavaScript with Express static serving

### Scalability Considerations
- Serverless-ready database connection with Neon
- Stateless server design for horizontal scaling
- WebSocket connections managed per instance
- File storage through base64 encoding (consideration for external storage)

The application follows modern full-stack practices with type safety, real-time capabilities, and a focus on user experience through the shadcn/ui design system.
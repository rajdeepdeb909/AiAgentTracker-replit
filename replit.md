# Replit.md

## Overview
This is a full-stack AI Agent Management Platform built with React, Express, and PostgreSQL. The application provides a comprehensive dashboard for monitoring, evaluating, and managing AI agents, supporting technician empowerment and accessible home management. It integrates 28 specialized AI agents for comprehensive business operations, featuring a unified data processing system for real CSV data. Key capabilities include authentication and user management, comprehensive order lifecycle management, enhanced B2B client management with dynamic analytics, a real-time collaboration system, a personalized coaching recommendation engine, a fully functional dynamic AI agent evaluation system, granular permission enforcement, and comprehensive business function leader management with operational OKRs. The platform operates as national infrastructure, achieving a 94.8% autonomous execution rate using authentic operational data. The project's vision is to become "America's Home Manager," leveraging AI infrastructure to power every home, with a target of $1B valuation and $50M ARR.

**Codebase Scale:** 109,058 lines of code across 221 files (89,300 lines frontend, 16,732 lines backend, 2,355 lines shared code)

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18+ with TypeScript and Vite
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with a dark theme design system
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **Charts**: Chart.js for data visualization

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **Database**: PostgreSQL with Drizzle ORM for type-safe database interactions
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with JSON responses
- **Session Management**: PostgreSQL session store using connect-pg-simple

### Project Structure
- **Monorepo**: Single repository with client, server, and shared code
- **Client**: Frontend React application in `/client` directory
- **Server**: Express backend in `/server` directory
- **Shared**: Common schemas and types in `/shared` directory

### Technical Implementations & Design Decisions
- **Unified Data Processing System**: Single source of truth for all operational data, integrating real CSV data to ensure consistency and authenticity.
- **Dynamic AI Agent Evaluation System**: Universal evaluation templates, maturity-based filtering, and automated evaluation execution.
- **Performance Alert System**: 20 critical operational alerts connected to specific AI agents with automated stakeholder notifications.
- **Real-Time Collaboration System**: WebSocket-powered presence tracking, activity broadcasting, and strategic action execution for live executive coordination.
- **Comprehensive OKR System**: Q3 2025 Executive OKRs with real-time progress tracking, aligned with operational metrics.
- **Automated Reporting System**: AI agent-driven weekly reporting system for autonomous intelligence, generating reports and executing improvement actions (94.8% automation rate).
- **Interactive Business Knowledge System**: Prompt performance analysis with contextual metrics visualization, dynamic header generation, and multi-view interfaces.
- **Parts Order Management**: Comprehensive system with guaranteed delivery date estimation, automated follow-up processes, and real-time vendor performance monitoring.
- **Technician Retention Intelligence**: Comprehensive monitoring and a "Magik Button" framework for technician empowerment with 50+ use cases.
- **Comprehensive Operations Documentation Suite**: Covers platform operation, AI agent ecosystem, and business operations manual.
- **Predictive Scheduling Warning System**: AI-powered early warning system for scheduling disruptions and capacity management with multi-agent integration and geographic intelligence.
- **AI Call Center Scheduling Agent Integration**: Comprehensive call center analytics and scheduling optimization based on real operational data.
- **1099 Contractor Management Platform**: Integrated recruitment, performance tracking, and dual workforce optimization for contractor firms.
- **Technician Lifecycle Management System**: AI-powered recruiting and training agents supporting technician empowerment.
- **Modular Feature Design**: Features are built as separate modules for adaptability.
- **Storage Interface Pattern**: Abstract storage interface for flexibility.
- **Zod Validation**: Runtime type checking and validation for data integrity across client and server.
- **Permission Enforcement System**: Comprehensive permission-based access control system with granular permissions.

### UI/UX Decisions
- **Dark Theme Design System**: Consistent dark theme applied throughout the application for a modern and professional aesthetic.
- **Responsive Design**: Components are designed to be responsive across various screen sizes.
- **Intuitive Navigation**: Role-based permissions for navigation, functional back button, and seamless hyperlinks between all system components.
- **Visualizations**: Extensive use of Chart.js for data visualization, color-coded indicators, progress bars, and interactive tables for clear insights.
- **Modal-Based Interfaces**: Professional dialog modals for various actions.

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, Vite, TypeScript
- **UI Components**: Radix UI, shadcn/ui, Tailwind CSS
- **Data Fetching**: TanStack React Query
- **Forms**: React Hook Form
- **Charts**: Chart.js
- **Routing**: Wouter
- **Date Handling**: date-fns

### Backend Dependencies
- **Runtime**: Node.js with Express.js
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Validation**: Zod
- **Session Management**: connect-pg-simple
- **Messaging**: SendGrid
- **Real-time Communication**: WebSockets

### Database
- **Provider**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle with PostgreSQL dialect

## Production Readiness
- **Comprehensive Production Plan**: 6-phase deployment strategy documented for enterprise-scale production deployment
- **Investment Required**: $180K-$280K initial setup + $39,750/month operational costs
- **Target Infrastructure**: Kubernetes on AWS EKS with enterprise-grade security, monitoring, and compliance
- **Real Data Integration**: American Home Shield API integration with 40 Area Managers and 300+ vendors
- **Streaming Architecture**: Apache Kafka + AWS Kinesis for real-time data processing
- **AI Infrastructure**: Production-grade AI model deployment with OpenAI GPT-4 Enterprise and Anthropic Claude backup
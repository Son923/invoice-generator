# Invoice Generator

A modern web application for creating, managing, and generating professional invoices with PDF export capabilities.

## Features

- User authentication
- Create and customize invoices
- Generate and download PDF invoices
- Save and manage invoices
- Responsive design for desktop and mobile

## Tech Stack

- Next.js 14
- React
- TypeScript
- TailwindCSS
- Shadcn/UI
- Appwrite (Authentication, Database)
- jsPDF
- Vercel

## Documentation

For detailed information about this project, please refer to the [documentation](docs/) directory:

- [Quick Start Guide](docs/QUICK_START.md) - Get up and running quickly
- [Project Documentation](docs/PROJECT_DOCUMENTATION.md) - Comprehensive project overview
- [AI Assistant Guide](docs/AI_ASSISTANT_GUIDE.md) - Guidelines for AI assistants

## Development

```bash
# Clone the repository
git clone https://github.com/Son923/invoice-generator.git
cd invoice-generator

# Switch to development branch
git checkout dev

# Install dependencies
npm install

# Start development server
npm run dev
```

## Branch Structure

This project follows a structured branching strategy:

- **`dev`** - Development branch where all active development occurs
- **`main`** - Production branch that is deployed to Vercel

> **Important**: Always work on the `dev` branch. The `main` branch is reserved for production-ready code and should only be updated when explicitly requested by the project owner.

## License

MIT 
# Radiology Templates Management System

A comprehensive radiology report template management system with 668 templates across multiple modalities.

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation Steps

1. **Extract the zip file**

2. **Open terminal in the extracted folder**

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

5. **Setup the database:**
   ```bash
   npx prisma db push
   ```

6. **Seed the database with templates:**
   ```bash
   npm run db:seed
   ```

7. **Start the development server:**
   ```bash
   npm run dev
   ```

8. **Open in browser:** http://localhost:3000

## Default Login Credentials

- **Username:** `admin`
- **Password:** `password`

## Features

- **668 Templates** across 8 modalities:
  - X-Ray (261 templates)
  - MRI (108 templates)
  - CT (100 templates)
  - Fluoroscopy (99 templates)
  - Ultrasound (90 templates)
  - Nuclear Medicine (6 templates)
  - Interventional (2 templates)
  - Mammography (2 templates)

- **Intelligent Features**:
  - Laterality support (Right/Left/Bilateral) for extremity exams
  - View combinations (AP, Lateral, Oblique, 2-view, 3-view series)
  - One-click "Copy Normal" functionality
  - Fuzzy search across all templates
  - Snippets management

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy automatically

### Option 2: Docker

```bash
# Build the image
docker build -t radiology-templates .

# Run the container
docker run -p 3000:3000 radiology-templates
```

### Option 3: Node.js Production Server

```bash
# Build for production
npm run build

# Start the server
npm start
```

### Option 4: Cloudflare Pages

See `CLOUDFLARE.md` for detailed instructions.

## Troubleshooting

### "templates.filter is not a function" Error

This means the database is not set up. Run:
```bash
npx prisma db push
npm run db:seed
```

### Database Connection Error

Make sure the `.env` file contains:
```
DATABASE_URL="file:./db/dev.db"
```

### Prisma Client Not Found

Run:
```bash
npx prisma generate
```

## Tech Stack

- **Framework:** Next.js 15
- **Database:** SQLite with Prisma ORM
- **UI:** shadcn/ui, Tailwind CSS
- **Icons:** Lucide React

## License

MIT

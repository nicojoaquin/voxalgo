# 🎙️ VoxAlgo - AI-Powered Virtual Assistants for Calls

Welcome to **VoxAlgo**! 🚀  
A cutting-edge application built with **NestJS** using a microservices architecture to integrate AI virtual assistants into call management systems. 🌐

---

## 🌟 Key Features

- **AI-Driven Call Management**: Enhance your call workflows with intelligent virtual assistants.
- **Microservices Architecture**: Highly modular and scalable backend.
- **Containerized Deployment**: Simplified deployment using **Docker**.
- **Reliable Database**: Powered by **PostgreSQL** and managed with **Prisma ORM**.

---

## 🛠️ Technologies Used

| Technology        | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| **NestJS**        | A progressive Node.js framework for building efficient applications. |
| **Microservices** | Modular design for scalability and flexibility.                      |
| **Docker**        | Simplified containerization for consistent environments.             |
| **PostgreSQL**    | A reliable, scalable relational database.                            |
| **Prisma ORM**    | Elegant database access and migrations.                              |

---

## ⚙️ Setup Instructions

Follow these steps to get started with VoxAlgo:

```bash
# Clone the repository
git clone https://github.com/your-repo/voxalgo.git
cd voxalgo

# Create .env file (copy content from .env.example and ask for secret keys)

# Install dependencies
npm install

# Start the PostgreSQL service
docker-compose up -d --build postgres

# Run database migrations
npm run migrate:dev

# Generate Prisma client
npm run generate

# Build the application image
npm run docker:build

# Start the development server
npm run dev

# Test the health endpoint
# Open your browser or use a tool like curl or Postman to visit:
# http://localhost:8080/health
```

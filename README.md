# 🚀 Hybrid Persistence Architecture - REST API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green?logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/MongoDB-7-green?logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/Express.js-5-black?logo=express" alt="Express">
  <img src="https://img.shields.io/badge/Docker-Compose-blue?logo=docker" alt="Docker">
</p>

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Architecture Justification](#-architecture-justification)
3. [Technology Stack](#-technology-stack)
4. [Project Structure](#-project-structure)
5. [Getting Started](#-getting-started)
6. [Environment Configuration](#-environment-configuration)
7. [API Documentation](#-api-documentation)
8. [Database Schemas](#-database-schemas)
9. [ETL Migration Process](#-etl-migration-process)
10. [Docker Configuration](#-docker-configuration)
11. [Development Guide](#-development-guide)
12. [Testing](#-testing)
13. [Troubleshooting](#-troubleshooting)
14. [Resources & References](#-resources--references)
15. [Contributing](#-contributing)
16. [License](#-license)

---

## 📖 Overview

This project implements a **production-ready REST API** using a **hybrid persistence architecture** that combines the strengths of both relational (SQL) and document-based (NoSQL) databases.

### Key Features

- ✅ **Hybrid Data Storage**: PostgreSQL for relational data, MongoDB for document-based queries
- ✅ **Idempotent Operations**: Safe re-execution without data duplication
- ✅ **RESTful API**: Full CRUD operations with proper HTTP semantics
- ✅ **Docker Ready**: Containerized database setup for consistent environments
- ✅ **Transaction Support**: ACID compliance for critical operations

---

## 🧠 Architecture Justification

### Why Hybrid Persistence?

Modern applications often face conflicting data requirements. This architecture addresses them by using each database for its strengths:

| Requirement | PostgreSQL (SQL) | MongoDB (NoSQL) |
|-------------|------------------|-----------------|
| **Referential Integrity** | ✅ Foreign Keys, Constraints | ❌ No built-in relations |
| **Complex Joins** | ✅ Optimized query planner | ❌ Requires aggregation pipelines |
| **ACID Transactions** | ✅ Full support | ⚠️ Limited (single document) |
| **Read Performance** | ⚠️ Depends on indexes & joins | ✅ O(1) document retrieval |
| **Schema Flexibility** | ❌ Rigid schema required | ✅ Dynamic schema |
| **Historical Records** | ⚠️ Complex queries needed | ✅ Embedded documents |

### Data Distribution Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATA SOURCES                              │
│                         (CSV Files)                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     ETL MIGRATION LAYER                          │
│         (Extract → Transform → Load)                             │
│                                                                  │
│         • Deduplication logic                                    │
│         • Parallel writes to both databases                      │
└─────────────────────────────────────────────────────────────────┘
                    │                       │
                    ▼                       ▼
┌───────────────────────────┐   ┌───────────────────────────────┐
│      POSTGRESQL           │   │         MONGODB               │
│   (Operational Data)      │   │    (Read-Optimized Views)     │
├───────────────────────────┤   ├───────────────────────────────┤
│ • Normalized tables       │   │ • Denormalized documents      │
│ • Foreign key relations   │   │ • Embedded arrays             │
│ • Transactional writes    │   │ • Pre-computed aggregates     │
│ • Financial reports       │   │ • Fast historical queries     │
└───────────────────────────┘   └───────────────────────────────┘
```

### When to Use Each Database

| Use Case | Database | Reason |
|----------|----------|--------|
| Create/Update entities | PostgreSQL | Ensures data integrity |
| Delete operations | PostgreSQL | Cascading deletes, constraints |
| Complex aggregations | PostgreSQL | SQL JOINs, GROUP BY |
| Historical records lookup | MongoDB | Single document contains all history |
| Dashboard queries | MongoDB | Pre-aggregated summaries |
| Audit trails | MongoDB | Flexible schema for metadata |

---

## 🔧 Technology Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **Express.js** | 5.x | Web framework |
| **pg** | 8.x | PostgreSQL client |
| **Mongoose** | 9.x | MongoDB ODM |
| **dotenv** | 17.x | Environment variables |
| **csv-parser** | 3.x | CSV file processing |

### Databases

| Database | Version | Purpose |
|----------|---------|---------|
| **PostgreSQL** | 16 (Alpine) | Relational data storage |
| **MongoDB** | 7 | Document storage |

### DevOps

| Tool | Purpose |
|------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |

---

## 📁 Project Structure

```
project-root/
│
├── 📂 src/                          # Source code
│   ├── 📂 config/                   # Configuration files
│   │   ├── env.js                   # Environment variable loader
│   │   ├── mongoDB.js               # MongoDB connection handler
│   │   └── postgres.js              # PostgreSQL pool configuration
│   │
│   ├── 📂 models/                   # MongoDB schemas (Mongoose)
│   │   └── customerSchema.js         # Document schema definition for customer transactions
│   │   └── logsSchema.js             # Document Schema Definition for logs
|   |
│   ├── 📂 services/                 # Business logic layer
│   │   ├── clienService.js          # client-related operations
│   │   ├── supplierService.js       # supplier generation logic
│   │   ├── migrateService.js        # ETL migration logic
│   │   └── productService.js        # product-related operations
│   │
│   ├── 📂 routes/                   # API route definitions
│   │   ├── clientRoute.js           # /api/client endpoints
│   │   ├── supplierRoute.js         # /api/supplier endpoints
│   │   ├── migrate.js               # /api/prueba endpoints     for migration
│   │   └── productRoute.js          # /api/product endpoints
│   │
│   │
│   ├── app.js                       # Express application setup
│   └── server.js                    # Server entry point
│
├── 📂 data/                         # Data files
│   ├── x.csv                        # Source data for migration
│   └── script_sql.sql               # SQL schema reference
|   └── DER_tienda-transacciones.png # DER diagram entity relation
│
├── .env                             # Environment variables (git-ignored)
├── .env.example                     # Environment template
├── docker-compose.yml               # Docker services configuration
├── package.json                     # Node.js dependencies
└── README.md                        # This file
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop/))
- **Git** ([Download](https://git-scm.com/))
- **Postman** or similar API client ([Download](https://www.postman.com/))

### Installation Steps

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

#### 2. Install Dependencies

```bash
npm install
npm i dotenv
npm i express
npm i mongoose
npm i pg
npm i fs
npm i csv-parser
npm i csv-parse
```

#### 3. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
```

#### 4. Start Database Containers

```bash
docker-compose up -d
```

#### 5. Verify Containers Are Running

```bash
docker ps
```

Expected output:
```
CONTAINER ID   IMAGE                PORTS                     NAMES
xxxxxxxxxxxx   postgres:16-alpine   0.0.0.0:5434->5432/tcp   postgres-container
xxxxxxxxxxxx   mongo:7              0.0.0.0:27018->27017/tcp  mongo-container
```

#### 6. Start the Application

```bash
npm run dev
```

Expected output:
```
✅ MongoDB connected successfully
✅ PostgreSQL tables verified/created
✅ Server running on http://localhost:3000
```

---

## ⚙️ Environment Configuration

### Required Variables

Create a `.env` file in the project root:

```env
# Server Configuration
PORT=3000

# PostgreSQL Connection
# Format: postgresql://user:password@host:port/database
POSTGRES_URI="postgresql://username:password@localhost:5434/database_name"

# MongoDB Connection
# Format: mongodb://host:port/database
MONGO_URI="mongodb://localhost:27018/database_name"

# Data Source
FILE_DATA_CSV="./data/your_data_file.csv"
```

### Environment Variable Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `3000` | HTTP server port |
| `POSTGRES_URI` | **Yes** | - | PostgreSQL connection string |
| `MONGO_URI` | **Yes** | - | MongoDB connection string |
| `FILE_DATA_CSV` | No | `./data/prueba_unigestion_data2.csv` | Path to CSV data file |

---

## 📡 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Endpoints Overview

| Method | Endpoint | Description | Database |
|--------|----------|-------------|----------|
| `POST` | `/prueba/migrate` | Execute ETL migration | Both |
| `GET` | `/supplier` | List all courses | PostgreSQL |
| `GET` | `/supplier/top` | get supplier top | PostgreSQL |
| `GET` | `/top-products/:category_id` | products report | PostgreSQL |
| `GET` | `/client/:id` | get client by id |

---

### POST `/api/prueba/migrate`

Executes the ETL migration process from CSV to databases.

**Request:**
```http
POST /api/prueba/migrate
Content-Type: application/json
```

**Response (200 OK):**
```json
{
    "message": "Migración completada exitosamente",
    "counters": {
        "countCustomers": 9,
        "countProducts": 15,
        "countCategories": 3,
        "countSuppliers": 5,
        "countOrders": 30,
        "countTransactions": 78
    }
}
```

---

### GET `/api/supplier/top`

Retrieves all suppliers with sales information.

**Request:**
```http
GET /api/supplier/top
```

**Response (200 OK):**
```json
{
    "message": "Proveedores obtenidos exitosamente",
    "count": 5,
    "suppliers": [
        {
            "supplier_name": "Global Supplies Co",
            "total_quantity": "41"
        },
        {
            "supplier_name": "Distribuciones Andinas",
            "total_quantity": "35"
        },
        {
            "supplier_name": "AccesNet SAS",
            "total_quantity": "33"
        },
        {
            "supplier_name": "TechWorld SAS",
            "total_quantity": "32"
        },
        {
            "supplier_name": "HogarPro Ltda",
            "total_quantity": "14"
        }
    ]
}
```

---

### GET `/api/top-products/:category_id`

Retrieves a specific course by its code.

**Request:**
```http
GET /api/top-products/1
```

**Response (200 OK):**
```json
[
    {
        "product_name": "Audifonos Sony WH",
        "total_quantity": "9",
        "total_revenue": "4050000"
    },
    {
        "product_name": "Teclado Redragon",
        "total_quantity": "16",
        "total_revenue": "2880000"
    },
    {
        "product_name": "Mouse Logitech M502",
        "total_quantity": "15",
        "total_revenue": "2250000"
    },
    {
        "product_name": "Webcam Anker HD",
        "total_quantity": "8",
        "total_revenue": "2000000"
    },
    {
        "product_name": "USB Sony 128GB",
        "total_quantity": "11",
        "total_revenue": "990000"
    }
]
```

**Response (404 Not Found):**
```json
{
  "message": "product not found"
}
```

---

### GET `/api/client/:id`

Generates a financial report grouped by department.

**Request:**
```http
GET /api/client/8
```

**Response (200 OK):**
```json
{
    "message": "Clientes obtenidos exitosamente",
    "count": 5,
    "clients": [
        {
            "name": "Daniel Torres",
            "order_id": "TXN-2003",
            "date": "2024-02-17T05:00:00.000Z",
            "total_value": 150000,
            "product_name": "Mouse Logitech M502",
            "quantity": 1
        },
        {
            "name": "Daniel Torres",
            "order_id": "TXN-2003",
            "date": "2024-02-17T05:00:00.000Z",
            "total_value": 750000,
            "product_name": "Escritorio MDF",
            "quantity": 1
        },
        {
            "name": "Daniel Torres",
            "order_id": "TXN-2003",
            "date": "2024-02-17T05:00:00.000Z",
            "total_value": 1800000,
            "product_name": "Impresora HP 110",
            "quantity": 3
        },
        {
            "name": "Daniel Torres",
            "order_id": "TXN-2003",
            "date": "2024-02-17T05:00:00.000Z",
            "total_value": 360000,
            "product_name": "Teclado Redragon",
            "quantity": 2
        },
        {
            "name": "Daniel Torres",
            "order_id": "TXN-2021",
            "date": "2024-02-01T05:00:00.000Z",
            "total_value": 2550000,
            "product_name": "Monitor LG 27 pulgadas",
            "quantity": 3
        }
    ]
}
```

---

## 🗃️ Database Schemas

### PostgreSQL Schema

```sql
CREATE TABLE IF NOT EXISTS "transaction" (
	"id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
	"quantity" INTEGER NOT NULL,
	"total_value" INTEGER NOT NULL,
	"product_id" VARCHAR(30) NOT NULL,
	"supplier_id" INTEGER NOT NULL,
	"order_id" VARCHAR(30) NOT NULL,
	"customer_id" INTEGER NOT NULL,
	PRIMARY KEY("id")
);




CREATE TABLE IF NOT EXISTS "customer" (
	"id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
	"name" VARCHAR(50) NOT NULL,
	"email" VARCHAR(50) NOT NULL UNIQUE,
	"address" VARCHAR(50) NOT NULL,
	"phone" VARCHAR(50) NOT NULL,
	"city_id" INTEGER NOT NULL,
	PRIMARY KEY("id")
);




CREATE TABLE IF NOT EXISTS "product" (
	"id" VARCHAR(30) NOT NULL UNIQUE,
	"name" VARCHAR(100) NOT NULL,
	"price" INTEGER NOT NULL,
	"category_id" INTEGER NOT NULL,
	PRIMARY KEY("id")
);




CREATE TABLE IF NOT EXISTS "category" (
	"id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
	"name" VARCHAR(50) NOT NULL UNIQUE,
	PRIMARY KEY("id")
);




CREATE TABLE IF NOT EXISTS "supplier" (
	"id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
	"name" VARCHAR(50) NOT NULL,
	"email" VARCHAR(50) NOT NULL UNIQUE,
	PRIMARY KEY("id")
);




CREATE TABLE IF NOT EXISTS "city" (
	"id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
	"name" VARCHAR(50) NOT NULL UNIQUE,
	PRIMARY KEY("id")
);




CREATE TABLE IF NOT EXISTS "order" (
	"id" VARCHAR(30) NOT NULL UNIQUE,
	"date" DATE,
	PRIMARY KEY("id")
);


ALTER TABLE "product"
ADD FOREIGN KEY("category_id") REFERENCES "category"("id")
ON UPDATE cascade ON DELETE cascade;
ALTER TABLE "transaction"
ADD FOREIGN KEY("customer_id") REFERENCES "customer"("id")
ON UPDATE cascade ON DELETE cascade;
ALTER TABLE "transaction"
ADD FOREIGN KEY("product_id") REFERENCES "product"("id")
ON UPDATE cascade ON DELETE cascade;
ALTER TABLE "customer"
ADD FOREIGN KEY("city_id") REFERENCES "city"("id")
ON UPDATE cascade ON DELETE cascade;
ALTER TABLE "transaction"
ADD FOREIGN KEY("supplier_id") REFERENCES "supplier"("id")
ON UPDATE cascade ON DELETE cascade;
ALTER TABLE "transaction"
ADD FOREIGN KEY("order_id") REFERENCES "order"("id")
ON UPDATE cascade ON DELETE cascade;
ALTER TABLE "transaction" 
ADD CONSTRAINT "unique_product_order" UNIQUE ("product_id", "order_id");
```

### MongoDB Schema

```javascript
// customerSchema
    {
        "customerEmail": String,
        "customerName": String,
        "orderHistory": [
          "orderId": String,
        "date": Date,
        "products": ["productSku": String,
        "productName": String,
        "quantity": Number,
        "unitPrice": Number,
        "totalValue": Number]
        ]
    }
  
```

---

## 🔄 ETL Migration Process

The migration process follows the ETL (Extract, Transform, Load) pattern:

### 1. Extract
- Reads CSV file using streams (memory efficient)
- Parses each row into JavaScript objects

### 2. Transform
- **Data Cleaning**: Trims whitespace, normalizes casing
- **Deduplication**: Prevents duplicate entries
- **Validation**: Ensures data integrity

### 3. Load
- **PostgreSQL**: Inserts normalized data with `ON CONFLICT` for idempotency
- **MongoDB**: Creates/updates denormalized documents with `findOneAndUpdate`

### Idempotency

The migration is idempotent - running it multiple times produces the same result:

```sql
-- PostgreSQL uses ON CONFLICT
INSERT INTO "transaction" ("quantity", "total_value", "product_id", "supplier_id", "order_id", "customer_id") 
                VALUES ($1, $2, $3, $4, $5, $6) 
                ON CONFLICT ("product_id", "order_id")
                DO UPDATE SET quantity = EXCLUDED.quantity, total_value = EXCLUDED.total_value, product_id = EXCLUDED.product_id, supplier_id = EXCLUDED.supplier_id, customer_id = EXCLUDED.customer_id
                RETURNING xmax;  -- xmax = 0 means INSERT, > 0 means UPDATE
```

---

## 🐳 Docker Configuration

### docker-compose.yml

```yaml
version: "3.9"

services:
  postgres:
    image: postgres:16-alpine
    container_name: postgres-container
    restart: unless-stopped
    environment:
      POSTGRES_USER: your_user
      POSTGRES_PASSWORD: your_password
      POSTGRES_DB: your_database
    ports:
      - "5434:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  mongo:
    image: mongo:7
    container_name: mongo-container
    restart: unless-stopped
    ports:
      - "27018:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  postgres_data:
  mongo_data:
```

### Docker Commands Reference

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start containers in background |
| `docker-compose down` | Stop and remove containers |
| `docker-compose down -v` | Stop containers and delete volumes |
| `docker-compose logs -f` | Follow container logs |
| `docker ps` | List running containers |
| `docker exec -it <container> psql -U user -d db` | Access PostgreSQL CLI |
| `docker exec -it <container> mongosh` | Access MongoDB shell |

---

## 💻 Development Guide

### Adding a New Endpoint

#### Step 1: Create the Service

```javascript
// src/services/myService.js
import { pool } from "../config/postgres.js";

export async function getAll() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM my_table');
        await client.query('COMMIT');
        return result.rows;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}
```

#### Step 2: Create the Route

```javascript
// src/routes/myRoute.js
import { Router } from "express";
import { getAll } from "../services/myService.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const data = await getAll();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
```

#### Step 3: Register the Route

```javascript
// src/app.js
import myRouter from "./routes/myRoute.js";
app.use('/api/my-endpoint', myRouter);
```

---

## 🧪 Testing

### Manual Testing with Postman

1. Import the collection or create requests manually
2. Set environment variable: `{{base_url}}` = `http://localhost:3000`
3. Test sequence:
   - POST `/api/prueba/migrate` (run first)
   - GET `/api/courses`
   - GET `/api/students/:email/transcript`

### Testing with cURL

```bash
# Migrate data
curl -X POST http://localhost:3000/api/prueba/migrate

# Get all courses
curl http://localhost:3000/api/courses

# Get student transcript
curl http://localhost:3000/api/students/j.perez@example.edu/transcript
```

---

## 🔧 Troubleshooting

### Common Issues

| Error | Cause | Solution |
|-------|-------|----------|
| `ECONNREFUSED` | Database not running | Run `docker-compose up -d` |
| `Missing environment variable` | `.env` not configured | Copy `.env.example` to `.env` |
| `relation does not exist` | Tables not created | Restart server (auto-creates tables) |
| `MongooseServerSelectionError` | Wrong MongoDB URI | Check `MONGO_URI` in `.env` |

### Checking Container Logs

```bash
# PostgreSQL logs
docker logs postgres-container

# MongoDB logs  
docker logs mongo-container
```

---

## 📚 Resources & References

### Documentation

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [MongoDB Manual](https://www.mongodb.com/docs/manual/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Docker Documentation](https://docs.docker.com/)

### Learning Resources

- [REST API Best Practices](https://restfulapi.net/)
- [Database Normalization](https://www.guru99.com/database-normalization.html)
- [SQL vs NoSQL](https://www.mongodb.com/nosql-explained/nosql-vs-sql)
- [Docker for Beginners](https://docker-curriculum.com/)

### Tools

- [Postman](https://www.postman.com/) - API testing
- [DBeaver](https://dbeaver.io/) - Database GUI for PostgreSQL
- [MongoDB Compass](https://www.mongodb.com/products/compass) - MongoDB GUI

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Convention

```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Example: feat(api): add student enrollment endpoint
```

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">
  Made with ❤️ using Node.js, PostgreSQL, and MongoDB
</p>

## NORMALIZATION TABLES
first the I change the xlsx for a csv, then I separeted manually the city and the address for more normalization, and then I create tables without transitive references or dependencie of secondary id, 1FN only the city that was in the address, 2FN separate the product that has product_sku and order like transaction_id, because each transaction id has an order, and the transaction id is repeated in the csv. 
then the 3FN I separeted category, supplier, and customer, and at the end I have 7 entities like 
orders, transaction, product, category, supplier, customer, city

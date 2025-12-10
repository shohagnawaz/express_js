import express, { Request, Response } from "express";
import { Pool } from "pg";

const app = express();
const port = 5000;

// parser
app.use(express.json());
// app.use(express.urlencoded);

// DB
const pool = new Pool({
    connectionString: `postgresql://neondb_owner:npg_6BtWab2Rfqmo@ep-holy-silence-a82qbiiv-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require`
});

const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            age INT,
            phone VARCHAR(15),
            address TEXT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
};

initDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Next Level Developers')
})

app.post("/", (req: Request, res: Response) => {
    console.log(req.body);

    res.status(201).json({
        success: true,
        message: "API is working"
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

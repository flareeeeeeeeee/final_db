import { Router } from "express";
import { PrismaClient } from "@prisma/client";


const router = Router();

router.get("/", async (req, res) => {

    
    const client = new PrismaClient();
    const customers = await client.$queryRaw`SELECT * FROM customers`;


    res.json(customers);
    client.$disconnect();
});

router.post("/", async (req, res) => {
    const client = new PrismaClient();
    const { name, price } = req.body;
    const product = await client.$queryRaw`INSERT INTO customers (name, price) VALUES (${name}, ${price}) RETURNING *`;

    res.json(product);
    client.$disconnect();

});

router.get("/:id", async (req, res) => {
    const client = new PrismaClient();
    const { id } = req.params;
    const product = await client.$queryRaw`SELECT * FROM customers WHERE id = ${id}`;

    res.json(product);
    client.$disconnect();

});

router.put("/:id", async (req, res) => {
    const client = new PrismaClient();
    const { id } = req.params;
    const { name, price } = req.body;
    const product = await client.$queryRaw`UPDATE customers SET name = ${name}, price = ${price} WHERE id = ${id} RETURNING *`;

    res.json(product);
    client.$disconnect();

});

router.delete("/:id", async (req, res) => {
    const client = new PrismaClient();
    const { id } = req.params;
    const product = await client.$queryRaw`DELETE FROM customers WHERE id = ${id} RETURNING *`;

    res.json(product);
    client.$disconnect();

});




export default router;

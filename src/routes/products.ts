import { Router } from "express";
import { PrismaClient } from "@prisma/client";


const router = Router();

router.get("/", async (req, res) => {

    
    const client = new PrismaClient();
    const products = await client.$queryRaw`SELECT * FROM products`;


    res.json(products);
    client.$disconnect();
});

router.post("/", async (req, res) => {
    const client = new PrismaClient();
    const { name, price } = req.body;
    const product = await client.$queryRaw`INSERT INTO products (name, price) VALUES (${name}, ${price}) RETURNING *`;

    res.json(product);
    client.$disconnect();

});

router.get("/:id", async (req, res) => {
    const client = new PrismaClient();
    const { id } = req.params;
    const product = await client.$queryRaw`SELECT * FROM products WHERE id = ${id}`;

    res.json(product);
    client.$disconnect();

});

router.put("/:id", async (req, res) => {
    const client = new PrismaClient();
    const { id } = req.params;
    const { name, price } = req.body;
    const product = await client.$queryRaw`UPDATE products SET name = ${name}, price = ${price} WHERE id = ${id} RETURNING *`;

    res.json(product);
    client.$disconnect();

});

router.delete("/:id", async (req, res) => {
    const client = new PrismaClient();
    const { id } = req.params;
    const product = await client.$queryRaw`DELETE FROM products WHERE id = ${id} RETURNING *`;

    res.json(product);
    client.$disconnect();

});




export default router;

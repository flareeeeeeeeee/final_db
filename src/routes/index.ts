import { Router } from "express";
import products from "./products";
import customers from "./customers";

const router = Router();


router.use('/products', products);
router.use('/customers', customers);


export default router;

const fastify = require('fastify')({ logger: true });
const fastifyCors = require('@fastify/cors');
const dotenv = require('dotenv');
dotenv.config();

const productsRoutes = require('./routes/products');
const termsRoutes = require('./routes/terms');
const db = require('./config/db');
const Product = require('./models/Product');
const Terms = require('./models/Terms');

async function startServer() {
  try {
    await fastify.register(fastifyCors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });

    fastify.register(productsRoutes);
    fastify.register(termsRoutes);

    await db.sync({ alter: true });
    fastify.log.info('Tables synced');

    // Seed sample products if none exist
    const productCount = await Product.count();
    if (productCount === 0) {
      await Product.bulkCreate([
        {
          articleNo: "A101",
          productName: "Sample Product 1",
          inPrice: 50,
          price: 100,
          unit: "pcs",
          inStock: 10,
          description: "Seed product 1"
        },
        {
          articleNo: "A102",
          productName: "Sample Product 2",
          inPrice: 60,
          price: 120,
          unit: "pcs",
          inStock: 5,
          description: "Seed product 2"
        }
      ]);
      fastify.log.info('Sample products seeded!');
    } else {
      fastify.log.info('Products already exist, skipping seeding.');
    }

    const port = process.env.PORT || 5000;
    await fastify.listen({ port, host: '0.0.0.0' });

    fastify.log.info(`Server listening at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();

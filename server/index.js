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

    // Sync database tables
    if (process.env.NODE_ENV !== 'production') {
      // Only drop and seed in development
      await Product.drop();
      await Terms.drop();
      fastify.log.info('Dropped old Product and Terms tables.');

      await db.sync({ alter: true });

      // Seed Products
      await Product.bulkCreate([
        { articleNo: "A101", productName: "Sample Product 1", inPrice: 50, price: 100, unit: "pcs", inStock: 10, description: "Seed product 1" },
        { articleNo: "A102", productName: "Sample Product 2", inPrice: 60, price: 120, unit: "pcs", inStock: 5, description: "Seed product 2" },
        { articleNo: "A103", productName: "Wireless Mouse", inPrice: 200, price: 299, unit: "pcs", inStock: 50, description: "Ergonomic design" },
        { articleNo: "A104", productName: "Mechanical Keyboard", inPrice: 700, price: 999, unit: "pcs", inStock: 30, description: "RGB lighting" },
        { articleNo: "A105", productName: "Laptop Stand", inPrice: 150, price: 300, unit: "pcs", inStock: 40, description: "Adjustable angle" },
        { articleNo: "A106", productName: "Webcam 1080p", inPrice: 250, price: 400, unit: "pcs", inStock: 20, description: "With mic" },
        { articleNo: "A107", productName: "USB-C Hub", inPrice: 100, price: 199, unit: "pcs", inStock: 60, description: "4-in-1 ports" },
        { articleNo: "A108", productName: "Wireless Charger", inPrice: 180, price: 250, unit: "pcs", inStock: 45, description: "Fast charge" },
        { articleNo: "A109", productName: "Bluetooth Speaker", inPrice: 300, price: 450, unit: "pcs", inStock: 25, description: "Waterproof" },
        { articleNo: "A110", productName: "Smart Plug", inPrice: 120, price: 199, unit: "pcs", inStock: 70, description: "WiFi control" },
        { articleNo: "A111", productName: "LED Desk Lamp", inPrice: 220, price: 350, unit: "pcs", inStock: 35, description: "Touch dimming" },
        { articleNo: "A112", productName: "Noise Cancelling Headphones", inPrice: 800, price: 1200, unit: "pcs", inStock: 15, description: "Over-ear design" },
        { articleNo: "A113", productName: "Smart Watch", inPrice: 900, price: 1500, unit: "pcs", inStock: 12, description: "Heart-rate monitor" },
        { articleNo: "A114", productName: "Fitness Band", inPrice: 400, price: 600, unit: "pcs", inStock: 18, description: "Step tracker" },
        { articleNo: "A115", productName: "Mini Projector", inPrice: 1300, price: 1800, unit: "pcs", inStock: 8, description: "Portable 720p" },
        { articleNo: "A116", productName: "Laptop Cooling Pad", inPrice: 200, price: 350, unit: "pcs", inStock: 30, description: "Dual fan system" },
        { articleNo: "A117", productName: "External Hard Drive 1TB", inPrice: 2200, price: 2999, unit: "pcs", inStock: 14, description: "USB 3.0" },
        { articleNo: "A118", productName: "HDMI Cable 5m", inPrice: 90, price: 150, unit: "pcs", inStock: 80, description: "High-speed" },
        { articleNo: "A119", productName: "Ethernet Cable Cat6", inPrice: 70, price: 120, unit: "pcs", inStock: 100, description: "10Gbps support" }
      ]);

      // Seed Terms
      await Terms.bulkCreate([
        {
          language: 'en',
          content: '<h2>Terms and Conditions</h2><p>These are the terms in English.</p>'
        },
        {
          language: 'sv',
          content: '<h2>Villkor</h2><p>Detta är villkoren på svenska.</p>'
        }
      ]);

      fastify.log.info('Seeded products and terms (development only).');
    } else {
      // Production: sync only
      await db.sync();
      fastify.log.info('DB synced (production mode, no seeding).');
    }

    const port = process.env.PORT || 5000;
    await fastify.listen({ port, host: '0.0.0.0' });

    fastify.log.info(`Server running at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();

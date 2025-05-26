const sequelize = require('./config/db');
const Terms = require('./models/Terms');
const Product = require('./models/Product');

const seedData = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB');

    // Sync tables
    await sequelize.sync({ force: true }); // Drops existing data
    console.log('Tables synced');

    // Seed Terms
    await Terms.bulkCreate([
      {
        language: 'en',
        content: `<h2>Terms of Service (English)</h2><p>This is sample English content for the terms of service page.</p>`
      },
      {
        language: 'sv',
        content: `<h2>Användarvillkor (Swedish)</h2><p>Detta är exempel på svensk text för villkorssidan.</p>`
      }
    ]);
    console.log('Seeded terms');

    // Seed 20 sample products
    const products = [];
    for (let i = 1; i <= 20; i++) {
      products.push({
        articleNo: `ART${1000 + i}`,
        productName: `Product ${i}`,
        inPrice: 100 + i,
        price: 150 + i,
        unit: 'pcs',
        inStock: 50 + i,
        description: `Sample product description ${i}`
      });
    }
    await Product.bulkCreate(products);
    console.log('Seeded products');

    process.exit();
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedData();

const Product = require('../models/Product');

async function productsRoutes(fastify, options) {
  fastify.get('/products', async (request, reply) => {
    try {
      const products = await Product.findAll();
      reply.send(products);
    } catch (error) {
      fastify.log.error('Error fetching products:', error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  fastify.put('/products/:id', async (request, reply) => {
    try {
      const id = request.params.id;
      const updatedData = request.body;

      const [updatedCount] = await Product.update(updatedData, {
        where: { id }
      });

      if (updatedCount === 0) {
        reply.status(404).send({ error: 'Product not found or no changes made' });
      } else {
        reply.send({ message: 'Product updated successfully' });
      }
    } catch (error) {
      fastify.log.error('Error updating product:', error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  // ✅ Temporary route to clean duplicates by articleNo
  fastify.get('/cleanup-duplicates', async (request, reply) => {
    try {
      await Product.sequelize.query(`
        DELETE FROM "Products"
        WHERE "id" NOT IN (
          SELECT MIN("id") FROM "Products" GROUP BY "articleNo"
        );
      `);
      reply.send({ message: 'Duplicate products removed successfully.' });
    } catch (error) {
      fastify.log.error('Error cleaning up duplicates:', error);
      reply.status(500).send({ error: 'Cleanup failed.' });
    }
  });
}

module.exports = productsRoutes;

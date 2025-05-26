const Terms = require('../models/Terms');

async function termsRoutes(fastify, options) {
  fastify.get('/terms', async (request, reply) => {
    const { lang } = request.query;

    if (!lang) {
      return reply.code(400).send({ error: 'Language is required' });
    }

    const term = await Terms.findOne({ where: { language: lang } });

    if (!term) {
      return reply.code(404).send({ error: 'No content found for this language' });
    }

    return { content: term.content };
  });
}

module.exports = termsRoutes;

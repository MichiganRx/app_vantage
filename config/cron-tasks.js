module.exports = {
  myJob: {
    task: async ({ strapi }) => {
      const knex = strapi.db.connection;

      try {
        await knex('ofertas')
          .where('data_despublicacao', '<=', new Date().getTime())
          .andWhere('published_at', '>=', 1)
          .update({ published_at: null });
      } catch (error) {
        strapi.log.error('Erro ao executar o cron job:', error);
      }
    },
    options: {
      rule: '0 * * * *',
    },
  },
};

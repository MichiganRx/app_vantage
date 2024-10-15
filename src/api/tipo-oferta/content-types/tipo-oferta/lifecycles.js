module.exports = {
  async beforeCreate(event) {
    const { prioridade: userPriorityNumber } = event.params.data;
    await reorderItems(null, userPriorityNumber);
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;
    await reorderItems(where.id, data.prioridade);
  },
};

async function reorderItems(itemId, newPriority) {
  const knex = strapi.db.connection;

  if (!knex) {
    strapi.log.error('Conexão com o banco de dados não está definida.');
    return;
  }

  try {
    const itemToMove = itemId ? await knex('tipo_ofertas').where('id', itemId).first() : null;
    const currentPriority = itemToMove ? itemToMove.prioridade : null;

    if (itemId && !itemToMove) {
      strapi.log.error(`Item com ID ${itemId} não encontrado.`);
      return;
    }

    if (!itemId) {
      await knex('tipo_ofertas').where('prioridade', '>=', newPriority).increment('prioridade', 1);
    } else if (newPriority < currentPriority) {
      await knex('tipo_ofertas')
        .where('prioridade', '>=', newPriority)
        .andWhere('prioridade', '<', currentPriority)
        .increment('prioridade', 1);
    } else if (newPriority > currentPriority) {
      await knex('tipo_ofertas')
        .where('prioridade', '>', currentPriority)
        .andWhere('prioridade', '<=', newPriority)
        .decrement('prioridade', 1);
    } else if (itemId) {
      await knex('tipo_ofertas').where('id', itemId).update({ prioridade: newPriority });
    }

    strapi.log.info(`Item ${itemId || 'novo'} reordenado para a prioridade ${newPriority}.`);
  } catch (error) {
    strapi.log.error('Erro ao reordenar itens:', error);
  }
}

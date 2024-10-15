import type { Schema, Attribute } from '@strapi/strapi';

export interface HistoricoHistorico extends Schema.Component {
  collectionName: 'components_historico_historicos';
  info: {
    displayName: 'Hist\u00F3rico';
  };
  attributes: {};
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'historico.historico': HistoricoHistorico;
    }
  }
}

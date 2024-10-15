import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import customEnumeration from "./fields/custom-enumeration";
import customRelation from "./fields/custom-relation";
import CustomTable from "./components/custom-table";
import mutateEditViewHook from "./mutateEditViewLayout";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });

    app.addFields({ type: "custom-table", Component: CustomTable });

    app.customFields.register(customEnumeration);
    app.customFields.register(customRelation);
  },

  bootstrap(app) {
    app.registerHook(
      "Admin/CM/pages/EditView/mutate-edit-view-layout",
      mutateEditViewHook
    )
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};

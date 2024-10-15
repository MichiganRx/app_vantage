const mutateLayout = (layout) => layout.map((row) => {
  const mutateRow = row.reduce((acc, field) => {
    const hasMapFieldEnabled = field.fieldSchema.pluginOptions?.['custom-table']?.enabled;

    console.log("Field:", field, "Has custom table enabled:", hasMapFieldEnabled);

    if (!hasMapFieldEnabled) {
      return [...acc, field];
    }

    return [...acc, { ...field, fieldSchema: { ...field.fieldSchema } }];
  }, []);

  return mutateRow;
});

const mutateEditViewHook = ({ layout, query }) => {
  console.log("Original Layout:", layout);

  const mutateEditLayout = mutateLayout(layout.contentType.layouts.edit);

  console.log("Mutated Edit Layout:", mutateEditLayout);

  const enhancedLayouts = {
    ...layout.contentType.layouts,
    edit: mutateEditLayout,
  };

  console.log("Enhanced Layouts:", enhancedLayouts);

  return {
    query,
    layout: {
      ...layout,
      contentType: {
        ...layout.contentType,
        layouts: enhancedLayouts,
      },
    },
  };
};

export default mutateEditViewHook;

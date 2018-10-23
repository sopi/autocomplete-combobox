({
  enrichEvent: function(cmp, ev) {
    const label = cmp.get('v.label');
    const value = cmp.get('v.value');
    const originalLabel = cmp.get('v.originalLabel');

    ev.comboboxData = {
      label,
      value,
      originalLabel
    };
  }
})

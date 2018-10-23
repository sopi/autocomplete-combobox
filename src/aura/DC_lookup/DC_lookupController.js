({
  doInit: function (cmp, ev, helper) {
    helper.initFoundItems(cmp);
  },
  initSearch: function (cmp, ev, helper) {
    helper.initSearch(cmp);

    ev.stopPropagation();
  },
  clearSearch: function (cmp, ev, helper) {
    helper.initSearch(cmp);
    cmp.set('v.value', '');
    cmp.set('v.displayedValue', '');
    cmp.set('v.displayedValueBeforeChange', '');
    helper.initFoundItems(cmp);

    ev.stopPropagation();
  },
  enrichEvent: function (cmp, ev) {
    ev.customData = {
      autocomplete: true,
      id: cmp.getGlobalId()
    };
  },
  handleSelection: function (cmp, ev, helper) {
    ev.stopPropagation();
    const {comboboxData: {originalLabel, value}} = ev;
    cmp.set('v.value', value);
    cmp.set('v.displayedValue', originalLabel);
    cmp.set('v.displayedValueBeforeChange', originalLabel);
    cmp.set('v.isOpen', false);

    const message = JSON.stringify({
      id: cmp.get('v.id'),
      originalLabel,
      value
    });
    helper.sendMessage("lookupSelected", message);
  },
  handleMessageEvent: function (cmp, ev) {
    if (!cmp.get('v.isOpen')) {
      return;
    }

    const {channel, message} = ev.getParams();
    const carriedEvent = JSON.parse(message);
    if (channel === 'globalClickBroadcast' && (
      typeof carriedEvent.customData.autocomplete === 'undefined' ||
      carriedEvent.customData.id !== cmp.getGlobalId())) {
      cmp.set('v.isOpen', false);
      cmp.set('v.displayedValue', cmp.get('v.displayedValueBeforeChange'));
      ;
    }
  },
  search: function (cmp, ev, helper) {
    helper.search(cmp, ev)();
  },
  onInputChange: function (cmp, ev, helper) {
    console.log(ev);
  }
})

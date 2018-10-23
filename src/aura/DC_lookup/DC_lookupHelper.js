/**
 * Created by piotrsobczak on 19.09.2018.
 */

({
  search: function(cmp, ev) {
    const searchItems = () => {
      const target = ev.currentTarget || ev.target;
      const {value: searchedText} = target;
      const items = cmp.get('v.items');
      const foundItems = [];
      items
        .forEach(item =>  {
          const { label, value } = item;
          const searchedTextLength = searchedText.length;

          const reg = new RegExp(searchedText , "gi");
          let foundIntermediate = {};
          const foundIndexes = [];

          if(searchedTextLength > 0) {
            while ((foundIntermediate = reg.exec(label)) !== null) {
              foundIndexes.push(foundIntermediate.index);
            }
          }

          if(searchedTextLength > 0 && foundIndexes.length > 0) {
            const foundItem = foundIndexes.reduce((resultItem, foundIndex) => {
              resultItem +=
                `${label.substr(0, foundIndex)}<mark>${label.substr(foundIndex, searchedTextLength)}</mark>${label.substr(foundIndex + searchedTextLength)}`;
              return resultItem;

            }, '');

            foundItems.push({label: foundItem, value, originalLabel: label});
          } else if (searchedTextLength === 0) {
            foundItems.push({label, value, originalLabel: label});
          }
        });
      cmp.set('v.foundItems', foundItems);
    };
    return _.debounce(searchItems, 250);
  },
  initSearch: function(cmp) {
    cmp.set('v.isOpen', true);
    cmp.find('searchInput').getElement().focus();
  },
  initFoundItems: function(cmp) {
    const copiedItems = this.copyObject(cmp.get('v.items'));
    cmp.set('v.foundItems', copiedItems && copiedItems.map(item => ({label: item.label, originalLabel: item.label, value: item.value})) || []);
  }
})

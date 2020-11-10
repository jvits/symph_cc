const items = [
  { id: 2, seqId: 4, parent: 5, name: "index.tsx" },
  { id: 3, seqId: 3, parent: 1, name: "Sidebar" },
  { id: 4, seqId: 5, parent: 1, name: "Table" },
  { id: 7, seqId: 5, parent: 5, name: "SelectableDropdown.tsx" },
  { id: 5, seqId: 2, parent: 1, name: "AssignmentTable" },
  { id: 1, seqId: 1, parent: null, name: "components" },
  { id: 6, seqId: 2, parent: null, name: "controllers" },
];

function getDepth(item, items) {
  let depth_last = item;
  let depth_counter = 0;
  while (depth_last) {
    for (_item of items) {
      if (depth_last.parent == _item.id) {
        depth_counter += 1;
        if (_item.parent) {
          depth_last = _item;
        } else {
          depth_last = null;
        }
        break;
      }
    }
  }
  item["depth"] = depth_counter;
}

function sort(_items) {
  // console.log(_items);
  // _items.sort(function (a, b) {
  //   return a.seqId - b.seqId;
  // });
  return _item;
}

function handleArrangement(_items) {
  let items = [];
  let collections = [];
  let tem = [];

  /**Migrate items to new items obj */
  for (_item of _items) {
    let obj = {};
    obj.id = _item.id;
    obj.seqId = _item.seqId;
    obj.parent = _item.parent;
    obj.depth = _item.depth;
    obj.name = _item.name;
    items.push(obj);
  }

  /**Getting root directory */
  for (item of items) {
    if (!item.parent) {
      collections.push(item);
    }
  }

  /**Sorting root directory */
  collections = collections.sort(function (a, b) {
    return a.seqId - b.seqId;
  });

  /**Sorting child directory */
  items = items.sort(function (a, b) {
    return a.seqId - b.seqId;
  });
  items = items.reverse();

  for (item of items) {
    if (item.parent) {
      let id = collections.findIndex((x) => x.id == item.parent);

      if (id != -1) {
        collections.splice(id + 1, 0, item);
      } else {
        tem.push(item);
      }
    }
  }

  tem = tem.sort(function (a, b) {
    return a.seqId - b.seqId;
  });
  tem = tem.reverse();

  for (te of tem) {
    if (te.parent) {
      let id = collections.findIndex((x) => x.id == te.parent);
      collections.splice(id + 1, 0, te);
    }
    tem = [];
  }

  return collections;
}

function transformItems(items) {
  for (item of items) {
    if (item.parent) {
      /**Handle depth */
      getDepth(item, items);
    } else {
      item["depth"] = 0;
    }
  }
  items = handleArrangement(items);
  return items;
}

const finalItems = transformItems(items);
console.log(finalItems);

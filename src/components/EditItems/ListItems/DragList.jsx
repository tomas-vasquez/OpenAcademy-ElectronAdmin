import React from "react";
import ReactDragListView from "react-drag-listview";
import { useFirestore } from "reactfire";

export default function DragList({ children, setItems, items }) {
  const fireStore = useFirestore();

  const reordenedFieldItemSord = (fromIndex, toIndex) => {
    console.log(">> ", fromIndex, toIndex);

    let itemsSorted = items.sort((a, b) => a.item_sort - b.item_sort);
    let itemsModified = [];
    let targetItem = itemsSorted[fromIndex];

    if (fromIndex < toIndex) {
      let array1 = itemsSorted.slice(0, toIndex + 1).filter((item) => {
        return item._id !== targetItem._id;
      });
      let array2 = itemsSorted.slice(toIndex + 1);
      itemsModified = [...array1, targetItem, ...array2];
    } else {
      let array1 = itemsSorted.slice(0, toIndex);
      let array2 = itemsSorted.slice(toIndex).filter((item) => {
        return item._id !== targetItem._id;
      });

      console.log("itemsSorted", [...itemsSorted]);
      console.log("a1 ", [...array1]);
      console.log("targetItem", targetItem);
      console.log("a2 ", [...array2]);

      itemsModified = [...array1, targetItem, ...array2];
    }

    itemsModified = itemsModified.map((item, index) => {
      let newItem = { ...item };
      console.log(newItem.item_sort);
      newItem.item_sort = `${newItem.item_sort + index}`;
      console.log(newItem.item_sort);
      console.log("........");
      return newItem;
    });

    var _items = [];

    // console.log(items);

    _items = itemsSorted.map((item) => {
      const i = itemsModified.find((_item) => _item.id === item.id);
      // console.log(item);
      // console.log(i);
      // console.log("...................");

      if (i) return i;
      else return item;
    });

    // console.log(_items);

    setItems(_items.sort((a, b) => a.item_sort - b.item_sort));

    // itemsModified.forEach((item, key) => {
    //   // let newItem = { ...item };
    //   // newItem.item_sort = `${key + 1}`;
    //   console.log(item);
    //   // handleItemChanged(newItem, false);
    // });
  };

  return (
    <ReactDragListView
      onDragEnd={(fromIndex, toIndex) => {
        reordenedFieldItemSord(fromIndex, toIndex);
      }}
      nodeSelector="section"
      handleSelector="span"
    >
      {children}
    </ReactDragListView>
  );
}

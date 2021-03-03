import React from "react";
import ReactDragListView from "react-drag-listview";

export default function DragList({ children, items, setItems }) {
  const reordenedFieldItemSord = (fromIndex, toIndex) => {
    let itemsSorted = [...items].sort((a, b) => a.item_sort - b.item_sort);
    let newItems = null;
    let targetItem = itemsSorted[fromIndex];

    if (fromIndex < toIndex) {
      let array1 = itemsSorted.slice(0, toIndex + 1).filter((item) => {
        return item.id !== targetItem.id;
      });
      let array2 = itemsSorted.slice(toIndex + 1);
      newItems = [...array1, targetItem, ...array2];
    } else {
      let array1 = itemsSorted.slice(0, toIndex);
      let array2 = itemsSorted.slice(toIndex).filter((item) => {
        return item.id !== targetItem.id;
      });
      newItems = [...array1, targetItem, ...array2];
    }

    newItems = newItems.map((item, key) => {
      let newItem = { ...item };
      newItem.item_sort = `${key + 1}`;
      return newItem;
    });

    setItems(newItems);
  };

  return (
    <ReactDragListView
      onDragEnd={reordenedFieldItemSord}
      nodeSelector="section"
      handleSelector="span"
    >
      {children}
    </ReactDragListView>
  );
}

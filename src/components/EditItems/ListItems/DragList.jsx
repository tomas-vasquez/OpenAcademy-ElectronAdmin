import React from "react";
import ReactDragListView from "react-drag-listview";

const reordenedFieldItemSord = (
  fromIndex,
  toIndex,
  items,
  handleItemChanged
) => {
  let data = items.sort((a, b) => a.item_sort - b.item_sort);
  let newItems = null;
  let targetItem = data[fromIndex];

  if (fromIndex < toIndex) {
    let array1 = data.slice(0, toIndex + 1).filter((item) => {
      return item._id !== targetItem._id;
    });
    let array2 = data.slice(toIndex + 1);
    newItems = [...array1, targetItem, ...array2];
  } else {
    let array1 = data.slice(0, toIndex);
    let array2 = data.slice(toIndex).filter((item) => {
      return item._id !== targetItem._id;
    });
    newItems = [...array1, targetItem, ...array2];
  }

  newItems.forEach((item, key) => {
    let newItem = { ...item };
    newItem.item_sort = `${key + 1}`;
    handleItemChanged(newItem, false);
  });
};

export default function DragList({ children, handleItemChanged, items }) {
  return (
    <ReactDragListView
      onDragEnd={(fromIndex, toIndex) => {
        reordenedFieldItemSord(fromIndex, toIndex, items, handleItemChanged);
      }}
      nodeSelector="section"
      handleSelector="span"
    >
      {children}
    </ReactDragListView>
  );
}

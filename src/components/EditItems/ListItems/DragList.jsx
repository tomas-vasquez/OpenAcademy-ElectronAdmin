import React from "react";
import ReactDragListView from "react-drag-listview";

const reordenedFieldItemSord = (fromIndex, toIndex, items, setItems) => {
  let itemsSorted = items.sort((a, b) => a.item_sort - b.item_sort);
  let itemsChanged = [];

  console.log("fromIndex:", fromIndex, "toIndex:", toIndex);

  if (fromIndex > toIndex) {
    let newItem = itemsSorted[fromIndex];
    newItem.item_sort = itemsSorted[toIndex].item_sort + "1";
    itemsChanged.push(newItem);
  } else {
    // newItem;
  }

  // let targetItem = data[fromIndex];

  // //change item_sort
  // if (fromIndex < toIndex) {
  //   let array1 = data.slice(0, toIndex + 1).filter((item) => {
  //     return item._id !== targetItem._id;
  //   });
  //   let array2 = data.slice(toIndex + 1);
  //   stagedItems = [...array1, targetItem, ...array2];
  // } else {
  //   let array1 = data.slice(0, toIndex);
  //   let array2 = data.slice(toIndex).filter((item) => {
  //     return item._id !== targetItem._id;
  //   });
  //   stagedItems = [...array1, targetItem, ...array2];
  // }

  // stagedItems.forEach((item, index) => {
  //   let newItem = { ...item };
  //   newItem.item_sort = `${index}`;
  //   itemsChanged.push(newItem);
  // });

  //merge
  let newItems = [];

  newItems = items.map((item) => {
    const alreadyIndex = itemsChanged.findIndex(
      (_item) => _item.id === item.id
    );

    if (alreadyIndex !== -1) return itemsChanged[alreadyIndex];
    else return item;
  });

  // console.log("itemsChanged", itemsChanged);

  // console.log(
  //   "newItems",
  //   newItems.sort((a, b) => a.item_sort - b.item_sort)
  // );
  setItems(newItems);
};

export default function DragList({ children, items, setItems }) {
  return (
    <ReactDragListView
      onDragEnd={(fromIndex, toIndex) => {
        reordenedFieldItemSord(fromIndex, toIndex, items, setItems);
      }}
      nodeSelector="section"
      handleSelector="span"
    >
      {children}
    </ReactDragListView>
  );
}

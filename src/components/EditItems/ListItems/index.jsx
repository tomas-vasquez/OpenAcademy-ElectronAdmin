import React, { useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import { Card, CardBody, Button } from "reactstrap";

import AddItem from "./AddItem";
import DragList from "./DragList";
import SingleItem from "./SingleItem";
import SmallLoading from "components/common/auth/SmallLoading";
import Alerts from "helpers/Alerts";

export default function ListItems({
  setTargetItem,
  item: currentItem,
  course,
}) {
  const [items, setItems] = useState(null);
  const [itemsInDb, setItemsInDb] = useState(null);
  const [isLoadItems, setIsLoadItems] = useState(false);
  const fireStore = useFirestore();

  useEffect(() => {
    //load items
    fireStore
      .collection("course_items")
      .where("item_course_id", "==", course.id)
      .onSnapshot((snapshot) => {
        let items = [];
        snapshot.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
        setItems(items);
        setItemsInDb(items);
        setIsLoadItems(true);
      });
  }, []);

  const saveChanges = () => {
    var batch = fireStore.batch();

    itemsInDb.forEach((_item) => {
      let item = items.find((item) => item.id === _item.id);
      if (_item.item_sort !== item.item_sort) {
        let ref = fireStore.collection("course_items").doc(_item.id);
        batch.update(ref, { item_sort: item.item_sort });
      }
    });

    batch.commit().then(() => {
      Alerts.showSuccess();
    });
    Alerts.showLoading();
  };

  return (
    <>
      <Card>
        <CardBody>
          {isLoadItems ? (
            <DragList items={items} setItems={setItems}>
              {items
                .sort((a, b) => a.item_sort - b.item_sort)
                .map((item) => (
                  <SingleItem
                    key={item.id}
                    item={item}
                    setTargetItem={setTargetItem}
                    currentItem={currentItem}
                  />
                ))}
            </DragList>
          ) : (
            <SmallLoading text="Loading items..." />
          )}

          <div className="d-flex">
            <Button
              color="success"
              className="mt-3 ml-auto"
              onClick={saveChanges}
            >
              <i className="fa fa-save mr-2" />
              Save sort
            </Button>
          </div>
        </CardBody>
      </Card>

      <AddItem course={course} items={items} />
    </>
  );
}

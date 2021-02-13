import React, { useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import { Card, CardBody, Button } from "reactstrap";

import AddItem from "./AddItem";
import DragList from "./DragList";
import SingleItem from "./SingleItem";
import SmallLoading from "components/auth/SmallLoading";

export default function ListItems({
  setTargetItem,
  item: currentItem,
  course,
}) {
  const [items, setItems] = useState(null);
  const [isLoadItems, setIsLoadItems] = useState(false);
  const fireStore = useFirestore();

  useEffect(() => {
    //load items
    fireStore.collection("course_items").onSnapshot((snapshot) => {
      let items = [];
      snapshot.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
      setItems(items.filter((item) => item.item_course_id === course.id));
      setIsLoadItems(true);
    });
  }, []);

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
            <Button color="success" type="submit" className="mt-3 ml-auto">
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

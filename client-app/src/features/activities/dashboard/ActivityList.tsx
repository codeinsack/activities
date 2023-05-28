import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Segment, Item, Button, Label } from "semantic-ui-react";

import { useStore } from "../../../app/stores/store";

const ActivityList = () => {
  const { activityStore } = useStore();
  const [target, setTarget] = useState("");

  const handleActivityDelete = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(event.currentTarget.name);
    activityStore.deleteActivity(id);
  };

  return (
    <Segment>
      <Item.Group divided>
        {activityStore.activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/activities/${activity.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={activity.id}
                  floated="right"
                  content="Delete"
                  color="red"
                  loading={activityStore.loading && target === activity.id}
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);

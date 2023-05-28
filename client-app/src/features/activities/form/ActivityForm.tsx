import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

import { useStore } from "../../../app/stores/store";

const ActivityForm = () => {
  const { activityStore } = useStore();

  const initialState = activityStore.selectedActivity ?? {
    id: "",
    date: "",
    description: "",
    title: "",
    category: "",
    venue: "",
    city: "",
  };

  const [activity, setActivity] = useState(initialState);

  const handleSubmit = () => {
    activity.id
      ? activityStore.updateActivity(activity)
      : activityStore.createActivity(activity);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setActivity({
      ...activity,
      [name]: value,
    });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          value={activity.description}
          name="description"
          placeholder="Description"
          onChange={handleInputChange}
        />
        <Form.Input
          value={activity.category}
          name="category"
          placeholder="Category"
          onChange={handleInputChange}
        />
        <Form.Input
          value={activity.date}
          name="date"
          type="date"
          placeholder="Date"
          onChange={handleInputChange}
        />
        <Form.Input
          value={activity.city}
          name="city"
          placeholder="City"
          onChange={handleInputChange}
        />
        <Form.Input
          value={activity.venue}
          name="venue"
          placeholder="Venue"
          onChange={handleInputChange}
        />
        <Button
          loading={activityStore.loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={activityStore.closeForm}
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);

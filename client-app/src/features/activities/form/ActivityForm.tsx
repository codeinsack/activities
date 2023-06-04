import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

import { useStore } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik } from "formik";

const ActivityForm = () => {
  const { activityStore } = useStore();
  const {
    loadActivity,
    updateActivity,
    createActivity,
    loading,
    loadingInitial,
  } = activityStore;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activity, setActivity] = useState({
    id: "",
    date: "",
    description: "",
    title: "",
    category: "",
    venue: "",
    city: "",
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, loadActivity]);

  // const handleSubmit = async () => {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     };
  //     await createActivity(newActivity);
  //   } else {
  //     await updateActivity(activity);
  //   }
  //   navigate(`/activities/${activity.id}`);
  // };
  //
  // const handleInputChange = (
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = event.target;
  //
  //   setActivity({
  //     ...activity,
  //     [name]: value,
  //   });
  // };

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => console.log(values)}
      >
        {({ values: activity, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Input
              placeholder="Title"
              value={activity.title}
              name="title"
              onChange={handleChange}
            />
            <Form.TextArea
              value={activity.description}
              name="description"
              placeholder="Description"
              onChange={handleChange}
            />
            <Form.Input
              value={activity.category}
              name="category"
              placeholder="Category"
              onChange={handleChange}
            />
            <Form.Input
              value={activity.date}
              name="date"
              type="date"
              placeholder="Date"
              onChange={handleChange}
            />
            <Form.Input
              value={activity.city}
              name="city"
              placeholder="City"
              onChange={handleChange}
            />
            <Form.Input
              value={activity.venue}
              name="venue"
              placeholder="Venue"
              onChange={handleChange}
            />
            <Button
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);

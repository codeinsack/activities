import { Formik, Form, Field, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, FormField, Label, Segment } from "semantic-ui-react";
import * as Yup from "yup";

import { useStore } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

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

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
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
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <FormField>
              <Field placeholder="Title" name="title" />
              <ErrorMessage
                name="title"
                render={(error) => <Label basic color="red" content={error} />}
              />
            </FormField>
            <Field name="description" placeholder="Description" />
            <Field name="category" placeholder="Category" />
            <Field name="date" placeholder="Date" />
            <Field name="city" placeholder="City" />
            <Field name="venue" placeholder="Venue" />
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

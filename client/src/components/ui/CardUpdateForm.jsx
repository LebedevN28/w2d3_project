import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function CardUpdateForm({ updateHandler, card }) {
  return (
    <>
      <Form onSubmit={(post) => updateHandler(post, card.id)}>
        <Form.Control
          name="title"
          defaultValue={card?.title}
          type="text"
          placeholder="Title"
        />
        <Form.Control
          name="desc"
          defaultValue={card?.description}
          type="text"
          placeholder="Desc"
        />
        <Form.Control
          name="url"
          defaultValue={card?.url}
          type="text"
          placeholder="URL"
        />
        <Button type="submit" variant="light">
          <Icon.Save />
        </Button>
      </Form>
    </>
  );
}

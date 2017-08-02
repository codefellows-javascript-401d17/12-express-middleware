# Express REST API with Middleware

This project contains a basic REST API built on express.js featuring file-system persistance, cors, and testing. You can access the API by making an HTTP request to one of the endpoints listed below.

## Resources
The following resources are available for storage and retrieval:

Note: ids are automatically generated.

```js
Book {
  id: '6c5036a6-913d-4475-91b0-084e4115e61b'
  title: 'Hamlet'
  author: 'William Shakespeare'
  date: 1599
  genre: 'Drama'
}
```

## Book Endpoints

### GET `/api/book`
Gets an array of Book ids.

### GET `/api/book/:id`
Gets a JSON representation of a Book with the specified id.

### PUT `/api/book/:id`
Updates a Book with the specified id. The body of the request should be a serialized JSON object containing the updated property values.

### POST `/api/book`
Creates a Book object. The body of the request should be a serialized JSON object containing the Book's property values.

### DELETE `/api/book/:id`
Deletes a Book object with the specified id.
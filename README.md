# Vanilla API Persistence - 09 Lab

## Description:
This app builds out an API where data is stored in the file system. This API stores beer data with the schema of name, style, and IBU.

## API:
The URL endpoint to access the api is `/api/beer`.  Using REST architecture the data is read, written and deleted using `GET`, `POST` and `DELETE` requests.

### POST:

```
request.post('localhost:8000/api/beer')
.send({ name: 'Have a Nice Day IPA', style: 'IPA', IBU: '43' })
```

This is a representation of the POST method. You can see that we first make a request to post to
```
localhost:8000
```
with a route of
```
/api/beer
```
Once the connection has bee made we send our beer in
```
.send({ name: 'Have a Nice Day IPA', style: 'IPA', IBU: '43' })
```
format. This will respond with 200 if the request was made or 400 if not.

### GET
#### With ID
```
request.get(`localhost:8000/api/beer?id=${beer.id}`)
```
This is a representation of the GET method. You can see that we first make a request to post to

```
localhost:8000
```
with a route of

```
/api/beer
```

finally with finish the request with reference to a specific id which was generated with uuid

```
?id=${beer.id}
```

This will respond with 200 if the request was made, 404 if not found or 400 if the request was made in wrong format.

#### Without ID

```
request.get(`localhost:8000/api/beer`)
```
This is a representation of the GET method without an ID. This will respond with all the available IDs. You can see that we first make a request to post to

```
localhost:8000
```
with a route of

```
/api/beer
```

This will respond with 200 if the request was made, 404 if not found or 400 if the request was made in wrong format.

### DELETE

```
request.delete(`localhost:8000/api/beer?id=${beer.id}`)
```

This is a representation of the POST method. You can see that we first make a request to post to

```
localhost:8000
```
with a route of

```
/api/beer
```
finally with finish the request with reference to a specific id which was generated with uuid
```
?id=${beer.id}
```

This will respond with 200 if the request was made, 404 if not found or 400 if the request was made in wrong format.

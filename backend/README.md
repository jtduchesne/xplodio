## API documentation
All of the resources are RESTful and follow this pattern:

| Endpoint    | Method      | Description                                    |
| :---------- | ----------- | ---------------------------------------------- |
| `/songs`    | `GET`       | List all the songs.                            |
| `/song/:id` | `GET`       | Show informations about the specified song.    |
| `/songs`    | `POST`      | Create a new song.                             |
| `/song/:id` | `PUT/PATCH` | Update the informations of the specified song. |
| `/song/:id` | `DELETE`    | Destroy the specified song.                    |

Deleting a resource also deletes the associated resources. For example, deleting a song will also delete its associated artwork and tracks from the database, and also the files from the server.

If an incorrect method is used on an endpoint, it will respond with a `405 - Method Not Allowed` status and generate an appropriate `Allow` header field as stated in [RFC 7231, section 6.5.5](https://tools.ietf.org/html/rfc7231#section-6.5.5).

#### Response
A JSON object in the following format:
```js
{
  "status": 200, // HTTP status code
  "data": ...,   // Response body
  "errors": ..., // (Only if status >= 400)
}
```

## Resources
#### User

| Endpoint    | Allowed Methods        |
| :---------- | ---------------------- |
| `/users`    | `GET/POST`             |
| `/user/:id` | `GET/PUT/PATCH/DELETE` |

```js
{
  "_id": "60bfd4d53c52cf807f88546f",
  "name": "Bob",
  "photoUrl": "http://fake.path.com/photo.jpg",
  "createdAt": "2021-06-08T20:36:37.323Z",
  "updatedAt": "2021-06-08T20:41:00.145Z"
}
```

#### Artist

| Endpoint      | Allowed Methods        |
| :------------ | ---------------------- |
| `/artists`    | `GET/POST`             |
| `/artist/:id` | `GET/PUT/PATCH/DELETE` |

```js
{
  "_id": "60c02ed29b8dc283e727b2e7",
  "name": "Artist name",
  "slug": "artist-name",
  "user": "60bfd4d53c52cf807f88546f",
  "createdAt": "2021-06-09T03:00:34.721Z",
  "updatedAt": "2021-06-09T03:00:34.721Z"
}
```

#### Song

| Endpoint    | Allowed Methods        |
| :---------- | ---------------------- |
| `/songs`    | `GET/POST`             |
| `/song/:id` | `GET/PUT/PATCH/DELETE` |

Song's endpoint can also be chained to an Artist. For example, `GET /artist/test/songs` will only list songs from the artist _Test_, and `POST /artist/test/songs` will automatically set created song's artist to _Test_:

| Endpoint            | Allowed Methods        |
| :------------------ | ---------------------- |
| `/artist/:id/songs` | `GET/POST`             |

```js
{
  "_id": "60d34867d3b1139dc079de38",
  "name": "Song name",
  "slug": "song-name",
  "length": 123,
  "artist": {
    "name": "Artist name",
    "slug": "artist-name"
  },
  "artwork": {
    "url": "/files/artwork-1624458594574.jpg"
  },
  "tracks": [
    {
      "name": "01 Track1",
      "url": "/files/01_Track1-1624607631766.mp3"
    },
    {
      "name": "02 Track2",
      "url": "/files/02_Track2-1624607631772.mp3"
    }
  ],
  "createdAt": "2021-06-23T14:42:47.159Z",
  "updatedAt": "2021-06-25T07:53:52.179Z"
}
```

#### Track

| Endpoint     | Allowed Methods        |
| :----------- | ---------------------- |
| `/tracks`    | `GET/POST`             |
| `/track/:id` | `GET/PUT/PATCH/DELETE` |

Track's endpoint can also be chained to a Song. For example, `GET /song/test/tracks` will only list tracks of the song _Test_, and `POST /song/test/tracks` will automatically bind created track to the song _Test_:

| Endpoint           | Allowed Methods        |
| :----------------- | ---------------------- |
| `/song/:id/tracks` | `GET/POST`             |

```js
{
  "name": "01 Track1",
  "url": "/files/01_Track1-1624607631766.mp3"
}
```

#### Image

| Endpoint     | Allowed Methods        |
| :----------- | ---------------------- |
| `/images`    | `GET/POST`             |
| `/image/:id` | `GET/PUT/PATCH/DELETE` |

```js
{
  "url": "/files/artwork-1624458594574.jpg"
}
```

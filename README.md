# OpenToIntern

## Technetium - Open to Intern Project Requirement

### Models

#### College Model
- name: { mandatory, unique, example: iith }
- fullName: { mandatory, example: "Indian Institute of Technology, Hyderabad" }
- logoLink: { mandatory }
- isDeleted: { boolean, default: false }

#### Intern Model
- name: { mandatory }
- email: { mandatory, valid email, unique }
- mobile: { mandatory, valid mobile number, unique }
- collegeId: { ObjectId, ref to college model }
- isDeleted: { boolean, default: false }

## API Endpoints

### POST /functionup/colleges
Create a college - a document for each member of the group.

The logo link will be provided to you by the mentors. This link is an S3 (Amazon's Simple Service) URL. Please ensure that the link is public and accessible.

Endpoint: BASE_URL/functionup/colleges

### POST /functionup/interns
Create a document for an intern.

Also save the collegeId along with the document. The request body should contain the following fields: name, mobile, email, collegeName.

Return HTTP status 201 on successful document creation. Also, return the document in the response. The response should be a JSON object.

Return HTTP status 400 for an invalid request with a response body containing the error message.

### GET /functionup/collegeDetails
Returns the college details for the requested college. Expect a query parameter named collegeName, which is the abbreviated college name (e.g., iith).

Returns the list of all interns who have applied for an internship at this college.

The response structure should be as follows:

```json
{
  "status": true,
  "data": {
    "name": "xyz",
    "fullName": "Some Institute of Engineering and Technology",
    "logoLink": "some public s3 link for a college logo",
    "interns": [
      {
        "_id": "123a47301a53ecaeea02be59",
        "name": "Jane Doe",
        "email": "jane.doe@miet.ac.in",
        "mobile": "8888888888"
      },
      {
        "_id": "45692c0e1a53ecaeea02b1ac",
        "name": "John Doe",
        "email": "john.doe@miet.ac.in",
        "mobile": "9999999999"
      },
      {
        "_id": "7898d0251a53ecaeea02a623",
        "name": "Sukruti",
        "email": "dummy.email@miet.ac.in",
        "mobile": "9191919191"
      },
      {
        "_id": "999803da1a53ecaeea02a07e",
        "name": "Neeraj Kumar",
        "email": "another.example@miet.ac.in",
        "mobile": "9898989898"
      }
    ]
  }
}
```

## Testing

To test these APIs, create a new collection in Postman named "Project 2 Internship". Each API should have a new request in this collection, and each request in the collection should be appropriately named (e.g., "Create college", "Get college details", etc.). Make sure that the tests for each request are in a running state. Refer to the sample below:

### Postman Collection and Request Sample

#### Response

Successful response structure:

```json
{
  "status": true,
  "data": {}
}
```

Error response structure:

```json
{
  "status": false,
  "message": ""
}
```



#### Collection Samples

##### College

```json
{
  "status": true,
  "data": {
    "name": "iith",
    "fullName": "Indian Institute of Technology, Hyderabad",
    "logoLink": "https://functionup.s3.ap-south-1.amazonaws.com/colleges/iith.png",
    "isDeleted": false
  }
}
```

##### Intern

```json
{
  "status": true,
  "data": {
    "isDeleted": false,
    "name": "Jane Does",
    "email": "jane.doe@iith.in",
    "mobile": "90000900000",
    "collegeId": "ObjectId('888771129c9ea621dc7f5e3b')"
  }
}
```

#### Response Samples

College details:

```json
{
  "status": true,
  "data": {
    "name": "xyz",
    "fullName": "Some Institute of Engineering and Technology",
    "logoLink": "some public s3 link for a college logo",
    "interns": [
      {
        "_id": "123a47301a53ecaeea02be59",
        "name": "Jane Doe",
        "email": "jane.doe@miet.ac.in",
        "mobile": "8888888888"
      },
      {
        "_id": "45692c0e1a53ecaeea02b1ac",
        "name": "John Doe",
        "email": "john.doe@miet.ac.in",
        "mobile": "9999999999"
      },
      {
        "_id": "7898d0251a53ecaeea02a623",
        "name": "Sukruti",
        "email": "dummy.email@miet.ac.in",
        "mobile": "9191919191"
      },
      {
        "_id": "999803da1a53ecaeea02a07e",
        "name": "Neeraj Kumar",
        "email": "another.example@miet.ac.in",
        "mobile": "9898989898"
      }
    ]
  }
}
```


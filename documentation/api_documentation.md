# API Documentation

## Description
This API is designed to manage profiles. It allows you to create, read, update, and delete profiles. The application runs on port `5502`.

## Base URL
```
http://localhost:5502/api/v1
```

## Endpoints

### Create a New Profile
**URL:** `/profile`

**Method:** `POST`

**Description:** Creates a new profile.

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <your-access-token>`
- `x-platform: fuse`

**Request Body:**
```json
{
  "name": "Hazem Safwat",
  "email": "hazem@example.com",
  "mobile": "1234567890",
  "gender": "male",
  "dob": "1990-01-01",
  "metadata": {
    "key1": "value1",
    "key2": "value2"
  },
  "additionalFields": {
    "field1": "value1",
    "field2": "value2"
  }
}
```

**Response:**
- `201 Created`: Profile created successfully.
- `400 Bad Request`: Invalid input.

### Get All Profiles
**URL:** `/profile`

**Method:** `GET`

**Description:** Retrieves a list of all profiles.

**Headers:**
- `Accept: application/json`
- `Authorization: Bearer <your-access-token>`
- `x-platform: fuse`

**Query Parameters:**
- `showHidden` (optional): `true` or `false` (default is `false`)

**Response:**
- `200 OK`: List of profiles.

### Get a Profile by ID
**URL:** `/profile/:id`

**Method:** `GET`

**Description:** Retrieves a profile by its ID.

**Headers:**
- `Accept: application/json`
- `Authorization: Bearer <your-access-token>`
- `x-platform: fuse`

**Query Parameters:**
- `showHidden` (optional): `true` or `false` (default is `false`)

**Response:**
- `200 OK`: Profile details.
- `404 Not Found`: Profile not found.

### Update a Profile by ID
**URL:** `/profile/:id`

**Method:** `PUT`

**Description:** Updates a profile by its ID.

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <your-access-token>`
- `x-platform: fuse`

**Request Body:**
```json
{
  "name": "Mohamed ali"
}
```

**Response:**
- `200 OK`: Profile updated successfully.
- `404 Not Found`: Profile not found.

### Soft Delete a Profile by ID
**URL:** `/profile/:id`

**Method:** `DELETE`

**Description:** Soft deletes a profile by its ID.

**Headers:**
- `Authorization: Bearer <your-access-token>`
- `x-platform: fuse`

**Response:**
- `200 OK`: Profile soft deleted successfully.
- `404 Not Found`: Profile not found.

### Permanently Delete a Profile by ID
**URL:** `/profile/:id`

**Method:** `DELETE`

**Description:** Permanently deletes a profile by its ID.

**Headers:**
- `Authorization: Bearer <your-access-token>`
- `x-platform: fuse`

**Response:**
- `200 OK`: Profile permanently deleted successfully.
- `404 Not Found`: Profile not found.

## Models

### ProfileDto
```typescript
export class ProfileDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  mobile: string;

  @IsOptional()
  @IsString()
  gender: 'male' | 'female';

  @IsOptional()
  @IsISO8601()
  dob: string;

  @IsOptional()
  @IsObject()
  metadata: Map<string, any>;

  @IsOptional()
  @IsObject()
  additionalFields: { [key: string]: any };
}
```

### Profile
```typescript
export class Profile {
  additionalFields: { [key: string]: any };

  @Prop({ type: [{ date: Date, message: String, by: String }] })
  log: ILog[];

  @Prop({ type: 'date' })
  isDeleted: string;
}
```

### ILog
```typescript
export interface ILog {
  date: Date;
  message: string;
  by: string;
}
```

This documentation provides a basic overview of the API endpoints, request/response formats, and models used in your application.

# Automech

## Testing Instruction

When prompted to input shops only local shops such as "Good News Garage" have been populated with data so please test with those.

## API Routes

### Users

#### `POST /api/users/session` - Sign in user

**Body**

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with user's details (without password)

**Throws**

- `403` if the user is already logged in
- `400` if username or password is not in correct format format or missing in the req
- `401` if the user login credentials are invalid

#### `DELETE /api/users/session` - Sign out user

**Returns**

- A success message

**Throws**

- `403` if user is not logged in

#### `POST /api/users` - Create an new user account

**Body**

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with the created user's details (without password)

**Throws**

- `403` if there is a user already logged in
- `400` if username or password is in the wrong format
- `409` if username is already in use

#### `PUT /api/users` - Update a user's profile

**Body** _(no need to add fields that are not being changed)_

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with the update user details (without password)

**Throws**

- `403` if the user is not logged in
- `400` if username or password is in the wrong format
- `409` if the username is already in use

#### `DELETE /api/users` - Delete user

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in

#### `GET /api/users` - Update a user's profile

**Body** _(no need to add fields that are not being changed)_

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with the update user details (without password)

**Throws**

- `403` if the user is not logged in
- `400` if username or password is in the wrong format
- `409` if the username is already in use

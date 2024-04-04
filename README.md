# Rentify

Rentify is a community-driven rental platform that connects neighbors in Bogoso and surrounding areas to rent tools and equipment from each other. Our platform allows users to lend out their underutilized tools and equipment to those who need them, fostering a sharing economy and reducing expenses for everyone involved.

## Team

    Project Lead & Backend Developer: Enoch Taylor

## Architecture and Technologies

Rentify is built using the following technologies:

    Node.js: Backend server environment
    Express.js: Web application framework for Node.js
    MongoDB: NoSQL database for storing application data
    Mongoose: MongoDB object modeling for Node.js
    JWT (JSON Web Tokens): Token-based authentication mechanism
    bcrypt: Password hashing for enhanced security
    Nodemailer: Sending emails for user verification and password reset
    Dotenv: Environment variable management
    Postman: Testing API endpoints

## Usage

### Getting Started

To run the application locally, follow these steps:

    Clone the repository:

    ```bash git clone https://github.com/tay121222/rentify.git
    Install dependencies:

    cd rentify npm install
    Set up environment variables:

    Create a .env file in the root directory and add the following variables:

    MONGODB_URI=mongodb://192.168.0.159:27017/rentify JWT_SECRET=techdinos
    Start the server:

    npm run start-server

### API Endpoints

The following are some of the key API endpoints available in Rentify:

#### User Authentication: - Register User:

    ```bash curl -X POST http://localhost:3000/user/register -H "Content-Type: application/json" -d '{"username": "example_user", "email": "example@example.com", "password": "examplepassword" , "fullName": "examplename", "phoneNumber": "123456789"}'

    Login User: ```bash curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email": "example@example.com", "password": "examplepassword"}'
    Email Verification with login: ```bash curl -X GET http://localhost:3000/user/verify/:verificationtoken

#### Item Management: - Add Item:

    ```bash curl -X POST http://localhost:3000/item/add -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d '{"name": "Example Item", "description": "This is an example item", "price": 10, "category": "Example Category", "image": "example_image.jpg"}'

    Update Item: ```bash curl -X PUT http://localhost:3000/item/update/<itemId> -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d '{"name": "Updated Item Name", "description": "Updated item description", "price": 20, "category": "Updated Category", "image": "updated_image.jpg"}'
    Delete Item: ```bash curl -X DELETE http://localhost:3000/item/delete/<itemId> -H "Authorization: Bearer <your_jwt_token>"
    Get all Items: ```bash curl -X GET http://localhost:3000/item
    Get Item Based on ItemID: curl -X GET 'http://localhost:3000/item/:itemId'

#### Reservation Management: - Create Reservation for Item:

    ```bash curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"itemId": "6606837a9ccd5af54627027b", "startDate": "2024-04-01", "endDate": "2024-12-01"}' http://localhost:3000/reservation/create

    Update Reservation: ```bash curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <token ID>" -d '{"startDate": "2024-03-01", "endDate": "2024-12-01"}' http://localhost:3000/reservation/update/<reservation ID>
    Cancel Reservation: ```bash curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <token>" http://localhost:3000/reservation/cancel/<reservation ID>
    Get all user reservations: ```bash curl -X GET http://localhost:3000/reservation/user -H "Authorization: Bearer <your_jwt_token>"

#### Reservation Management:

        Add review:

    ```bash curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <jwt token>" -d '{"itemId": "660bf816603ee2f796cc4be5", "rating": 10, "comment": "Your review comment"}' http://localhost:3000/review/add

        Update Review:

    ```bash curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <jwt token>" -d '{"rating": 6, "comment": "Updated review comment"}' http://localhost:3000/review/update/<review id>

        Delete Review:

    ```bash curl -X DELETE -H "Authorization: Bearer <your_token>" http://localhost:3000/review/delete/<review_id>

        Get Item Review By Item ID:

    ```bash curl -X GET -H "Authorization: Bearer <your_token>" http://localhost:3000/review/item/<item_id>

#### Get Item Review By UserID via Token: - via jwt:

    ```bash curl -X GET -H "Authorization: Bearer <your_token>" http://localhost:3000/review/user

    via req param: ```bash curl -X GET -H "Authorization: Bearer <your_token>" http://localhost:3000/review/user/<user_id>

#### Favorites: - Add Favourite:

    ```bash curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your_token>" http://localhost:3000/favorite/add/<item_id>

    Get All User Favourites: ```bash curl -X GET -H "Authorization: Bearer <your_token>" http://localhost:3000/favorite
    Delete User Favourite: ```bash curl -X DELETE -H "Authorization: Bearer <your_token>" http://localhost:3000/favorite/delete/<item_id>

###Conculsion

Rentify is more than just a rental platform; it's a tool for community empowerment and connection.

Let's embark on this journey together and make Rentify the go-to destination for collaborative living!

Thank you for your attention, and we look forward to making Rentify success together!

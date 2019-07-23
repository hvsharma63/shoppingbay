# shoppingbay
A Simple E-Commerce Website built with Angular and Node

### Importing DB Instructions
- Change directory to */server* and type *npx sequelize-cli db:migrate* **OR** Import the database from *database* folder directly.
- Register account and change the role to *admin* to access admin panel


### Known Issues

#### Admin Panel
- ~~Retrieving & Updating the radiobuttons in Products Section (StockAvailability)~~
- Dates Validation
- ~~Custom Validator for confirming password in Register Section. It fails to validate if the user changes the password (again)~~.
- Restricting users from entering the keyboard keys that are not allowed. (haven't written the code yet)
- Pages does not load all the javascript once you log in. You need to refresh to make them work. (No reason found for the fix or for the issue yet)


### To-Do
#### Admin Panel
- [ ] NodeJS Validations

### NOTE
#### Admin Panel
-  Order, OrderProducts and Ratings API have been created but will be called from client side. Read-only permissions are given to admin.
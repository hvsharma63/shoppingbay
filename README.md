# shoppingbay
A Simple E-Commerce Website built with Angular and Node

### Importing DB Instructions
- Change directory to */server* and type *npx sequelize-cli db:migrate*
- Register account and change the role to *admin* to access admin panel


### Known Issues
- Retrieving & Updating the radiobuttons in Products Section
- Dates Validation
- Custom Validator for confirming password in Register Section. It fails to validate if the user changes the password (again).
- Restricting users from entering the keyboard keys that are not allowed. (haven't written the code yet)
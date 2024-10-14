## Starting the App

Run `npm i` to install dependencies first, and then run `ng s` to start the app.

### Implement multi-form submission feature with validation and UX enhancements

- Add an array of form cards with up to 10 entries, including inputs for Country (with enum-based suggestions), Username (backend validation), and Birthday (datepicker with date restrictions).
- Implement validations for each input, including backend checks for Username availability and tooltip messages for invalid entries.
- Add functionality to display the number of invalid forms next to the "Submit all forms" button.
- Enable form creation and deletion, with a 'Submit all forms' button that triggers a 5-second timer. Provide cancel option to resume editing.
- Refactor codebase to improve structure, readability, and maintainability with TypeScript path aliases, custom validators, and reusable directives.
- Integrate Bootstrap icons, tooltips, and UI enhancements for improved user guidance and experience.

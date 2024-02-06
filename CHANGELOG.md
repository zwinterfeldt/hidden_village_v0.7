# Hidden Village Project Changelog - Version 0.5
Classes: [ADDED, FIXED, CHANGED, UPDATED, REMOVED]


## Update: 2/?/2024 -v0.5.2.?
### Conjecture Database Objects
#### Database Values
- [ADDED](https://github.com/T0rt13/hidden_village_v0.5/pull/6): a UUID to conjectures.
- [ADDED](https://github.com/T0rt13/hidden_village_v0.5/pull/6): a AuthorID to conjectures.
- [ADDED](https://github.com/T0rt13/hidden_village_v0.5/pull/6): the PIN to conjectures.
#### Database Functions
- [ADDED](https://github.com/T0rt13/hidden_village_v0.5/pull/7): getConjectureDataByUUID(conjectureID) returns conjecture based on UUID.
- [ADDED](https://github.com/T0rt13/hidden_village_v0.5/pull/7): getConjectureDataByAuthorID(AuthorID) returns conjecture based on the user authentication ID (NOTE: It is not the ID that the user writes into the conjecture. That information is not saved for some reason).
- [ADDED](https://github.com/T0rt13/hidden_village_v0.5/pull/7): getConjectureDataByPIN(PIN) returns conjecture based on PIN (should return one, but since the user creates it, it can return multiple) 

### Interface Enhancements
- [CHANGED](https://github.com/T0rt13/hidden_village_v0.5/pull/6): the time to capture pose from 10 seconds to 2 seconds. For ease of use. Might change back later
- [ADDED](https://github.com/T0rt13/hidden_village_v0.5/pull/7): test UUID, AUTHORID, PIN button to the conjecture editor, will be removed in a later update.

## Update: 2/5/2024 -v0.5.2.1
### Interface Enhancements
- [ADDED](https://github.com/T0rt13/hidden_village_v0.5/pull/5): a logout button from the homescreen to allow the user to sign into a different account.
- [FIXED](https://github.com/T0rt13/hidden_village_v0.5/pull/5): the autocomplete error for email in the Sign on Screen.
- [ADDED](https://github.com/T0rt13/hidden_village_v0.5/pull/5): mouse cursor will now change to a pointer when hovering a button/reactbutton.
  
## Update: 2/2/2024 - v0.5.1.1
### Authentication Changes
- CHANGED: Authentication data is no longer persistent. Players now need to log in every time the browser is reopened.

### Interface Enhancements
- UPDATED: various button visuals for improved aesthetics.
- ADDED: a back button to the conjecture editor, facilitating easy navigation back to the home screen.

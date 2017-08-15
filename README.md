iFelt - A feelings-based blogging app

ifelt.herokuapp.com

Technologies used: The entire app is created using the Model-View-Controller framework. I utilized embedded JavaScript, 
Mongoose, and associated node package modules.  Pages are rendered using embedded JavaScript, relying heavily on EJS 
partials and static files.

Approach taken: I started by creating a user model and related controller and then worked to implement full CRUD with 
users.  At this point, my focus switched to register/login/logout capability for users, with each user having their own 
"landing page" to (eventually) create, edit, and delete their own posts.  I wanted to keep this function within the user's 
own landing page to prevent other users (or unlogged guests) from modifying others' content.  After users and the associated 
functionality were complete, I then created a feelings model, as it would be necessary to allow users to create feelings 
associated with their individual blog posts.  For feelings, I decided against editing and removing them, to avoid changing 
feelings associated with users' previous posts.  After feelings were created, I created the posts model, with full CRUD 
routes so users could create, modify, and delete their own posts.  I then added an unlinked admin section to the app so 
I could delete posts, feelings, and users as I deemed necessary.  This was primarily intended to aid in testing and to 
avoid clogging the page with posts filled with "asdf asdf."  At this point, I decided I'd like to add a simple comments 
model to give logged-in users the ability to comment on other user posts.  I decided against deleting comments or saving 
those comments into the user's account.  Finally, I used normalize and skeleton to do the heavy-CSS lifting, and made 
modifications to the CSS of the partials and EJS pages as desired.

Unsolved problems/Future growth: I would like to continue to develop this app in the future by including like buttons 
for posts and the ability for users to delete and modify their comments.  I would also like to include user names in 
the comments so users could interact with one another via comments.

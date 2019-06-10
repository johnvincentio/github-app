
# Coding Challenge Guidelines

Please organize, design, test, document and deploy your code as if it were going into <strong>production</strong>, then send us a link to the hosted repository (e.g. Github, Bitbucket...).

## Functional spec

Create an application that allows for a user to search for a GitHub username.

On a successful search return, display:

* the user's GitHub handle, 
* follower count, 
* a list of the user's followers (just the avatar is fine). 

Since some users (e.g. mrdoob, holman, etc.) have many thousands of followers, GitHub only returns a portion of the followers with each request.

Create a "load more" button that, when clicked, fetches the next payload of followers. This button should persist until there are no more pages of followers to fetch.

Information on the GitHub API is available here: [GitHub API](https://t.yesware.com/tt/f7d714dfe952964fb8a66c04148aec7ba5b2d297/0f25765a945028f6e44dee5595cea2ee/7b0004ac896f68f234bfc27eff266c95/developer.github.com/v3/)

The UX/UI is totally up to you. If you like, get creative and add additional features a user might find useful!

## Technical spec

The front-end should ideally be a single page app with a single index.html linking to external JS/CSS/etc. Please take take this opportunity to demonstrate your CSS3 and HTML5 knowledge.

Please use ReactJS to complete the coding challenge

## Host it!

When you’re done, host it somewhere (e.g. on Amazon EC2, Heroku, Google AppEngine, etc.).


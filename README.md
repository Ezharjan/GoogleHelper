# GoogleHelper

### Introduction

**Let Me Google That For You** is a lighthearted web tool that generates a shareable link demonstrating, step by step, how to search Google for any question.

Type a question, click **Google Search**, and copy the generated link. When the recipient opens the link, an animated cursor walks them through selecting the search box, typing the query, and clicking the search button, then forwards them to the real Google results page.

### Features

- Clean, responsive UI that works on desktop and mobile
- Base64-encoded queries so the question is not exposed in plain text in the URL
- Animated, guided tutorial when a link is opened
- One-click copy of the generated shareable link
- Preview button to test the link before sharing

### Project structure

```
GoogleHelper/
- index.html          Main page
- css/style.css       Styles
- js/script.js        Application logic
- js/jquery.min.js    jQuery library
- js/base64.min.js    Base64 encode/decode
- js/clipboard.min.js Clipboard helper
- img/google_logo.svg Google wordmark
- img/arrow.png       Desktop guide cursor
- img/hand.png        Mobile guide cursor
```

### Usage

Open `index.html` in any modern browser. No build step or server is required, everything is static HTML, CSS, and JavaScript.

### Disclaimer

This project is not affiliated with Google LLC. All logos shown are trademarks of their respective owners and are used here for illustrative purposes only.

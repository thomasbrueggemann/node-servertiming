<img src="http://i.imgur.com/8VdlYKn.png" />

# 📊 Server-Timing [![Build Status](https://travis-ci.org/thomasbrueggemann/node-servertiming.svg?branch=master)](https://travis-ci.org/thomasbrueggemann/node-servertiming)
Generate Server-Timing headers interactively in NodeJS

Inpired by:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">📊 View your server&#39;s metrics in <a href="https://twitter.com/ChromeDevTools">@ChromeDevTools</a> via Server Timing headers. Big thanks to longtime Firebug developer <a href="https://twitter.com/sroussey">@sroussey</a> for the patch! <a href="https://t.co/OjDDIv0lLR">pic.twitter.com/OjDDIv0lLR</a></p>&mdash; Paul Irish (@paul_irish) <a href="https://twitter.com/paul_irish/status/829090506084749312">February 7, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## Installation

```shell
npm install servertiming --save
```

## Usage

```javascript
var ServerTiming = require("servertiming");

// start the timer
ServerTiming.start("Database Query");

// ... do something work intensive

// ... later, you can stop the timer
var timeInMS = ServerTiming.stop("Database Query");

// ... use the header string within your server framework or whatever
res.setHeader("Server-Timing", ServerTiming.generateHeader());
return res.send({whatever: "you want"});

// This will output: database-query=0.122; "Database Query"
```

See the /example folder for a detailed express.js example!

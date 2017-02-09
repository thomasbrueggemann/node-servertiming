# Server-Timing [![Build Status](https://travis-ci.org/thomasbrueggemann/node-servertiming.svg?branch=master)](https://travis-ci.org/thomasbrueggemann/node-servertiming) [![npm version](https://badge.fury.io/js/servertiming.svg)](https://badge.fury.io/js/servertiming)
Generate Server-Timing headers interactively by setting timers in NodeJS

Inpired by:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">📊 View your server&#39;s metrics in <a href="https://twitter.com/ChromeDevTools">@ChromeDevTools</a> via Server Timing headers. Big thanks to longtime Firebug developer <a href="https://twitter.com/sroussey">@sroussey</a> for the patch! <a href="https://t.co/OjDDIv0lLR">pic.twitter.com/OjDDIv0lLR</a></p>&mdash; Paul Irish (@paul_irish) <a href="https://twitter.com/paul_irish/status/829090506084749312">February 7, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<img src="http://i.imgur.com/8VdlYKn.png" />

## Installation

```shell
npm install servertiming --save
```

## Usage

```javascript
var ServerTiming = require("servertiming");
var timing = new ServerTiming();

timing.startTimer("Database Query");

// ... do something work-intensive

var timeInMS = timing.stopTimer("Database Query");

// you can also add metrics without the timer function
// the time value is always in milliseconds!
timing.addMetric("Image Processing", 12847)

// ... use the header string within your server framework or whatever
res.setHeader("Server-Timing", timing.generateHeader());
return res.send({whatever: "you want"});

// this will output:
// database-query=0.122; "Database Query",image-processing=12.365; "Image Processing"
```

See the <a href="https://github.com/thomasbrueggemann/node-servertiming/tree/master/example">/example</a> folder for a detailed express.js example!

[![Build Status](http://img.shields.io/PowerSheetAI/power-url-regex-intl.svg?style=flat)](https://travis-ci.org/PowerSheetAI/power-url-regex-intl) [![Greenkeeper badge](https://badges.greenkeeper.io/PowerSheetAI/power-url-regex-intl)](https://greenkeeper.io/)

# url-regex

> Regular expression for matching URLs

Regular expression for smart international-friendly finding, matching and replacing of one or more URLs found in text, regardless of whether or not starts with https://, ftp://, www, etc. or based on detection of even the newest IDN international registered top-level domains (TLDs) (like .com, .ai, .io, .co.uk, .community, .app, .個人.香港, .xn--tiq49xqyj) even when have punctuation, symbols, emojis, bullet points, etc. found immediately before or after the URL.

Handles Unicode and international (CJK, Cyrillic, half-width, full-width, Chinese, Japanese, Korean, etc.) TLDs (such as found at tld-list.com), punctuation, IP addresses, port numbers, uncommon protocols, localhost, WebRTC, and double dot TLDs, Punycode and more.

Optimized for reliable use with social posts, messages, articles, web scraping, rich text editing, data entry and more.

By developers of free AI powered Power Sheet platform (https://PowerSheet.ai) for auto-creating no-code apps, real-time collaboration, BI dashboards, forms and report for Excel, web, mobile and embedded use.

This is a fork of [averissimo/url-regex](https://github.com/averissimo/url-regex), which was based on [kevva/url-regex](https://github.com/kevva/url-regex), which in turn was based on a [gist by Diego Perini](https://gist.github.com/dperini/729294).


## Install

```
$ npm install --save power-url-regex-intl
```


## Usage

```js
//import the NPM package
const urlRegex = require('power-url-regex-intl');

//optionally create the RegExp patterns ahead of time for each type of match you want to support

const hasUrlsRegex = urlRegex({exact: false, strict: false});
const hasUrlsExplicitRegex = urlRegex({exact: false, strict: true});

const isUrlRegex = urlRegex({exact: true, strict: false});
const isUrlExplicitRegex = urlRegex({exact: true, strict: true});


//optionally create utility functions which use those RegExp
//to determine of text is or contains one or more URLs
//(eg. starting with http:// if explicit)
//(or intelligently based on .com, .net, .ai, .co.uk, etc. known TLDs, IP address, localhost etc.)
const hasUrls = (text) => hasUrlsRegex.test(text);
const hasUrlsExplicit = (text) => hasUrlsExplicitRegex.test(text);

const isUrl = (text) => isUrlRegex.test(text);
const isUrlExplicit = (text) => isUrlExplicitRegex.test(text);

const getUrlsIn = (text) => text.match(hasUrlsRegex);
const getExplicitUrlsIn = (text) => text.match(hasUrlsExplicitRegex);


const message = 'Sign up at powersheet.ai for free Power Sheet for Excel, web & mobile! Also follow on LinkedIn.com!';
const messageWithExplicitUrl = 'Sign up at https://powersheet.ai';
const aUrl = 'https://www.powersheet.ai/excel-bi-dashboards-db-free-ai-tool';
const domainOnly = 'powersheet.ai';

hasUrl(message);
//=> true

isUrl(aUrl);
//=> true

isUrl(domainOnly);
//=> true

isUrlExplicit(domainOnly);
//=> false

isUrl(message);
//=> false

hasExplicitUrl(messageWithExplicitUrl);
//=> true

hasExplicitUrl(message);
//=> false

isUrlExplicit(messageWithExplicitUrl);
//=> false

const socialPost = `Sign up for free Power Sheet @ PowerSheet.ai
Also visit（https:\\www.linkedin.com）and google.com, o.कंपनी.भारत, 👉n.ai👉 u.abkhazia.su! and (powersheet.ai) and www.w.ml.
a.ai－a
b.ai＋a
c.ai＆a
d.ai➕a
e.ai➕a
f.ai➕a
（g.ai）
h.ai 
i.ai｜
j.ai|
k.ai,a
l.ai!a
m.ai！a
👉n.ai👉
o.कंपनी.भारत
p.कंपनी
q.co.uk
r.XN--MGBERP4A5D4AR
s.XN--VERMGENSBERATUNG-PWB
t.co.uk
u.abkhazia.su
v.香港
w.港  //invalid so not included
x.個人.香港
－a.ai
＋b.ai
＆c.ai
➕d.ai
➕e.ai
➕f.ai
 h.ai
｜i.ai
|j.ai
,k.ai
!l.ai
！m.ai
The rest of a post or article with various links that may be found throughout it...
`;

getUrlsIn(socialPost);
//=> ["PowerSheet.ai", "https:\\www.linkedin.com", ...]

urlRegex({exact: true}).test('http://github.com foo bar');
//=> false

getUrlsIn('foo http://github.com bar //google.com');
//=> ['http://github.com', '//google.com']


```


## API

### urlRegex(options)

Returns a regex for matching URLs.

#### options

##### exact

Type: `boolean`<br>
Default: `false`

Only match an exact string. Useful with `RegExp#test` to check if a string is a URL.

##### strict

Type: `boolean`<br>
Default: `true`

Force URLs to start with a valid protocol or `www`. If set to `false` it'll match the TLD against a list of valid [TLDs](https://github.com/stephenmathieson/node-tlds).


## License

MIT © [Dan Moorehead](https://github.com/PowerSheetAI/power-url-regex-intl) ([Power Sheet for Excel, Web & Mobile](https://PowerSheet.ai) founder), [André Veríssimo](https://github.com/averissimo), [Kevin Mårtensson](https://github.com/kevva) and [Diego Perini](https://github.com/dperini)

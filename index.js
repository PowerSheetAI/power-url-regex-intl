'use strict';
const ipRegex = require('ip-regex');
//tlds package auto-updated to latest (https://github.com/stephenmathieson/node-tlds) scrapped results from ICANN (http://data.iana.org/TLD/tlds-alpha-by-domain.txt)
const tlds = require('tlds');

//TODO: Create a custom Webpack Loader (https://github.com/webpack/docs/wiki/how-to-write-a-loader) to preprocess ipRegex to string and
//TODO: Transpile for ES5 OR replace template string + lambda + const use for that instead
//TODO: Options for ignoreEmoji ignorePunctuation and userDefined regex part for characters to skip at start/end
//TODO: Reuse patterns: a-z\\u00a1-\\uffff and spaces=\\s dot=\\.
//TODO: Parse all text starting with "// xn--" in tlds's index.js to get the valid punycodes to accept

const urlRegex = opts => {
  opts = Object.assign({strict: true}, opts);

  //from unicode letter category: XRegExp('\\p{L}')
  const letter = '[A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿯ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞹꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]';

  const protocol = `(?:(?:[a-z]+:)?//)${opts.strict ? '' : '?'}`;
  const auth = '(?:\\S+(?::\\S*)?@)?';
  //changed to ipv6 + ipv4 via just ipRegex() instead of , otherwise use ipRegex.v4()
  //from: https://github.com/sindresorhus/ip-regex/blob/master/index.js
  const ip = ipRegex({exact: true}).source.replace('^', '').replace('$', '');
  const host = '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)';
  const domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
  const tld = `(?:\\.${opts.strict ? '(?:[a-z\\u00a1-\\uffff]{2,})' : `(?:${tlds.sort((a, b) => b.length - a.length).join('|')})`})\\.?`;
  const port = '(?::\\d{2,5})?';
  // Original regular expression from kevva (but not accepting any closing parenthesis)
  const path = '(?:[/?#][^\\s\\)"]*)?';

  const regex1 = `(?:${protocol}|www\\.)${auth}(?:localhost|${ip}|${host}${domain}${tld})${port}${path}`;
  // Accepts all closing parenthesis if there is an opening one
  //TODO: Should this be non-capturing group too after [/?#] ?
  const path2 = '(?:[/?#]([^\\s"]*\\([^\\s"]*))';
  const regex2 = `(?:${protocol}|www\\.)${auth}(?:localhost|${ip}|${host}${domain}${tld})${port}${path2}`;
  // Accepts closing parenthesis as long as in middle of link (not in the last)
  const path3 = '(?:[/?#][^\\s"]*[^\\s\\)"]+)?';
  const regex3 = `(?:${protocol}|www\\.)${auth}(?:localhost|${ip}|${host}${domain}${tld})${port}${path3}`;
  // Builds on all three regular expressions
//TODO: Remove redundent regex1 without path1/2/3 at end. Try simplifying regex = base(path|path2|path3) instead of repeating base
  const regex = `((${regex2})|(${regex3})|(${regex1}))`;

  return opts.exact ? new RegExp(`(?:^${regex}$)`, 'i') : new RegExp(regex, 'ig');
};


//TODO: Export functions from readme as well:

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


module.exports = { urlRegex, hasUrlsRegex, hasUrlsExplicitRegex, isUrlRegex, isUrlExplicitRegex, hasUrls, hasUrlsExplicit, isUrl, isUrlExplicit, getUrlsIn, getExplicitUrlsIn };

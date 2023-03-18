ace.define("ace/mode/asciidoc",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/asciidoc_highlight_rules","ace/mode/folding/asciidoc"],(function(e,t,n){var o=e("../lib/oop"),r=e("./text").Mode,i=e("../tokenizer").Tokenizer,l=e("./asciidoc_highlight_rules").AsciidocHighlightRules,a=e("./folding/asciidoc").FoldMode,s=function(){var e=new l;this.$tokenizer=new i(e.getRules()),this.foldingRules=new a};o.inherits(s,r),function(){this.getNextLineIndent=function(e,t,n){if("listblock"==e){var o=/^((?:.+)?)([-+*][ ]+)/.exec(t);return o?new Array(o[1].length+1).join(" ")+o[2]:""}return this.$getIndent(t)}}.call(s.prototype),t.Mode=s})),ace.define("ace/mode/asciidoc_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(e,t,n){var o=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,i=function(){function e(e){return(/\w/.test(e)?"\\b":"(?:\\B|^)")+e+"[^"+e+"].*?"+e+"(?![\\w*])"}var t="[a-zA-Z¡-￿]+\\b";this.$rules={start:[{token:"empty",regex:/$/},{token:"literal",regex:/^\.{4,}\s*$/,next:"listingBlock"},{token:"literal",regex:/^-{4,}\s*$/,next:"literalBlock"},{token:"string",regex:/^\+{4,}\s*$/,next:"passthroughBlock"},{token:"keyword",regex:/^={4,}\s*$/},{token:"text",regex:/^\s*$/},{token:"empty",regex:"",next:"dissallowDelimitedBlock"}],dissallowDelimitedBlock:[{include:"paragraphEnd"},{token:"comment",regex:"^//.+$"},{token:"keyword",regex:"^(?:NOTE|TIP|IMPORTANT|WARNING|CAUTION):"},{include:"listStart"},{token:"literal",regex:/^\s+.+$/,next:"indentedBlock"},{token:"empty",regex:"",next:"text"}],paragraphEnd:[{token:"doc.comment",regex:/^\/{4,}\s*$/,next:"commentBlock"},{token:"tableBlock",regex:/^\s*[|!]=+\s*$/,next:"tableBlock"},{token:"keyword",regex:/^(?:--|''')\s*$/,next:"start"},{token:"option",regex:/^\[.*\]\s*$/,next:"start"},{token:"pageBreak",regex:/^>{3,}$/,next:"start"},{token:"literal",regex:/^\.{4,}\s*$/,next:"listingBlock"},{token:"titleUnderline",regex:/^(?:={2,}|-{2,}|~{2,}|\^{2,}|\+{2,})\s*$/,next:"start"},{token:"singleLineTitle",regex:/^={1,5}\s+\S.*$/,next:"start"},{token:"otherBlock",regex:/^(?:\*{2,}|_{2,})\s*$/,next:"start"},{token:"optionalTitle",regex:/^\.[^.\s].+$/,next:"start"}],listStart:[{token:"keyword",regex:/^\s*(?:\d+\.|[a-zA-Z]\.|[ixvmIXVM]+\)|\*{1,5}|-|\.{1,5})\s/,next:"listText"},{token:"meta.tag",regex:/^.+(?::{2,4}|;;)(?: |$)/,next:"listText"},{token:"support.function.list.callout",regex:/^(?:<\d+>|\d+>|>) /,next:"text"},{token:"keyword",regex:/^\+\s*$/,next:"start"}],text:[{token:["link","variable.language"],regex:/((?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+)(\[.*?\])/},{token:"link",regex:/(?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+/},{token:"link",regex:/\b[\w\.\/\-]+@[\w\.\/\-]+\b/},{include:"macros"},{include:"paragraphEnd"},{token:"literal",regex:/\+{3,}/,next:"smallPassthrough"},{token:"escape",regex:/\((?:C|TM|R)\)|\.{3}|->|<-|=>|<=|&#(?:\d+|x[a-fA-F\d]+);|(?: |^)--(?=\s+\S)/},{token:"escape",regex:/\\[_*'`+#]|\\{2}[_*'`+#]{2}/},{token:"keyword",regex:/\s\+$/},{token:"text",regex:t},{token:["keyword","string","keyword"],regex:/(<<[\w\d\-$]+,)(.*?)(>>|$)/},{token:"keyword",regex:/<<[\w\d\-$]+,?|>>/},{token:"constant.character",regex:/\({2,3}.*?\){2,3}/},{token:"keyword",regex:/\[\[.+?\]\]/},{token:"support",regex:/^\[{3}[\w\d =\-]+\]{3}/},{include:"quotes"},{token:"empty",regex:/^\s*$/,next:"start"}],listText:[{include:"listStart"},{include:"text"}],indentedBlock:[{token:"literal",regex:/^[\s\w].+$/,next:"indentedBlock"},{token:"literal",regex:"",next:"start"}],listingBlock:[{token:"literal",regex:/^\.{4,}\s*$/,next:"dissallowDelimitedBlock"},{token:"constant.numeric",regex:"<\\d+>"},{token:"literal",regex:"[^<]+"},{token:"literal",regex:"<"}],literalBlock:[{token:"literal",regex:/^-{4,}\s*$/,next:"dissallowDelimitedBlock"},{token:"constant.numeric",regex:"<\\d+>"},{token:"literal",regex:"[^<]+"},{token:"literal",regex:"<"}],passthroughBlock:[{token:"literal",regex:/^\+{4,}\s*$/,next:"dissallowDelimitedBlock"},{token:"literal",regex:t+"|\\d+"},{include:"macros"},{token:"literal",regex:"."}],smallPassthrough:[{token:"literal",regex:/[+]{3,}/,next:"dissallowDelimitedBlock"},{token:"literal",regex:/^\s*$/,next:"dissallowDelimitedBlock"},{token:"literal",regex:t+"|\\d+"},{include:"macros"}],commentBlock:[{token:"doc.comment",regex:/^\/{4,}\s*$/,next:"dissallowDelimitedBlock"},{token:"doc.comment",regex:"^.*$"}],tableBlock:[{token:"tableBlock",regex:/^\s*\|={3,}\s*$/,next:"dissallowDelimitedBlock"},{token:"tableBlock",regex:/^\s*!={3,}\s*$/,next:"innerTableBlock"},{token:"tableBlock",regex:/\|/},{include:"text",noEscape:!0}],innerTableBlock:[{token:"tableBlock",regex:/^\s*!={3,}\s*$/,next:"tableBlock"},{token:"tableBlock",regex:/^\s*|={3,}\s*$/,next:"dissallowDelimitedBlock"},{token:"tableBlock",regex:/\!/}],macros:[{token:"macro",regex:/{[\w\-$]+}/},{token:["text","string","text","constant.character","text"],regex:/({)([\w\-$]+)(:)?(.+)?(})/},{token:["text","markup.list.macro","keyword","string"],regex:/(\w+)(footnote(?:ref)?::?)([^\s\[]+)?(\[.*?\])?/},{token:["markup.list.macro","keyword","string"],regex:/([a-zA-Z\-][\w\.\/\-]*::?)([^\s\[]+)(\[.*?\])?/},{token:["markup.list.macro","keyword"],regex:/([a-zA-Z\-][\w\.\/\-]+::?)(\[.*?\])/},{token:"keyword",regex:/^:.+?:(?= |$)/}],quotes:[{token:"string.italic",regex:/__[^_\s].*?__/},{token:"string.italic",regex:e("_")},{token:"keyword.bold",regex:/\*\*[^*\s].*?\*\*/},{token:"keyword.bold",regex:e("\\*")},{token:"literal",regex:e("\\+")},{token:"literal",regex:/\+\+[^+\s].*?\+\+/},{token:"literal",regex:/\$\$.+?\$\$/},{token:"literal",regex:e("`")},{token:"keyword",regex:e("^")},{token:"keyword",regex:e("~")},{token:"keyword",regex:/##?/},{token:"keyword",regex:/(?:\B|^)``|\b''/}]};var n={macro:"constant.character",tableBlock:"doc.comment",titleUnderline:"markup.heading",singleLineTitle:"markup.heading",pageBreak:"string",option:"string.regexp",otherBlock:"markup.list",literal:"support.function",optionalTitle:"constant.numeric",escape:"constant.language.escape",link:"markup.underline.list"};for(var o in this.$rules)for(var r=this.$rules[o],i=r.length;i--;){var l=r[i];if(l.include||"string"==typeof l){var a=[i,1].concat(this.$rules[l.include||l]);l.noEscape&&(a=a.filter((function(e){return!e.next}))),r.splice.apply(r,a)}else l.token in n&&(l.token=n[l.token])}};o.inherits(i,r),t.AsciidocHighlightRules=i})),ace.define("ace/mode/folding/asciidoc",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],(function(e,t,n){var o=e("../../lib/oop"),r=e("./fold_mode").FoldMode,i=e("../../range").Range,l=t.FoldMode=function(){};o.inherits(l,r),function(){this.foldingStartMarker=/^(?:\|={10,}|[\.\/=\-~^+]{4,}\s*$|={1,5} )/,this.singleLineHeadingRe=/^={1,5}(?=\s+\S)/,this.getFoldWidget=function(e,t,n){var o=e.getLine(n);return this.foldingStartMarker.test(o)?"="==o[0]?this.singleLineHeadingRe.test(o)?"start":e.getLine(n-1).length!=e.getLine(n).length?"":"start":"dissallowDelimitedBlock"==e.bgTokenizer.getState(n)?"end":"start":""},this.getFoldWidgetRange=function(e,t,n){function o(t){return(c=e.getTokens(t)[0])&&c.type}function r(){var t=c.value.match(u);if(t)return t[0].length;var o=d.indexOf(c.value[0])+1;return 1==o&&e.getLine(n-1).length!=e.getLine(n).length?1/0:o}var l=e.getLine(n),a=l.length,s=e.getLength(),g=n,k=n;if(l.match(this.foldingStartMarker)){var c,d=["=","-","~","^","+"],x="markup.heading",u=this.singleLineHeadingRe;if(o(n)==x){for(var h=r();++n<s;){if(o(n)==x)if(r()<=h)break}if((k=c&&c.value.match(this.singleLineHeadingRe)?n-1:n-2)>g)for(;k>g&&(!o(k)||"["==c.value[0]);)k--;if(k>g){var m=e.getLine(k).length;return new i(g,a,k,m)}}else{if("dissallowDelimitedBlock"==e.bgTokenizer.getState(n)){for(;n-- >0&&-1!=e.bgTokenizer.getState(n).lastIndexOf("Block"););if((k=n+1)<g){m=e.getLine(n).length;return new i(k,5,g,a-5)}}else{for(;++n<s&&"dissallowDelimitedBlock"!=e.bgTokenizer.getState(n););if((k=n)>g){m=e.getLine(n).length;return new i(g,5,k,m-5)}}}}}}.call(l.prototype)}));

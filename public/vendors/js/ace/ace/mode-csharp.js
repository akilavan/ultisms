ace.define("ace/mode/csharp",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/csharp_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],(function(e,t,n){var o=e("../lib/oop"),r=e("./text").Mode,i=e("../tokenizer").Tokenizer,s=e("./csharp_highlight_rules").CSharpHighlightRules,a=e("./matching_brace_outdent").MatchingBraceOutdent,c=e("./behaviour/cstyle").CstyleBehaviour,u=e("./folding/cstyle").FoldMode,l=function(){this.$tokenizer=new i((new s).getRules()),this.$outdent=new a,this.$behaviour=new c,this.foldingRules=new u};o.inherits(l,r),function(){this.getNextLineIndent=function(e,t,n){var o=this.$getIndent(t),r=this.$tokenizer.getLineTokens(t,e).tokens;if(r.length&&"comment"==r[r.length-1].type)return o;"start"==e&&(t.match(/^.*[\{\(\[]\s*$/)&&(o+=n));return o},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(e){return null}}.call(l.prototype),t.Mode=l})),ace.define("ace/mode/csharp_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],(function(e,t,n){var o=e("../lib/oop"),r=e("./doc_comment_highlight_rules").DocCommentHighlightRules,i=e("./text_highlight_rules").TextHighlightRules,s=function(){var e=this.createKeywordMapper({"variable.language":"this",keyword:"abstract|event|new|struct|as|explicit|null|switch|base|extern|object|this|bool|false|operator|throw|break|finally|out|true|byte|fixed|override|try|case|float|params|typeof|catch|for|private|uint|char|foreach|protected|ulong|checked|goto|public|unchecked|class|if|readonly|unsafe|const|implicit|ref|ushort|continue|in|return|using|decimal|int|sbyte|virtual|default|interface|sealed|volatile|delegate|internal|short|void|do|is|sizeof|while|double|lock|stackalloc|else|long|static|enum|namespace|string|var|dynamic","constant.language":"null|true|false"},"identifier");this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},r.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",regex:".+"}]},this.embedRules(r,"doc-",[r.getEndRule("start")])};o.inherits(s,i),t.CSharpHighlightRules=s})),ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(e,t,n){var o=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,i=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc",regex:"\\s+"},{token:"comment.doc",regex:"TODO"},{token:"comment.doc",regex:"[^@\\*]+"},{token:"comment.doc",regex:"."}]}};o.inherits(i,r),i.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},i.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=i})),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],(function(e,t,n){var o=e("../range").Range,r=function(){};(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var n=e.getLine(t).match(/^(\s*\})/);if(!n)return 0;var r=n[1].length,i=e.findMatchingBracket({row:t,column:r});if(!i||i.row==t)return 0;var s=this.$getIndent(e.getLine(i.row));e.replace(new o(t,0,t,r-1),s)},this.$getIndent=function(e){var t=e.match(/^(\s+)/);return t?t[1]:""}}).call(r.prototype),t.MatchingBraceOutdent=r})),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],(function(e,t,n){var o=e("../../lib/oop"),r=e("../behaviour").Behaviour,i=e("../../token_iterator").TokenIterator,s=e("../../lib/lang"),a=["text","paren.rparen","punctuation.operator"],c=["text","paren.rparen","punctuation.operator","comment"],u=0,l=-1,g="",d=0,h=-1,m="",f="",p=function(){p.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),o=new i(t,n.row,n.column);if(!this.$matchTokenType(o.getCurrentToken()||"text",a)){var r=new i(t,n.row,n.column+1);if(!this.$matchTokenType(r.getCurrentToken()||"text",a))return!1}return o.stepForward(),o.getCurrentTokenRow()!==n.row||this.$matchTokenType(o.getCurrentToken()||"text",c)},p.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},p.recordAutoInsert=function(e,t,n){var o=e.getCursorPosition(),r=t.doc.getLine(o.row);this.isAutoInsertedClosing(o,r,g[0])||(u=0),l=o.row,g=n+r.substr(o.column),u++},p.recordMaybeInsert=function(e,t,n){var o=e.getCursorPosition(),r=t.doc.getLine(o.row);this.isMaybeInsertedClosing(o,r)||(d=0),h=o.row,m=r.substr(0,o.column)+n,f=r.substr(o.column),d++},p.isAutoInsertedClosing=function(e,t,n){return u>0&&e.row===l&&n===g[0]&&t.substr(e.column)===g},p.isMaybeInsertedClosing=function(e,t){return d>0&&e.row===h&&t.substr(e.column)===f&&t.substr(0,e.column)==m},p.popAutoInsertedClosing=function(){g=g.substr(1),u--},p.clearMaybeInsertedClosing=function(){d=0,h=-1},this.add("braces","insertion",(function(e,t,n,o,r){var i=n.getCursorPosition(),a=o.doc.getLine(i.row);if("{"==r){var c=n.getSelectionRange(),u=o.doc.getTextRange(c);if(""!==u&&"{"!==u&&n.getWrapBehavioursEnabled())return{text:"{"+u+"}",selection:!1};if(p.isSaneInsertion(n,o))return/[\]\}\)]/.test(a[i.column])?(p.recordAutoInsert(n,o,"}"),{text:"{}",selection:[1,1]}):(p.recordMaybeInsert(n,o,"{"),{text:"{",selection:[1,1]})}else if("}"==r){if("}"==a.substring(i.column,i.column+1))if(null!==o.$findOpeningBracket("}",{column:i.column+1,row:i.row})&&p.isAutoInsertedClosing(i,a,r))return p.popAutoInsertedClosing(),{text:"",selection:[1,1]}}else if("\n"==r||"\r\n"==r){var l="";if(p.isMaybeInsertedClosing(i,a)&&(l=s.stringRepeat("}",d),p.clearMaybeInsertedClosing()),"}"==a.substring(i.column,i.column+1)||""!==l){if(!o.findMatchingBracket({row:i.row,column:i.column},"}"))return null;var g=this.getNextLineIndent(e,a.substring(0,i.column),o.getTabString());return{text:"\n"+g+"\n"+this.$getIndent(a)+l,selection:[1,g.length,1,g.length]}}}})),this.add("braces","deletion",(function(e,t,n,o,r){var i=o.doc.getTextRange(r);if(!r.isMultiLine()&&"{"==i){if("}"==o.doc.getLine(r.start.row).substring(r.end.column,r.end.column+1))return r.end.column++,r;d--}})),this.add("parens","insertion",(function(e,t,n,o,r){if("("==r){var i=n.getSelectionRange(),s=o.doc.getTextRange(i);if(""!==s&&n.getWrapBehavioursEnabled())return{text:"("+s+")",selection:!1};if(p.isSaneInsertion(n,o))return p.recordAutoInsert(n,o,")"),{text:"()",selection:[1,1]}}else if(")"==r){var a=n.getCursorPosition(),c=o.doc.getLine(a.row);if(")"==c.substring(a.column,a.column+1))if(null!==o.$findOpeningBracket(")",{column:a.column+1,row:a.row})&&p.isAutoInsertedClosing(a,c,r))return p.popAutoInsertedClosing(),{text:"",selection:[1,1]}}})),this.add("parens","deletion",(function(e,t,n,o,r){var i=o.doc.getTextRange(r);if(!r.isMultiLine()&&"("==i&&")"==o.doc.getLine(r.start.row).substring(r.start.column+1,r.start.column+2))return r.end.column++,r})),this.add("brackets","insertion",(function(e,t,n,o,r){if("["==r){var i=n.getSelectionRange(),s=o.doc.getTextRange(i);if(""!==s&&n.getWrapBehavioursEnabled())return{text:"["+s+"]",selection:!1};if(p.isSaneInsertion(n,o))return p.recordAutoInsert(n,o,"]"),{text:"[]",selection:[1,1]}}else if("]"==r){var a=n.getCursorPosition(),c=o.doc.getLine(a.row);if("]"==c.substring(a.column,a.column+1))if(null!==o.$findOpeningBracket("]",{column:a.column+1,row:a.row})&&p.isAutoInsertedClosing(a,c,r))return p.popAutoInsertedClosing(),{text:"",selection:[1,1]}}})),this.add("brackets","deletion",(function(e,t,n,o,r){var i=o.doc.getTextRange(r);if(!r.isMultiLine()&&"["==i&&"]"==o.doc.getLine(r.start.row).substring(r.start.column+1,r.start.column+2))return r.end.column++,r})),this.add("string_dquotes","insertion",(function(e,t,n,o,r){if('"'==r||"'"==r){var i=r,s=n.getSelectionRange(),a=o.doc.getTextRange(s);if(""!==a&&"'"!==a&&'"'!=a&&n.getWrapBehavioursEnabled())return{text:i+a+i,selection:!1};var c=n.getCursorPosition(),u=o.doc.getLine(c.row);if("\\"==u.substring(c.column-1,c.column))return null;for(var l,g=o.getTokens(s.start.row),d=0,h=-1,m=0;m<g.length&&("string"==(l=g[m]).type?h=-1:h<0&&(h=l.value.indexOf(i)),!(l.value.length+d>s.start.column));m++)d+=g[m].value.length;if(!l||h<0&&"comment"!==l.type&&("string"!==l.type||s.start.column!==l.value.length+d-1&&l.value.lastIndexOf(i)===l.value.length-1)){if(!p.isSaneInsertion(n,o))return;return{text:i+i,selection:[1,1]}}if(l&&"string"===l.type)if(u.substring(c.column,c.column+1)==i)return{text:"",selection:[1,1]}}})),this.add("string_dquotes","deletion",(function(e,t,n,o,r){var i=o.doc.getTextRange(r);if(!r.isMultiLine()&&('"'==i||"'"==i)&&'"'==o.doc.getLine(r.start.row).substring(r.start.column+1,r.start.column+2))return r.end.column++,r}))};o.inherits(p,r),t.CstyleBehaviour=p})),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],(function(e,t,n){var o=e("../../lib/oop"),r=(e("../../range").Range,e("./fold_mode").FoldMode),i=t.FoldMode=function(){};o.inherits(i,r),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(e,t,n){var o,r=e.getLine(n);if(o=r.match(this.foldingStartMarker)){var i=o.index;return o[1]?this.openingBracketBlock(e,o[1],n,i):e.getCommentFoldRange(n,i+o[0].length,1)}if("markbeginend"===t&&(o=r.match(this.foldingStopMarker))){i=o.index+o[0].length;return o[1]?this.closingBracketBlock(e,o[1],n,i):e.getCommentFoldRange(n,i,-1)}}}.call(i.prototype)}));

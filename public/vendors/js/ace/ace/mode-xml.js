ace.define("ace/mode/xml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/xml_highlight_rules","ace/mode/behaviour/xml","ace/mode/folding/xml"],(function(e,t,n){var r=e("../lib/oop"),o=e("./text").Mode,i=e("../tokenizer").Tokenizer,a=e("./xml_highlight_rules").XmlHighlightRules,s=e("./behaviour/xml").XmlBehaviour,u=e("./folding/xml").FoldMode,l=function(){this.$tokenizer=new i((new a).getRules()),this.$behaviour=new s,this.foldingRules=new u};r.inherits(l,o),function(){this.getNextLineIndent=function(e,t,n){return this.$getIndent(t)}}.call(l.prototype),t.Mode=l})),ace.define("ace/mode/xml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/xml_util","ace/mode/text_highlight_rules"],(function(e,t,n){var r=e("../lib/oop"),o=e("./xml_util"),i=e("./text_highlight_rules").TextHighlightRules,a=function(){this.$rules={start:[{token:"text",regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:"xml-pe",regex:"<\\?.*?\\?>"},{token:"comment",regex:"<\\!--",next:"comment"},{token:"xml-pe",regex:"<\\!.*?>"},{token:"meta.tag",regex:"<\\/?",next:"tag"},{token:"text",regex:"\\s+"},{token:"constant.character.entity",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"},{token:"text",regex:"[^<]+"}],cdata:[{token:"text",regex:"\\]\\]>",next:"start"},{token:"text",regex:"\\s+"},{token:"text",regex:"(?:[^\\]]|\\](?!\\]>))+"}],comment:[{token:"comment",regex:".*?--\x3e",next:"start"},{token:"comment",regex:".+"}]},o.tag(this.$rules,"tag","start")};r.inherits(a,i),t.XmlHighlightRules=a})),ace.define("ace/mode/xml_util",["require","exports","module"],(function(e,t,n){function r(e,t){return[{token:"string",regex:e,next:t},{token:"constant.language.escape",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"},{token:"string",regex:"\\w+|.|\\s+"}]}t.tag=function(e,t,n,o){e[t]=[{token:"text",regex:"\\s+"},{token:o?function(e){return o[e]?"meta.tag.tag-name."+o[e]:"meta.tag.tag-name"}:"meta.tag.tag-name",regex:"[-_a-zA-Z0-9:]+",next:t+"_embed_attribute_list"},{token:"empty",regex:"",next:t+"_embed_attribute_list"}],e[t+"_qstring"]=r("'",t+"_embed_attribute_list"),e[t+"_qqstring"]=r('"',t+"_embed_attribute_list"),e[t+"_embed_attribute_list"]=[{token:"meta.tag.r",regex:"/?>",next:n},{token:"keyword.operator",regex:"="},{token:"entity.other.attribute-name",regex:"[-_a-zA-Z0-9:]+"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"text",regex:"\\s+"}].concat(function(e){return[{token:"string",regex:'"',next:e+"_qqstring"},{token:"string",regex:"'",next:e+"_qstring"}]}(t))}})),ace.define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle","ace/token_iterator"],(function(e,t,n){function r(e,t){var n=!0,r=e.type.split(".");return t.split(".").forEach((function(e){if(-1==r.indexOf(e))return n=!1,!1})),n}var o=e("../../lib/oop"),i=e("../behaviour").Behaviour,a=e("./cstyle").CstyleBehaviour,s=e("../../token_iterator").TokenIterator,u=function(){this.inherit(a,["string_dquotes"]),this.add("autoclosing","insertion",(function(e,t,n,o,i){if(">"==i){var a=n.getCursorPosition(),u=new s(o,a.row,a.column),l=u.getCurrentToken(),g=!1;if(l&&(r(l,"meta.tag")||r(l,"text")&&l.value.match("/")))g=!0;else do{l=u.stepBackward()}while(l&&(r(l,"string")||r(l,"keyword.operator")||r(l,"entity.attribute-name")||r(l,"text")));if(!l||!r(l,"meta.tag-name")||u.stepBackward().value.match("/"))return;var c=l.value;if(g)c=c.substring(0,a.column-l.start);return{text:"></"+c+">",selection:[1,1]}}})),this.add("autoindent","insertion",(function(e,t,n,r,o){if("\n"==o){var i=n.getCursorPosition();if("</"==r.doc.getLine(i.row).substring(i.column,i.column+2)){var a=this.$getIndent(r.doc.getLine(i.row))+r.getTabString();return{text:"\n"+a+"\n"+this.$getIndent(r.doc.getLine(i.row)),selection:[1,a.length,1,a.length]}}}}))};o.inherits(u,i),t.XmlBehaviour=u})),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],(function(e,t,n){var r=e("../../lib/oop"),o=e("../behaviour").Behaviour,i=e("../../token_iterator").TokenIterator,a=e("../../lib/lang"),s=["text","paren.rparen","punctuation.operator"],u=["text","paren.rparen","punctuation.operator","comment"],l=0,g=-1,c="",d=0,m=-1,f="",h="",x=function(){x.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new i(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",s)){var o=new i(t,n.row,n.column+1);if(!this.$matchTokenType(o.getCurrentToken()||"text",s))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",u)},x.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},x.recordAutoInsert=function(e,t,n){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isAutoInsertedClosing(r,o,c[0])||(l=0),g=r.row,c=n+o.substr(r.column),l++},x.recordMaybeInsert=function(e,t,n){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isMaybeInsertedClosing(r,o)||(d=0),m=r.row,f=o.substr(0,r.column)+n,h=o.substr(r.column),d++},x.isAutoInsertedClosing=function(e,t,n){return l>0&&e.row===g&&n===c[0]&&t.substr(e.column)===c},x.isMaybeInsertedClosing=function(e,t){return d>0&&e.row===m&&t.substr(e.column)===h&&t.substr(0,e.column)==f},x.popAutoInsertedClosing=function(){c=c.substr(1),l--},x.clearMaybeInsertedClosing=function(){d=0,m=-1},this.add("braces","insertion",(function(e,t,n,r,o){var i=n.getCursorPosition(),s=r.doc.getLine(i.row);if("{"==o){var u=n.getSelectionRange(),l=r.doc.getTextRange(u);if(""!==l&&"{"!==l&&n.getWrapBehavioursEnabled())return{text:"{"+l+"}",selection:!1};if(x.isSaneInsertion(n,r))return/[\]\}\)]/.test(s[i.column])?(x.recordAutoInsert(n,r,"}"),{text:"{}",selection:[1,1]}):(x.recordMaybeInsert(n,r,"{"),{text:"{",selection:[1,1]})}else if("}"==o){if("}"==s.substring(i.column,i.column+1))if(null!==r.$findOpeningBracket("}",{column:i.column+1,row:i.row})&&x.isAutoInsertedClosing(i,s,o))return x.popAutoInsertedClosing(),{text:"",selection:[1,1]}}else if("\n"==o||"\r\n"==o){var g="";if(x.isMaybeInsertedClosing(i,s)&&(g=a.stringRepeat("}",d),x.clearMaybeInsertedClosing()),"}"==s.substring(i.column,i.column+1)||""!==g){if(!r.findMatchingBracket({row:i.row,column:i.column},"}"))return null;var c=this.getNextLineIndent(e,s.substring(0,i.column),r.getTabString());return{text:"\n"+c+"\n"+this.$getIndent(s)+g,selection:[1,c.length,1,c.length]}}}})),this.add("braces","deletion",(function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"{"==i){if("}"==r.doc.getLine(o.start.row).substring(o.end.column,o.end.column+1))return o.end.column++,o;d--}})),this.add("parens","insertion",(function(e,t,n,r,o){if("("==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"("+a+")",selection:!1};if(x.isSaneInsertion(n,r))return x.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(")"==o){var s=n.getCursorPosition(),u=r.doc.getLine(s.row);if(")"==u.substring(s.column,s.column+1))if(null!==r.$findOpeningBracket(")",{column:s.column+1,row:s.row})&&x.isAutoInsertedClosing(s,u,o))return x.popAutoInsertedClosing(),{text:"",selection:[1,1]}}})),this.add("parens","deletion",(function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==i&&")"==r.doc.getLine(o.start.row).substring(o.start.column+1,o.start.column+2))return o.end.column++,o})),this.add("brackets","insertion",(function(e,t,n,r,o){if("["==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"["+a+"]",selection:!1};if(x.isSaneInsertion(n,r))return x.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if("]"==o){var s=n.getCursorPosition(),u=r.doc.getLine(s.row);if("]"==u.substring(s.column,s.column+1))if(null!==r.$findOpeningBracket("]",{column:s.column+1,row:s.row})&&x.isAutoInsertedClosing(s,u,o))return x.popAutoInsertedClosing(),{text:"",selection:[1,1]}}})),this.add("brackets","deletion",(function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"["==i&&"]"==r.doc.getLine(o.start.row).substring(o.start.column+1,o.start.column+2))return o.end.column++,o})),this.add("string_dquotes","insertion",(function(e,t,n,r,o){if('"'==o||"'"==o){var i=o,a=n.getSelectionRange(),s=r.doc.getTextRange(a);if(""!==s&&"'"!==s&&'"'!=s&&n.getWrapBehavioursEnabled())return{text:i+s+i,selection:!1};var u=n.getCursorPosition(),l=r.doc.getLine(u.row);if("\\"==l.substring(u.column-1,u.column))return null;for(var g,c=r.getTokens(a.start.row),d=0,m=-1,f=0;f<c.length&&("string"==(g=c[f]).type?m=-1:m<0&&(m=g.value.indexOf(i)),!(g.value.length+d>a.start.column));f++)d+=c[f].value.length;if(!g||m<0&&"comment"!==g.type&&("string"!==g.type||a.start.column!==g.value.length+d-1&&g.value.lastIndexOf(i)===g.value.length-1)){if(!x.isSaneInsertion(n,r))return;return{text:i+i,selection:[1,1]}}if(g&&"string"===g.type)if(l.substring(u.column,u.column+1)==i)return{text:"",selection:[1,1]}}})),this.add("string_dquotes","deletion",(function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==i||"'"==i)&&'"'==r.doc.getLine(o.start.row).substring(o.start.column+1,o.start.column+2))return o.end.column++,o}))};r.inherits(x,o),t.CstyleBehaviour=x})),ace.define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/range","ace/mode/folding/fold_mode","ace/token_iterator"],(function(e,t,n){var r=e("../../lib/oop"),o=e("../../lib/lang"),i=e("../../range").Range,a=e("./fold_mode").FoldMode,s=e("../../token_iterator").TokenIterator,u=t.FoldMode=function(e){a.call(this),this.voidElements=e||{}};r.inherits(u,a),function(){this.getFoldWidget=function(e,t,n){var r=this._getFirstTagInLine(e,n);return r.closing?"markbeginend"==t?"end":"":!r.tagName||this.voidElements[r.tagName.toLowerCase()]||r.selfClosing||-1!==r.value.indexOf("/"+r.tagName)?"":"start"},this._getFirstTagInLine=function(e,t){for(var n=e.getTokens(t),r="",i=0;i<n.length;i++){var a=n[i];0===a.type.indexOf("meta.tag")?r+=a.value:r+=o.stringRepeat(" ",a.value.length)}return this._parseTag(r)},this.tagRe=/^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/,this._parseTag=function(e){var t=this.tagRe.exec(e),n=this.tagRe.lastIndex||0;return this.tagRe.lastIndex=0,{value:e,match:t?t[2]:"",closing:!!t&&!!t[3],selfClosing:!!t&&(!!t[5]||"/>"==t[2]),tagName:t?t[4]:"",column:t[1]?n+t[1].length:n}},this._readTagForward=function(e){var t=e.getCurrentToken();if(!t)return null;var n="";do{if(0===t.type.indexOf("meta.tag")){if(!r)var r={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()};if(-1!==(n+=t.value).indexOf(">")){var o=this._parseTag(n);return o.start=r,o.end={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()+t.value.length},e.stepForward(),o}}}while(t=e.stepForward());return null},this._readTagBackward=function(e){var t=e.getCurrentToken();if(!t)return null;var n,r="";do{if(0===t.type.indexOf("meta.tag")&&(n||(n={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()+t.value.length}),-1!==(r=t.value+r).indexOf("<"))){var o=this._parseTag(r);return o.end=n,o.start={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()},e.stepBackward(),o}}while(t=e.stepBackward());return null},this._pop=function(e,t){for(;e.length;){var n=e[e.length-1];if(!t||n.tagName==t.tagName)return e.pop();if(this.voidElements[t.tagName])return;if(!this.voidElements[n.tagName])return null;e.pop()}},this.getFoldWidgetRange=function(e,t,n){var r=this._getFirstTagInLine(e,n);if(!r.match)return null;var o,a=[];if(r.closing||r.selfClosing){l=new s(e,n,r.column+r.match.length);for(var u={row:n,column:r.column};o=this._readTagBackward(l);)if(o.selfClosing){if(!a.length)return o.start.column+=o.tagName.length+2,o.end.column-=2,i.fromPoints(o.start,o.end)}else if(o.closing)a.push(o);else if(this._pop(a,o),0==a.length)return o.start.column+=o.tagName.length+2,i.fromPoints(o.start,u)}else for(var l=new s(e,n,r.column),g={row:n,column:r.column+r.tagName.length+2};o=this._readTagForward(l);)if(o.selfClosing){if(!a.length)return o.start.column+=o.tagName.length+2,o.end.column-=2,i.fromPoints(o.start,o.end)}else if(o.closing){if(this._pop(a,o),0==a.length)return i.fromPoints(g,o.start)}else a.push(o)}}.call(u.prototype)}));

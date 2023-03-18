ace.define("ace/mode/r",["require","exports","module","ace/range","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/text_highlight_rules","ace/mode/r_highlight_rules","ace/mode/matching_brace_outdent","ace/unicode"],(function(e,t,n){var r=e("../range").Range,o=e("../lib/oop"),a=e("./text").Mode,i=e("../tokenizer").Tokenizer,s=(e("./text_highlight_rules").TextHighlightRules,e("./r_highlight_rules").RHighlightRules),g=e("./matching_brace_outdent").MatchingBraceOutdent,c=e("../unicode"),l=function(){this.$tokenizer=new i((new s).getRules()),this.$outdent=new g};o.inherits(l,a),function(){this.tokenRe=new RegExp("^["+c.packages.L+c.packages.Mn+c.packages.Mc+c.packages.Nd+c.packages.Pc+"._]+","g"),this.nonTokenRe=new RegExp("^(?:[^"+c.packages.L+c.packages.Mn+c.packages.Mc+c.packages.Nd+c.packages.Pc+"._]|s])+","g"),this.$complements={"(":")","[":"]",'"':'"',"'":"'","{":"}"},this.$reOpen=/^[(["'{]$/,this.$reClose=/^[)\]"'}]$/,this.getNextLineIndent=function(e,t,n,r,o){return this.codeModel.getNextLineIndent(o,t,e,n,r)},this.allowAutoInsert=this.smartAllowAutoInsert,this.checkOutdent=function(e,t,n){return!!/^\s+$/.test(t)&&/^\s*[\{\}\)]/.test(n)},this.getIndentForOpenBrace=function(e){return this.codeModel.getIndentForOpenBrace(e)},this.autoOutdent=function(e,t,n){if(0==n)return 0;var o=t.getLine(n),a=o.match(/^(\s*[\}\)])/);if(a){var i=a[1].length,s=t.findMatchingBracket({row:n,column:i});if(!s||s.row==n)return 0;var g=this.codeModel.getIndentForOpenBrace(s);t.replace(new r(n,0,n,i-1),g)}if(a=o.match(/^(\s*\{)/)){i=a[1].length,g=this.codeModel.getBraceIndent(n-1);t.replace(new r(n,0,n,i-1),g)}},this.$getIndent=function(e){var t=e.match(/^(\s+)/);return t?t[1]:""},this.transformAction=function(e,t,n,r,o){if("insertion"===t&&"\n"===o){var a=n.getSelectionRange().start,i=/^((\s*#+')\s*)/.exec(r.doc.getLine(a.row));if(i&&n.getSelectionRange().start.column>=i[2].length)return{text:"\n"+i[1]}}return!1}}.call(l.prototype),t.Mode=l})),ace.define("ace/mode/r_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules","ace/mode/tex_highlight_rules"],(function(e,t,n){var r=e("../lib/oop"),o=e("../lib/lang"),a=e("./text_highlight_rules").TextHighlightRules,i=e("./tex_highlight_rules").TexHighlightRules,s=function(){var e=o.arrayToMap("function|if|in|break|next|repeat|else|for|return|switch|while|try|tryCatch|stop|warning|require|library|attach|detach|source|setMethod|setGeneric|setGroupGeneric|setClass".split("|")),t=o.arrayToMap("NULL|NA|TRUE|FALSE|T|F|Inf|NaN|NA_integer_|NA_real_|NA_character_|NA_complex_".split("|"));this.$rules={start:[{token:"comment.sectionhead",regex:"#+(?!').*(?:----|====|####)\\s*$"},{token:"comment",regex:"#+'",next:"rd-start"},{token:"comment",regex:"#.*$"},{token:"string",regex:'["]',next:"qqstring"},{token:"string",regex:"[']",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+[Li]?\\b"},{token:"constant.numeric",regex:"\\d+L\\b"},{token:"constant.numeric",regex:"\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b"},{token:"constant.numeric",regex:"\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b"},{token:"constant.language.boolean",regex:"(?:TRUE|FALSE|T|F)\\b"},{token:"identifier",regex:"`.*?`"},{token:function(n){return e[n]?"keyword":t[n]?"constant.language":"..."==n||n.match(/^\.\.\d+$/)?"variable.language":"identifier"},regex:"[a-zA-Z.][a-zA-Z0-9._]*\\b"},{token:"keyword.operator",regex:"%%|>=|<=|==|!=|\\->|<\\-|\\|\\||&&|=|\\+|\\-|\\*|/|\\^|>|<|!|&|\\||~|\\$|:"},{token:"keyword.operator",regex:"%.*?%"},{token:"paren.keyword.operator",regex:"[[({]"},{token:"paren.keyword.operator",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",regex:".+"}]};for(var n=new i("comment").getRules(),r=0;r<n.start.length;r++)n.start[r].token+=".virtual-comment";this.addRules(n,"rd-"),this.$rules["rd-start"].unshift({token:"text",regex:"^",next:"start"}),this.$rules["rd-start"].unshift({token:"keyword",regex:"@(?!@)[^ ]*"}),this.$rules["rd-start"].unshift({token:"comment",regex:"@@"}),this.$rules["rd-start"].push({token:"comment",regex:"[^%\\\\[({\\])}]+"})};r.inherits(s,a),t.RHighlightRules=s})),ace.define("ace/mode/tex_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],(function(e,t,n){var r=e("../lib/oop"),o=(e("../lib/lang"),e("./text_highlight_rules").TextHighlightRules),a=function(e){e||(e="text"),this.$rules={start:[{token:"comment",regex:"%.*$"},{token:e,regex:"\\\\[$&%#\\{\\}]"},{token:"keyword",regex:"\\\\(?:documentclass|usepackage|newcounter|setcounter|addtocounter|value|arabic|stepcounter|newenvironment|renewenvironment|ref|vref|eqref|pageref|label|cite[a-zA-Z]*|tag|begin|end|bibitem)\\b",next:"nospell"},{token:"keyword",regex:"\\\\(?:[a-zA-z0-9]+|[^a-zA-z0-9])"},{token:"paren.keyword.operator",regex:"[[({]"},{token:"paren.keyword.operator",regex:"[\\])}]"},{token:e,regex:"\\s+"}],nospell:[{token:"comment",regex:"%.*$",next:"start"},{token:"nospell."+e,regex:"\\\\[$&%#\\{\\}]"},{token:"keyword",regex:"\\\\(?:documentclass|usepackage|newcounter|setcounter|addtocounter|value|arabic|stepcounter|newenvironment|renewenvironment|ref|vref|eqref|pageref|label|cite[a-zA-Z]*|tag|begin|end|bibitem)\\b"},{token:"keyword",regex:"\\\\(?:[a-zA-z0-9]+|[^a-zA-z0-9])",next:"start"},{token:"paren.keyword.operator",regex:"[[({]"},{token:"paren.keyword.operator",regex:"[\\])]"},{token:"paren.keyword.operator",regex:"}",next:"start"},{token:"nospell."+e,regex:"\\s+"},{token:"nospell."+e,regex:"\\w+"}]}};r.inherits(a,o),t.TexHighlightRules=a})),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],(function(e,t,n){var r=e("../range").Range,o=function(){};(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var n=e.getLine(t).match(/^(\s*\})/);if(!n)return 0;var o=n[1].length,a=e.findMatchingBracket({row:t,column:o});if(!a||a.row==t)return 0;var i=this.$getIndent(e.getLine(a.row));e.replace(new r(t,0,t,o-1),i)},this.$getIndent=function(e){var t=e.match(/^(\s+)/);return t?t[1]:""}}).call(o.prototype),t.MatchingBraceOutdent=o}));
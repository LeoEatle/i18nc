module.exports = I18N;
function I18N(d,f,k){
	var a=I18N;var p=a.$||(a.$={});var e=(function(){return global.__i18n_lan__})(p);if(!f||!f.join){k=f;f=[]}if(e&&e.split){var g,b,h,c;if(a.L!=e){a.K='i18n_handler_example';a.V='b';a.D={
		"en-US": {
			"DEFAULTS": {
				"简体": "simplified",
				"空白": [],
				"无": "",
				"%s美好%s生活": "%sgood%s life",
				"%{中文}词典": "%{Chinese} dictionary"
			},
			"SUBTYPES": {
				"subtype": {
					"简体": "simplified subtype"
				}
			}
		},
		"zh-TW": {
			"DEFAULTS": {
				"简体": "簡體",
				"无": "無"
			}
		}
	};
	var o=a.D;var l=e.split(',');g=a.M=[];for(b=0,h=l.length;b<h;b++){c=o[l[b]];if(c)g.push(c)}a.L=e}g=a.M;var m,i,j;for(b=0,h=g.length;b<h;b++){c=g[b];m=k&&c.SUBTYPES&&c.SUBTYPES[k];j=m&&m[d];if(j)break;if(!i)i=c.DEFAULTS&&c.DEFAULTS[d]}if(j)d=j;else if(i)d=i}if(!f.length)return''+d;var n=0;return(''+d).replace(/(%s)|(%\{(.+?)\})/g,function(b){var a=f[n++];return a===undefined||a===null?b:a})
}
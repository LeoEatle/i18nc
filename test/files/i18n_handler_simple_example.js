module.exports = I18N;
function I18N(d,a){
	var b=I18N;b.__FILE_KEY__='i18n_handler_example';b.__FUNCTION_VERSION__='5';if(!a||!a.join)a=[];var c=0;return(''+d).replace(/(%s)|(%\{(.+?)\})/g,function(){var b=a[c++];return b===undefined||b===null?'':b})
}
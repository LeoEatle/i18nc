module.exports = I18N;
function I18N(msg, tpldata)
{
	if (!tpldata || !tpldata.join) return ''+msg;

	var self = I18N;

	
	
	self.K = 'i18n_handler_example';
	self.V = 'b';

	var replace_index = 0;
	return (''+msg).replace(/(%s)|(%\{(.+?)\})/g, function(all)
	{
		var newVal = tpldata[replace_index++];
		return newVal === undefined || newVal === null ? all : newVal;
	});
}
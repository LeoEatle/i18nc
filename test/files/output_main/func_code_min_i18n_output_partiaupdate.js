function I18N(msg, subtype) {
	var self = I18N;

	var GLOBAL = self.__GLOBAL__ || (self.__GLOBAL__ = typeof window == "object" ? window : typeof global == "object" && global) || {};
	var LAN = GLOBAL.__i18n_lan__;

	if (!LAN) return msg;

	if (self.__TRANSLATE_LAN__ != LAN) {
		self.__TRANSLATE_LAN__ = LAN;
		self.__FILE_KEY__ = "i18n_handler_example";
		self.__FUNCTION_VERSION__ = "5";
		self.__TRANSLATE_JSON__ = {'en-US':{'DEFAULTS':{'中文0':'indb <thisfile> db0','中文1':'in_file custom1','中文2':'in_file zh2_db','中文5_empty':[],'中文6_empty':'in_file 4','中文db *':'indb *'}},'zh-TW':{'DEFAULTS':{'中文0':'中文0 in tw'}}};

		var __TRANSLATE_JSON__ = self.__TRANSLATE_JSON__;
		var lanArr = self.__TRANSLATE_LAN_JSON__ = [];
		if (LAN && LAN.split) {
			var lanKeys = LAN.split(',');
			for(var i = 0, len = lanKeys.length; i < len; i++) {
				var lanItem = __TRANSLATE_JSON__[lanKeys[i]];
				if (lanItem) lanArr.push(lanItem);
			}
		}
	}

	var lanArr = self.__TRANSLATE_LAN_JSON__,
		resultDefault, resultSubject;
	for(var i = 0, len = lanArr.length; i < len; i++) {
		var lanItem = lanArr[i];
		var subtypeJSON = subtype && lanItem.SUBTYPES && lanItem.SUBTYPES[subtype];
		resultSubject = subtypeJSON && subtypeJSON[msg];
		if (resultSubject) break;
		if (!resultDefault)
			resultDefault = lanItem.DEFAULTS && lanItem.DEFAULTS[msg];
	}

	var result = resultSubject || resultDefault || msg;
	return typeof result == 'string' ? result : ''+result;
}
var codeJSON={
	"DEFAULTS": [
		I18N('中文0'),
		I18N('中文1'),
		I18N('中文2'),
		I18N('中文5_empty'),
		I18N('中文6_empty'),
		I18N('中文db *')
	]
}
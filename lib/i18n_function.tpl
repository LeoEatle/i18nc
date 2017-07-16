function {{@handlerName}}(msg, subtype, plusExample)
{
	/**
	 * @param  {String} msg          translateKey
	 * @param  {String} subtype      Indicates a special treatment
	 * 									or a continuous relationship
	 * @param  {String} plusExample  In the case of professional translation,
	 * 									the reference content is added after the content is translated.
	 * 									It is usefull for i18nc tool.
	 *
	 *
	 * [Warn]
	 * I18nc Tool collects `{{@handlerName}}` callee arguments for professional translation.
	 * Use simple string arguments when call `{{@handlerName}}`.
	 * Variables and Operators are not supported.
	 */



	var LAN = {{@acceptLanguageCode}};
	if (!LAN) return msg;

	var self = {{@handlerName}};
	if (self.__TRANSLATE_LAN__ != LAN)
	{
		/* Do not modify this key value. */
		var FILE_KEY = "{{FILE_KEY}}";
		var FUNCTION_VERSION = 1;

		/**
		 * Do not modify the values.
		 *
		 * If you really need to update,
		 * please refer to the following method to modify.
		 * @see https://github.com/Bacra/node-i18nc/wiki/How-to-modify-translate-data-in-JS-file
		 *
		 * @example
		 * {
		 * 	normail_key: dbTranlateResult,
		 * 	use_modified_key: codeModifieResult || prevDBTranlateResult,
		 * 	use_newdb_key: newDBTranlateResult || codeModifieResult || prevDBTranlateResult
		 * }
		 *
		 * @tips Use an empty array to represent an empty string.
		 * @example
		 * {
		 * 	key: [] || 'The translation is empty.'
		 * }
		 */
		var TRANSLATE_DEFAULT_JSON = {{@TRANSLATE_DEFAULT_JSON}};
		var TRANSLATE_SUBTYPE_JSON = {{@TRANSLATE_SUBTYPE_JSON}};

		self.__TRANSLATE_LAN__ = LAN;
		self.__TRANSLATE_DEFAULT_JSON__ = TRANSLATE_DEFAULT_JSON && TRANSLATE_DEFAULT_JSON[LAN];
		self.__TRANSLATE_SUBTYPE_JSON__ = TRANSLATE_SUBTYPE_JSON && TRANSLATE_SUBTYPE_JSON[LAN];
	}

	var subtypeJSON = subtype && self.__TRANSLATE_SUBTYPE_JSON__;
	var defaultJSON = self.__TRANSLATE_DEFAULT_JSON__;

	var result = (subtypeJSON && subtypeJSON[subtype] && subtypeJSON[subtype][msg])
		|| (defaultJSON && defaultJSON[msg])
		|| msg;


	// Taking into account the use of the array that is empty,
	// so the need for mandatory conversion of the results data.
	return ''+result;
}
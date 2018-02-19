var fs					= require('fs');
var expect				= require('expect.js');
var i18nc				= require('../');
var dbTranslateWords	= require('./example/translate_words_db');
var autoTestUtils		= require('./auto_test_utils');
var requireAfterWrite	= autoTestUtils.requireAfterWrite('output_main');

describe('#main', function()
{
	describe('#widthdb funcData', function()
	{
		var exampleCode = require('./files/i18n_handler_example.js');
		exampleCode = 'module.exports = I18N;\n'+exampleCode.toString();

		it('#nocode', function()
		{
			var info = i18nc(exampleCode,
			{
				dbTranslateWords: dbTranslateWords
			});

			var outputJSON = requireAfterWrite('i18n_handler_example_i18nc_nocode_output.json', autoTestUtils.JsonOfI18ncRet(info));
			var otherCode = requireAfterWrite('i18n_handler_example_i18nc_nocode_output.js', info.code, {readMode: 'string'});

			expect(autoTestUtils.JsonOfI18ncRet(info)).to.eql(outputJSON);
			expect(autoTestUtils.code2arr(info.code)).to.eql(autoTestUtils.code2arr(otherCode.toString()));
		});

		it('#withcode', function()
		{
			var funcInfo = require('./files/i18n_handler_example_output.json');
			var codeData =
			{
				DEFAULTS: Object.keys(funcInfo.__TRANSLATE_JSON__['en-US'].DEFAULTS),
				SUBTYPES:
				{
					subtype: Object.keys(funcInfo.__TRANSLATE_JSON__['en-US'].SUBTYPES.subtype)
				}
			};

			codeData = '\nvar codeJSON = '+JSON.stringify(codeData, null, '\t');

			var info = i18nc(exampleCode+codeData,
			{
				dbTranslateWords: dbTranslateWords
			});

			var outputJSON = requireAfterWrite('i18n_handler_example_i18nc_withcode_output.json', autoTestUtils.JsonOfI18ncRet(info));
			var otherCode = requireAfterWrite('i18n_handler_example_i18nc_withcode_output.js', info.code, {readMode: 'string'});

			expect(autoTestUtils.JsonOfI18ncRet(info)).to.eql(outputJSON);
			expect(autoTestUtils.code2arr(info.code)).to.eql(autoTestUtils.code2arr(otherCode.toString()));
		});
	});


	describe('#insert when noi18n', function()
	{
		it('#noI18N', function()
		{
			var exampleCode = require('./files/casefile_main/func_code_noi18n').toString();
			var info = i18nc(exampleCode);

			var otherCode = requireAfterWrite('func_code_noi18n_output.js', info.code, {readMode: 'string'});

			expect(autoTestUtils.code2arr(info.code)).to.eql(autoTestUtils.code2arr(otherCode.toString()));
		});

		it('#noI18N noclosure', function()
		{
			var exampleCode = require('./files/casefile_main/func_code_noi18n').toString();
			var info = i18nc(exampleCode, {isClosureWhenInsertedHead: false});

			var otherCode = requireAfterWrite('func_code_noi18n_output_noclosure.js', info.code, {readMode: 'string'});

			expect(autoTestUtils.code2arr(info.code)).to.eql(autoTestUtils.code2arr(otherCode.toString()));
		});

		it('#define', function()
		{
			var exampleCode = require('./files/casefile_main/func_code_noi18n_define').toString();
			var info = i18nc(exampleCode);

			var otherCode = requireAfterWrite('func_code_noi18n_define_output.js', info.code, {readMode: 'string'});

			expect(autoTestUtils.code2arr(info.code)).to.eql(autoTestUtils.code2arr(otherCode.toString()));
		});

		it('#define not_define', function()
		{
			var exampleCode = require('./files/casefile_main/func_code_noi18n_define').toString();
			var info = i18nc(exampleCode,
				{
					isInsertToDefineHalder: false
				});

			var otherCode = requireAfterWrite('func_code_noi18n_define_output_notdefine.js', info.code, {readMode: 'string'});

			expect(autoTestUtils.code2arr(info.code)).to.eql(autoTestUtils.code2arr(otherCode.toString()));
		});
	});

	describe('#simple i18n', function()
	{
		it('#one i18n', function()
		{
			var exampleCode = require('./files/casefile_main/func_code_i18n').toString();
			var info = i18nc(exampleCode);

			var otherCode = requireAfterWrite('func_code_i18n_output.js', info.code, {readMode: 'string'});

			expect(autoTestUtils.code2arr(info.code)).to.eql(autoTestUtils.code2arr(otherCode.toString()));
		});

		it('#define and scope', function()
		{
			var exampleCode = require('./files/casefile_main/func_code_i18n_define').toString();
			var info = i18nc(exampleCode,
				{
					dbTranslateWords:
					{
						zh:
						{
							'*':
							{
								DEFAULTS:
								{
									'global 中文1': 'global 中文1',
									'define1 中文': 'define1 中文',
									'define2 中文': 'define2 中文',
									'global 中文2': 'global 中文2'
								}
							}
						}
					}
				});

			var otherCode = requireAfterWrite('func_code_i18n_define_output.js', info.code, {readMode: 'string'});

			expect(autoTestUtils.code2arr(info.code)).to.eql(autoTestUtils.code2arr(otherCode.toString()));
		});


		it('#no words', function()
		{
			var exampleCode = require('./files/casefile_main/func_code_i18n_nowords').toString();
			var info = i18nc(exampleCode);

			var otherCode = requireAfterWrite('func_code_i18n_nowords_output.js', info.code, {readMode: 'string'});

			expect(autoTestUtils.code2arr(info.code)).to.eql(autoTestUtils.code2arr(otherCode.toString()));
		});
	});

	describe('#no db translate', function()
	{
		var code = 'console.log("不可能存在的中文翻译词组");';

		it('#noanything', function()
		{
			var info = i18nc(code);

			var otherCode = requireAfterWrite('func_code_no_db.js', info.code, {readMode: 'string'});

			expect(autoTestUtils.code2arr(info.code)).to.eql(autoTestUtils.code2arr(otherCode.toString()));
		});

		it('#only lan', function()
		{
			var info = i18nc(code,
				{
					dbTranslateWords:
					{
						en: {DEFAULTS:{}}
					}
				});

			var otherCode = requireAfterWrite('func_code_no_db_only_lan.js', info.code, {readMode: 'string'});

			expect(autoTestUtils.code2arr(info.code)).to.eql(autoTestUtils.code2arr(otherCode.toString()));
		});

		it('#other_db', function()
		{
			var info = i18nc(code,
				{
					dbTranslateWords:
					{
						en: {DEFAULTS: {'嘿嘿': 'hihi'}}
					}
				});

			var otherCode = requireAfterWrite('func_code_no_db_other_db.js', info.code, {readMode: 'string'});

			expect(autoTestUtils.code2arr(info.code)).to.eql(autoTestUtils.code2arr(otherCode.toString()));
		});

		it('#func translate words', function()
		{
			var code = function code()
			{
				console.log("不可能存在的中文翻译词组");
				function I18N()
				{
					var __FILE_KEY__ = "default_file_key";
					var __FUNCTION_VERSION__ = 2;
					var __TRANSLATE_JSON__ =
					{
						en: {DEFAULTS:{}}
					};
				}
			};
			var info = i18nc(code.toString());

			var otherCode = requireAfterWrite('func_code_no_db_has_translate_json.js', info.code, {readMode: 'string'});

			expect(autoTestUtils.code2arr(info.code)).to.eql(autoTestUtils.code2arr(otherCode.toString()));
		})
	});

	describe('#core style', function()
	{
		it('#width head / end', function()
		{
			var info = i18nc('/* begin */\ndefine(function(){console.log("中文")})\n/* end */\n');

			var otherCode = requireAfterWrite('func_code_head_has_content_output.js', info.code, {readMode: 'string'});

			expect(autoTestUtils.code2arr(info.code)).to.eql(autoTestUtils.code2arr(otherCode.toString()));
		});
	});


	describe('#result', function()
	{
		it('#dirtyAsts', function()
		{
			console.log('@todo');
		});
	});


});

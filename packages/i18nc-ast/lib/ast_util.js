'use strict';

const babelParse = require('@babel/parser').parse;
const babelGenerate = require('@babel/generator').default;
const astTpl = require('./ast_tpl');
const config = require('./config');
const debug = require('debug')('i18nc-ast:ast_util');
const ArrayPush = Array.prototype.push;

exports.setAstFlag = function setAstFlag(ast, flag) {
	if (!flag || !ast) return;

	const flag2 = ast.__i18n_flag__ || 0;
	ast.__i18n_flag__ = flag2 | flag;
};

exports.checkAstFlag = function checkAstFlag(ast, flag) {
	return ast && flag && ast.__i18n_flag__ && ast.__i18n_flag__ & flag;
};

exports.parse = function parse(code) {
	return babelParse(code, config.esparseOptions).program;
};

exports.mincode = function mincode(code) {
	return babelGenerate(exports.parse(code), config.escodegenMinOptions).code;
};

exports.tocode = function tocode(ast) {
	return babelGenerate(ast, config.escodegenOptions).code;
};

exports.isLiteral = function isLiteral(ast) {
	// @see https://babeljs.io/docs/en/babel-parser#output
	if (ast && ast.type) {
		return ast.type == 'Literal' || ast.type == 'StringLiteral';
	}
};

exports.codeIndent = function codeIndent(ast, code) {
	const indent = code
		.slice(0, ast.range[0])
		.split('\n')
		.pop()
		.match(/^\s*/)[0];

	return indent || '';
};

exports.ast2constVal = function ast2constVal(ast) {
	if (exports.isLiteral(ast)) return ast.value;
	if (ast.type == 'Identifier') {
		switch (ast.name) {
			case 'undefined':
				return undefined;
			case 'NaN':
				return NaN;
			case 'Infinity':
				return Infinity;
			default:
				debug('unknow Infinity: %o', ast);
				throw new Error('UNKNOW INFINITY');
		}
	}
};

exports.ast2constKey = function(ast) {
	if (exports.isLiteral(ast)) return ast.value;
	if (ast.type == 'Identifier') return ast.name;
};

exports.constVal2ast = function constVal2ast(val) {
	if (val === undefined) {
		return {
			type: 'Identifier',
			name: 'undefined'
		};
	} else if (val === null) {
		return {
			type: 'Literal',
			value: null
		};
	} else if (val === Infinity) {
		return {
			type: 'Identifier',
			name: 'Infinity'
		};
	} else if (!val && isNaN(val)) {
		return {
			type: 'Identifier',
			name: 'NaN'
		};
	} else {
		return {
			type: 'Literal',
			value: val
		};
	}
};

// 获取ast的位置
// 一般用于日志输出
exports.getAstLocStr = function getAstLocStr(ast) {
	if (ast && ast.loc)
		return 'Loc:' + ast.loc.start.line + ',' + ast.loc.start.column;
	else return '';
};

// 将astArr结果，加上“+”运算
exports.asts2plusExpression = function asts2plusExpression(asts) {
	const len = asts && asts.length;
	if (!len) return;
	if (len == 1) return asts[0];

	let result = asts[0];
	for (let i = 1; i < len; i++) {
		let item = asts[i];
		// 遇到数组，就稍微递归一下
		if (Array.isArray(item)) {
			item = exports.asts2plusExpression(item);
		}

		result = astTpl.BinaryExpression(result, item);
	}

	return result;
};

exports.astMemberExpression2arr = function astMemberExpression2arr(ast) {
	const result = [];

	if (ast.object.type == 'MemberExpression')
		ArrayPush.apply(result, exports.astMemberExpression2arr(ast.object));
	else result.push(exports.ast2constKey(ast.object));

	result.push(exports.ast2constKey(ast.property));

	return result;
};

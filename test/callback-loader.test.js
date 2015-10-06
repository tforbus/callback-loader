var should = require("should");
var path = require("path");
var loader = require("../");

describe("loader", function() {

	var options = {
		multBy2: function(num) {
			return num * 2;
		},
		mult: function(num1, num2) {
			return num1 * num2;
		},
		concat: function(str1, str2) {
			return '"' + str1 + str2 + '"';
		}
	}

	it("should process all functions without query", function() {
		loader.call({
				options: options,
				query: ''
			}, 'var a = multBy2(10); var b = mult(10, 3);')
			.should.be.eql(
				'var a = 20; var b = 30;'
			);
	});

	it("should process one function with one parameter", function() {
		loader.call({
				options: options,
				query: '?multBy2'
			}, 'var a = multBy2(10); var b = mult(10, 3);')
			.should.be.eql(
				'var a = 20; var b = mult(10, 3);'
			);
	});

	it("should process multiple function with multiple parameters", function() {
		loader.call({
				options: options,
				query: '?multBy2&mult'
			}, 'var a = multBy2(10); var b = mult(10, 3);')
			.should.be.eql(
				'var a = 20; var b = 30;'
			);
	});

	it("should process function with float args", function() {
		loader.call({
				options: options,
				query: '?multBy2'
			}, 'var a = multBy2(1.2);')
			.should.be.eql(
				'var a = 2.4;'
			);
	});

	it("should process function with string args", function() {
		loader.call({
				options: options,
				query: ''
			}, 'var a = concat("foo", "bar");')
			.should.be.eql(
				'var a = "foobar";'
			);
	});
	
});
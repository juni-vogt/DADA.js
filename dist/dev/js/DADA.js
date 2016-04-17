/*!
 * DADA.js (github.com/matthias-vogt/DADA.js)
 *
 * Copyright (c) 2016 Matthias Vogt
 * Released under the WTFPL
 */

/*!
 *  Remixes jquery-boilerplate - v4.1.0
 *  MIT License © Zeno Rocha
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function($, window, document, undefined) {

	"use strict";

	// undefined is used here as the undefined global variable in ECMAScript 3 is
	// mutable (ie. it can be changed by someone else). undefined isn't really being
	// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
	// can no longer be modified.

	// window and document are passed through as local variables rather than global
	// as this (slightly) quickens the resolution process and can be more efficiently
	// minified (especially when both are regularly referenced in your plugin).

	// Create the defaults once
	var pluginName = "DADA",
		defaults = {

			// content
			phrases: [
				// possible random phrases for dialogs
				"DADA is DADA is DADA"
			],
			icons: [
				// possible random icons for dialogs
				"data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
			],
			sounds: {
				// possible random sounds for dialogs
				random: [],
				special: {
					// possible random sounds for when dialogs close
					close: [],
					// possible random sounds for the first modal
					start: []
				}
			},

			// callbacks
			on: {
				// on first modal
				start: function() {},
				// on end
				end: function() {},
				// when any OK button is clicked
				ok: function() {},
				// when any Cancel button is clicked
				cancel: function() {}
			},

			// timing
			time: 20000, // total time the virus should run
			baseTimePerDialog: 1500, // time before a new dialog pops up
			waitTimeAfterFirstDialog: 8000, // time to wait after the first pop up

			// window markup
			windowTemplate: '' + // template for the window's markup
				'<div class="window">' +
				'    <div class="bar">' +
				'        {{title}}' +
				'        <button class="close js-cancel">×</button>' +
				'    </div>' +
				'    <div class="content">' +
				'        <img class="icon" alt="DADA Icon">' +
				'        <div class="text">' +
				'            <br>' +
				'            <button class="js-ok">{{ok}}</button>' +
				'            <button class="js-cancel">{{cancel}}</button>' +
				'        </div>' +
				'    </div>' +
				'</div>',
			words: { // context for the window's template
				title: "DADA-Error!!1",
				ok: "OK",
				cancel: "Cancel"
			},

		};


	$[pluginName] = function(options) {
		var instance = new Plugin(options);

		instance.prototype = $.extend(
			instance.prototype,
			getExtendedPrototype(instance._settings)
		);

		instance.prototype.init();
	};

	function Plugin(options) {
		this._defaults = defaults;
		this._options = pluginName;
		this._settings = $.extend(true, {}, defaults, options);

		this._name = pluginName;
	}


	function getExtendedPrototype(settings) {
		return {
			get settings() {
				return settings; // communication to Plugin.prototype from getters
			},

			get noOfPhrases() {
				delete this.noOfPhrases;
				return this.noOfPhrases = Math.floor(
					(this.settings.time - this.settings.waitTimeAfterFirstDialog) /
					this.settings.baseTimePerDialog
				) + 1; // first dialog which takes 10s
			},

			noOfWindowAnimations: 3,

			init: function() {

				var proto = this; // access Plugin prototype in functions

				this.initVector();

				this.$DADA = $("<div/>").addClass('DADA');

				this.$DADA.on(
					"click", ".window button.js-cancel, .window button.js-ok",
					function() {

						var $win = $(this).parents(".window");
						$win.css("animation", "none");
						setTimeout(function() {
							$win.addClass("is-clicked");
						}, 20); // windows 98 simulator
						proto.playRandomSound(proto.$audios.special.close);
					});

				this.$DADA.on(
					"click", ".window .text button.js-ok",
					this.settings.on.ok
				);
				this.$DADA.on(
					"click", ".window .text button.js-cancel",
					this.settings.on.cancel
				);

				// Append everything to DADA element
				for (var i = 0; i <= this.noOfPhrases; i++) {
					this.$DADA.append(this.getRandWindow());
				}

				$("body").append(this.$DADA);

				this.doDADA();
				this.initEvade();

				this.settings.on.start();
			},

			get $window() {
				delete this.$window;
				return this.$window = $(this.generateTemplate(
					this.settings.windowTemplate
				)(this.settings.words));
			},

			get $audios() {
				delete this.$audios;
				return this.$audios = this.deepMapMulti(function(soundURIs, key) {
						var locAudios = [];
						for (var i = 0; i < soundURIs.length; i++) {
							locAudios.push($("<audio/>").attr("src", soundURIs[i]));
						}
						return locAudios;
					},
					this.settings.sounds
				);
			},

			getRandFromArray: function(arr) {
				return arr[Math.floor(Math.random() * arr.length)];
			},

			getRandWindow: function() {
				var $win = this.$window.clone();

				$win.find(".icon").attr(
					"src", this.getRandFromArray(this.settings.icons)
				);
				$win.find(".text").prepend(this.getRandFromArray(this.settings.phrases));
				$win.addClass(
					"animation-" + (Math.ceil(Math.random() * this.noOfWindowAnimations))
				);

				var $appendedWin =
					$win.clone().css("display", "inline-block").appendTo($("body")),
					dimensions = {
						height: $appendedWin.height(),
						width: $appendedWin.width(),
					};
				$appendedWin.remove();

				$win.css({
					top: Math.random() * ($(window).height() - dimensions.height - 100),
					left: Math.random() * ($(window).width() - dimensions.width - 100)
				});

				return $win;
			},

			playRandomSound: function(from) {
				$(this.getRandFromArray(from)).trigger('play');
			},

			doDADA: function() {
				var proto = this;

				for (var i = 0; i < this.noOfPhrases; i++) {
					(function(i) {

						var waitTime =
							(i !== 0 ? proto.settings.waitTimeAfterFirstDialog : 0) +
							(i - 1) * proto.settings.baseTimePerDialog +
							Math.random() * .5;


						setTimeout(function() {
							proto.$DADA.children(".window")
								.filter(":not(.visible):first")
								.addClass("visible");

							proto.playRandomSound(
								i === 0 ?
								proto.$audios.special.start :
								proto.$audios.random
							);
						}, waitTime);
					}(i));
				}

				// on end
				setTimeout(function() {
					proto.playRandomSound(proto.$audios.special.close);

					proto.$DADA.addClass("end");
					proto.settings.on.end();
				}, this.settings.time);

				this.$DADA.addClass("start");
			},

			initEvade: function() {
				var proto = this;

				// make windows evade cursor
				var $windows = $(".window");
				this.$DADA.on("mousemove", function(e) {
					$windows.each(function(index, el) {
						proto.evade(e, $(el));
					});
				});
			},


			//
			// TOOLS
			//

			// Evasion stuff
			//stackoverflow.com/a/10058366/1974674

			initVector: function() {
				Math.Vector = function(x, y) {
					this.x = x;
					this.y = y;
				};
				Math.Vector.prototype = {
					clone: function() {
						return new Math.Vector(this.x, this.y);
					},
					negate: function() {
						this.x = -this.x;
						this.y = -this.y;
						return this;
					},
					neg: function() {
						return this.clone().negate();
					},
					addeq: function(v) {
						this.x += v.x;
						this.y += v.y;
						return this;
					},
					subeq: function(v) {
						return this.addeq(v.neg());
					},
					add: function(v) {
						return this.clone().addeq(v);
					},
					sub: function(v) {
						return this.clone().subeq(v);
					},
					multeq: function(c) {
						this.x *= c;
						this.y *= c;
						return this;
					},
					diveq: function(c) {
						this.x /= c;
						this.y /= c;
						return this;
					},
					mult: function(c) {
						return this.clone().multeq(c);
					},
					div: function(c) {
						return this.clone().diveq(c);
					},

					dot: function(v) {
						return this.x * v.x + this.y * v.y;
					},
					length: function() {
						return Math.sqrt(this.dot(this));
					},
					normal: function() {
						return this.clone().diveq(this.length());
					}
				};
			},

			evade: function(evt, $el) {
				if ($el === undefined) $el = $(this);

				var corner = $el.offset(),
					center = {
						x: corner.left + $el.outerWidth() / 2,
						y: corner.top + $el.outerHeight() / 2
					},
					dist = new Math.Vector(center.x - evt.pageX, center.y - evt.pageY),
					closest = $el.outerWidth() / 2.25;

				// proximity test
				if (dist.length() >= closest)
					return;

				// calculate new position
				var delta = dist.normal().multeq(closest).sub(dist),
					newCorner = {
						left: corner.left + delta.x,
						top: corner.top + delta.y
					};

				// bounds check
				var padding = parseInt($el.css('padding-left'));
				if (newCorner.left < -padding) {
					newCorner.left = -padding;
				} else if (
					newCorner.left + $el.outerWidth() - padding > $(document).width()
				) {
					newCorner.left = $(document).width() - $el.outerWidth() + padding;
				}
				if (newCorner.top < -padding) {
					newCorner.top = -padding;
				} else if (
					newCorner.top + $el.outerHeight() - padding > $(document).height()
				) {
					newCorner.top = $(document).height() - $el.outerHeight() + padding;
				}

				// move bumper
				$el.offset(newCorner);
			},

			// deep map multiple objects AT ONCE wow how cool
			get deepMapMulti() {
				var proto = this;

				return function(f, obj, obj2, obj3) {
					if (obj2 === undefined) obj2 = {};
					if (obj3 === undefined) obj3 = {};

					return Object.keys(obj).reduce(function(acc, k) {
						if ({}.toString.call(obj[k]) == '[object Object]') {
							acc[k] = proto.deepMapMulti(f, obj[k], obj2[k], obj3[k])
						} else {
							acc[k] = f(obj[k], k, obj2[k], obj3[k])
						}
						return acc
					}, {})
				}
			},

			// Mini templating-engine
			generateTemplate: function(string) {
				return new Function(
					'context',
					"return '" + string.replace(/{{\s*([^}]+)\s*}}/g, "'+context.$1+'") +
					"';"
				);
			}
		};
	};

})(jQuery, window, document);

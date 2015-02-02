/*! jrx - v0.1.0 - 2014-11-10 */(function(document, window){
	'use strict';
	
	/**
	 * @constructor
	 * @class : JRX > javascript runtime extension.
	 * @type : Class
	 * @method JRX
	 * @param {} $
	 * @param {} window
	 * @param {} document
	 * @return 
	 */
	function JRX ($, window, document) {
		
			/**
		     * @method : _config
		     * @params : object
		     * @depends: config [Object]
		     */
	    var _config = {
		        'useLog': 		{ 'editable': true, 	'value': false },
		        'isLogin': 		{ 'editable': true, 	'value': false },
		        'root': 		{ 'editable': true, 	'value': '/' },
		        'staticPath': 	{ 'editable': true, 	'value': '/' },
		        'contextPath': 	{ 'editable': true, 	'value': '/' },
		        'loginUrl':  	{ 'editable': true, 	'value': ''},
		        'logoutUrl':  	{ 'editable': true, 	'value': ''},
		        'loading' : 	{ 'editable': true, 	'value': '/images/loading_medium.gif'},
		        'maskColor' : 	{ 'editable': true, 	'value': '#aaaaaa'},
		        'useAlert' : 	{ 'editable': true, 	'value': true}
		    },
		    
		    /**
			 * @name : _REG_EXP
			 * @desc : reqular expression literal.
			 */
			 _REG_EXP = {
				"tag" : /(<([^>]+)>)/ig,
			    "trim" : /(^[\s　]+)|([\s　]+$)/g,
			    "number" : /(\d{3})(?=\d)/g,
			    "date" : /(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi,
			    "rgb" : /\d+, \d+, \d+/,
			    "engnum" : /^[A-Za-z0-9+]*$/,
			    "email" : /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
			    "url" : /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
			};
	    
	    /**
		 * @depends: _config (private)
		 * @type : method 
		 * @name : config
		 * @param {object or string} p
		 * @return 
		 */
		this.config = function (p) {
	        
	        if ($.type(p) === 'object') {
	        	set(p);
	        } else if($.type(p) === 'string'){
	        	return get(p);
	        } else {
	        	throw new Error('parameter is only json or string. current type : ' + $.type(p));
	        }
	        
	        /**
	    	 * Description
	    	 * @method set
	    	 * @param {} obj
	    	 * @return 
	    	 */
	    	function set(obj) {
	        	
	        	$.each(obj, function(n){
	        		
	        		if (_config[n] && _config[n].editable) {	
		                if (typeof obj[n] === 'string' && (obj[n] === 'True' || obj[n] === 'False')) {
		                    obj[n] = obj[n] == 'True';
		                }
		                
		                _config[n].value = obj[n];
		                _config[n].editable = false;
		            }	
	        	});
	        }
	        
	        /**
	    	 * Description
	    	 * @method get
	    	 * @param {} n
	    	 * @return MemberExpression
	    	 */
	    	function get(n) {
	        	
	            if(_config[n] === undefined && n !== 'all'){
	                throw new Error('undefined property name : ' + n);
	            }
	            
	            var returnVal;
	            
	            if(n == 'all'){
	            	returnVal = {};
	            	for(var item in _config){
	            		returnVal[item] = _config[item].value;  
	            	}
	            } else {
	            	returnVal = _config[n].value;
	            }
	            return returnVal; 
	        }
	    };
	    
		/**
		 * Description
		 * @params : object
		 * @method log
		 * @param {} obj
		 */
		this.log = function (obj) {
			var useLog = this.config('useLog') == true && window.console;
	        if (useLog) {
	            if (typeof obj == "object" && console.dir) {
	                console.dir && console.dir(obj);
	            } else {
	                console.log && console.log(obj);
	            }
	        }
		};
	    
		/**
		 * Description
		 * @desc : define namespace.
		 * @method define
		 * @param {} ns
		 * @param {} fn
		 * @return self
		 */
		this.define = function (ns, fn) {
			
			var gns = 'jrx',
				self = this, 
				arrNS = ns.split('.'), i, len;
			
			if(arrNS[0] === gns) arrNS = arrNS.slice(1);
			
			for(i = 0, len = arrNS.length; i < len; i += 1){
				if(!self.hasOwnProperty(arrNS[i])){
					
					self[arrNS[i]] = {};
					
					if (i === (len - 1)){
						self[arrNS[i]] = fn;
					}
				}
				self = self[arrNS[i]];
			}
			
			return self;
		};
		
		/**
		 * @method : regexp
		 */
		this.regexp = function(s){
			return _REG_EXP[s] || new RegExp();
		};
		
		/**
		 * @method : extend
		 * @TODO : deep option 처리.
		 */
		this.extend = function () {
			
			var deep = false,
				origin = {},
				add = {};
				
			if($.isBoolean(arguments[0])){
				deep = arguments[0];
				origin = arguments[1];
				add = arguments[2];
			} else {
				origin = arguments[0];
				add = arguments[1];
			}
			
			for(var o in origin) {
				origin[o] = add[o] ? add[o] : origin[o];
			}
		};
		
		/**
		 * @method : strip
		 * @desc : remove tag
		 */	
		this.strip = function(s) {
			
			if($.trim(s) === '') return s;
			
		    var reg_tag = this.regexp('tag'), r = '';
		    
		    s = s.replace(reg_tag, '');
		    
		    if(this.decodeEntities){
		    	s = this.decodeEntities(s);
		    }
		    r = s.replace(reg_tag, '');
		    
		    return r;
		};
		/**
		 * @method : decodeEntities [function]
		 * @desc : decode html entities.
		 */	
		this.decodeEntities = function(s){
		    var r, t = document.createElement('textarea');
		    t.innerHTML= s;
		    r = t.textContent || t.innerText;
		    t = null;
		    return r;
		};
		
		/*
	     * @name : toHexFromRGB [Function]
	     * @desc : convert RGB to Hex.
	     */
	    this.toHexFromRGB = function (rgb) {
	        var hex = [
				rgb.r.toString(16),
				rgb.g.toString(16),
				rgb.b.toString(16)
			];
	        $.each(hex, function (nr, val) {
	            if (val.length == 1) {
	                hex[nr] = '0' + val;
	            }
	        });
	        return hex.join('');
	    };
	    /*
	     * @method : toRGBFromHex [Function]
	     * @desc : convert Hex to RGB.
	     */
	    this.toRGBFromHex = function (hex) {
	    	
	        var _hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
	        
	        return { r: _hex >> 16, g: (_hex & 0x00FF00) >> 8, b: (_hex & 0x0000FF) };
	    };
	    /*
	     * @method : toRGBFromRGBA [Function]
	     * @desc : get rgb from background.
	     */
	    this.toRGBFromRGBA = function (rgba) {
	        
	        var rgbMatch = this.regexp('rgb'),
				matchRGB = rgba.match(rgbMatch).length && rgba.match(rgbMatch)[0].split(',');
				
	        return { r: parseInt(matchRGB[0].trim(), 10), g: parseInt(matchRGB[1].trim(), 10), b: parseInt(matchRGB[2].trim(), 10) };
	    };
	    /*
	     * @method : stringify [Function]
	     * @desc : parse string
	     */
	    this.stringify = function (obj) {
	        var t = typeof (obj);
	        if (t != "object" || obj === null) {
	            // simple data type
	            if (t == "string") obj = '"' + obj + '"';
	            return String(obj);
	        } else {
	            // recurse array or object
	            var n, v, json = [], arr = (obj && obj.constructor == Array);
	 
	            for (n in obj) {
	                v = obj[n];
	                t = typeof(v);
	                if (obj.hasOwnProperty(n)) {
	                    if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null) v = app.stringify(v);
	                    json.push((arr ? "" : '"' + n + '":') + String(v));
	                }
	            }
	            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
	        }
	    };
	    
	    /*
	     * @method : isNumberKey [Function]
	     * @desc : event 입력 받아서 keycode 처리.
	     */
	    this.isNumberKey = function (e) {
	        
	        var code = e.keyCode;
	        var rtnValue = false;
	        
	        // <backspace> || <tab> || Function Key || Number Key || Key Pad
	        if(code == 8 || code == 9 || (code >= 35 && code <= 40) || (code >= 46 && code <= 57) || (code >= 96 && code <= 105) ){
	        	rtnValue = true;
	        }
	        
	        return rtnValue;
	    };
	    
	    /*
	     * @method : addCommas [Function]
	     * @desc : 
	     */
	    this.addCommas = function (nStr) {
	        
	        nStr += '';
			var x = nStr.split('.');
			var x1 = x[0];
			var x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
	    };
	    
	    /*
	     * @method : preloadImage [Function]
	     * @desc : 
	     */
	    this.preloadImage = function () {
	        
	        if(arguments.length === 0 ) return;
	        
			var i = 0;
	        			
	        if(jrx.isArray(arguments[0])){
	        	for (i = 0; i < arguments[0].length; i++) {
					load(arguments[0][i]);
				}
	        } else {
	        	for (i = 0; i < arguments.length; i++) {
					load(arguments[i]);
				}
	        }
	        function load(src) {
	        	var img = new Image();
				img.src = src;
	        }
	    };
	    
	    
	    /*
	     * @name : imageLoadResize [Function]
	     * @TODO : 추가 작업 필요 이미지를 다시 로딩하여 사이즈를 읽어들이는 방식이 필요함.
	     * 플러그인 형태로 제작되는게 좋겠다.
	     */
	    // this.imageLoadResize = function (_this, maxSize) {
	        // var $this = $(_this),
				// n_width = $this.prop('naturalWidth'),
				// n_height = $this.prop('naturalHeight');
	// 	
	        // maxSize = maxSize ? maxSize : 192;
	        // //108*192
	        // //192*108
	// 	
	        // if (n_width < n_height) {
	            // if (n_height > maxSize) {
	                // $this.css('height', maxSize);
	            // }
	        // } else {
	            // if (n_width > maxSize) {
	                // $this.css('width', maxSize);
	            // }
	        // }
	    // };
	
	};
	
	//======================== new JRX ===========================
	
	window.jrx = new JRX($, window, document);;
	
	//============================================================
	
	/*
	 * @define : cookie
	 */
	jrx.define('cookie', new function(){
		/*
		 * @method : get
		 */
		this.get = function (name) {
			var prefix = name + "=",
				startIndex = document.cookie.indexOf(prefix),
				endIndex = document.cookie.indexOf(";", startIndex + prefix.length);
	
			if (startIndex == -1) return null;
	
			if (endIndex == -1) endIndex = document.cookie.length;
	
			return (unescape(document.cookie.substring(startIndex + prefix.length, endIndex)));
		};
	
		/*
		* @method : set
		* @param : cookie name
		* @param : value
		* @param : expireDays
		*/
		this.set = function (name, value, expireDays) {
			if(value === undefined) throw new Error('should be add second parameter, value');
			if(!expireDays) {
				document.cookie = name + "=" + escape(value) + "; path=/; ";
			} else {
				var today = new Date();
				today.setDate(today.getDate() + expireDays);
				document.cookie = name + "=" + escape(value) + "; path=/; expires=" + today.toGMTString() + ";";
			}
		};
	
		/*
		 * @method : remove
		 * @param name
		 */
		this.remove = function (name) {
			this.set(name, "", -1);
		};
	
		/*
		 * @method : clear
		 */
		this.clear = function () {
			var cookies = document.cookie.split(';');
			for (cookie in cookies) {
				this.remove(cookies[cookie].split('=')[0].trim());
			}
		};
	});
	
	/*
	 * @define : storage
	 * @desc : local & session Storage wrapper
	 */
	jrx.define('storage', (new function (){
		var storage = _getStorage('local');
	
		function _getStorage(type) {
			if (typeof(Storage) !== 'undefined') {
				//console.log('this browser support storage');
				if(type === 'local') {
					return window['localStorage'];
				} else if (type === 'session') {
					return window['sessionStorage'];
				}
			} else {			
				//console.log('this browser does not support storage');
				//console.log('it will be saved as windows object');
				// use this instance on unsupported localstorage brower			
				window[type] = {
					_data       : {},
					setItem     : function(id, val) { return this._data[id] = String(val); },
					getItem     : function(id) { return this._data.hasOwnProperty(id) ? this._data[id] : this._data; },
					removeItem  : function(id) { return delete this._data[id]; },
					clear       : function() { return this._data = {}; }
				};
				return window[type];
			}	
		}
	
		return {
			/**
			* get Storage value by name
			* @param name
			*/
			get : function (name) {
				if (name) {
					return storage.getItem(name);
				} else {
					return storage;
				}
			},
	
			/**
			* set Storage data
			* @param name
			* @param value
			*/
			set : function (name, value) {
				storage.setItem(name, value);
			},
	
			/**
			* remove data by name
			* @param name
			*/
			remove : function (name) {
				storage.removeItem(name);
			},
	
			/**
			* clear all Storage data
			*/
			clear : function () {
				storage.clear();
			}
		};
	}));
	
	/*
	 * @define : loading
	 * @desc : loading layer
	 * @css : .loading{position:fixed; top:0; left:0; width:100%; height:100%; z-index:5000; background:url('./images/loading_medium.gif') no-repeat 50% 50%}
	 */
	jrx.define('loading', new function(){
		var id = 'loading',
	    	cls = 'loading',
	        isLoading = false, isTimeout = false, delay = 800,
	        css = {
	    		'position' : 'fixed',
	    		'top' : 0,
	    		'left' : 0,
	    		'width' : '100%',
	    		'height' : '100%',
	    		'background' : 'url(' + jrx.config('loading') + ') no-repeat 50% 50%',
	    		'z-index' : 98
	    	};
	    
	    /*
		 * @method : show
		 */
	    this.show = function (addStyle) {
	        
	        if(!isLoading){
	            jrx.mask && jrx.mask.show();
	            
	            var msk = document.createElement('div'), style = '';
	            msk.setAttribute('id', id);
	            msk.setAttribute('class', id);
	            
	            css.background = 'url(' + jrx.config('loading') + ') no-repeat 50% 50%';
	            
	            if(addStyle){
		        	css = $.extend(css, addStyle);
		        }
	            
	            
	            for(var v in css){
		        	style += v + ':' + css[v] + ';';
		        }
		        msk.setAttribute('style', style);
		        
	            if (!document.getElementById(id)) document.body.appendChild(msk);
	            isLoading= true;
	            isTimeout = false;
	            
	            setTimeout(function () {
	                
	                if(isTimeout) {
	                    jrx.loading.hide();
	                } else {
	                    isTimeout = true;
	                }
	            }, delay);
	        }
	    };
	    
	    /*
		 * @method : hide
		 */
	    this.hide = function () {
	        
	        if(isLoading) {
	            if(isTimeout) {
	                jrx.mask && jrx.mask.hide();
	                var loading = document.getElementById(id);
	                if(loading) document.body.removeChild(loading);
	                isLoading= false;
	            } else {
	                isTimeout = true;
	            }
	        }
	    };
	});
	
	/*
	 * @define : mask
	 * @desc : mask layer
	 * @css : .mask{ position:absolute; top:0; left:0; width:100%; height:100%; background-color:#fff; opacity: 0.4; filter:alpha(opacity=40); z-index: 4000;}
	 */
	jrx.define('mask', new function(){
		var id = 'mask',
	    	cls = 'mask',
	    	css = {
	    		'position' : 'fixed',
	    		'top' : 0,
	    		'left' : 0,
	    		'width' : '100%',
	    		'height' : '100%',
	    		'background-color' : '#aaaaaa',
	    		'opacity' : 0.4,
	    		'filter' : 'alpha(opacity=40)',
	    		'z-index' : 98
	    	};
	    
	    /*
		 * @method : show
		 */
	    this.show = function (addStyle) {
	        
	        var msk = document.createElement('div');
	        var style = '';
	        
	        msk.setAttribute('id', id);
	        msk.setAttribute('class', cls);
	        
	        css['background-color'] = jrx.config('maskColor');
	        
	        if(addStyle){
	        	css = $.extend(css, addStyle);
	        }
	        
	        for(var v in css){
	        	style += v + ':' + css[v] + ';';
	        }
	        msk.setAttribute('style', style);
	        
	        if (!document.getElementById(id)) document.body.appendChild(msk);
	        
	        return msk;
	    };
	    /*
		 * @method : hide
		 */
	    this.hide = function () {
	        var msk = document.getElementById(id);
	        if(msk) document.body.removeChild(msk);
	    };
	});
	
	/*
	 * @define : language
	 * @desc : 
	 */
	jrx.define('language', {validate : {
		required: "는(은) 필수 입력 항목입니다.",
        remote: "이 항목을 수정해주세요.",
        email: " 올바른 이메일형식으로 입력해주세요.",
        url: "http://을 포함한 올바른 URL 을 입력해주세요.",
        date: "올바른 날짜를 입력해주세요.",
        dateISO: "ISO 표준에 맞는 날짜형식으로 입력해주세요.",
        number: "올바른 값을 입력해주세요.",
        digits: "숫자만 입력이 가능합니다.",
        creditcard: "올바른 카드번호를 입력해주세요.",
        equalTo: "입력하신 내용이 일치하지 않습니다.",
        length: "{0} 자리로 입력해주세요.",
        maxlength: "{0}자 이하로 입력해주세요.",
        minlength: "{0}자 이상 입력해주세요.",
        rangelength: "{0}자 이상 {1}자 이하로 입력해주세요.",
        range: "{0} ~ {1} 사이의 값만 입력해주세요.",
        max: "{0} 이하의 값을 입력해주세요.",
        min: "{0} 이상의 값을 입력해주세요.",
        engnum : "영문 또는 숫자만 입력해주세요..",
        count: "{0} 개 이상 등록되어야 합니다."
	}});
	
	var validate = {
		required: "는(은) 필수 입력 항목입니다.",
        remote: "이 항목을 수정해주세요.",
        email: " 올바른 이메일형식으로 입력해주세요.",
        url: "http://을 포함한 올바른 URL 을 입력해주세요.",
        date: "올바른 날짜를 입력해주세요.",
        dateISO: "ISO 표준에 맞는 날짜형식으로 입력해주세요.",
        number: "올바른 값을 입력해주세요.",
        digits: "숫자만 입력이 가능합니다.",
        creditcard: "올바른 카드번호를 입력해주세요.",
        equalTo: "입력하신 내용이 일치하지 않습니다.",
        length: "{0} 자리로 입력해주세요.",
        maxlength: "{0}자 이하로 입력해주세요.",
        minlength: "{0}자 이상 입력해주세요.",
        rangelength: "{0}자 이상 {1}자 이하로 입력해주세요.",
        range: "{0} ~ {1} 사이의 값만 입력해주세요.",
        max: "{0} 이하의 값을 입력해주세요.",
        min: "{0} 이상의 값을 입력해주세요.",
        engnum : "영문 또는 숫자만 입력해주세요..",
        count: "{0} 개 이상 등록되어야 합니다."
	};
	
})(document, window);
//======================== polyfill ==========================

/*
* @name : trim [String]
* @desc : 공백 제거
* @param : 
*/
if (typeof String.prototype.trim != 'function') {
    String.prototype.trim = function () {
        return this.replace(jrx.regexp('trim'), "");
    };
};

/*
* @name : getByteLength [String]
* @desc : 문자열의 Byte 값 반환.
* @param : 
*/
if (typeof String.prototype.getByteLength != 'function') {
    String.prototype.getByteLength = function () {
        var _this = this, b, i, c;
        for (b = i = 0; c = _this.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? c : 1);
        return b;
    };
};

/*
* @name : filter [Array]
* @desc : 배열을 필터하여 새로운 배열 반환
* @param : [filter condition function.]
*/
if (typeof Array.prototype.filter != 'function') {
    Array.prototype.filter = function (_function) {
        var newArray = [],
            _this = this;

        for (var i = 0, len = _this.length; i < len; i++) {
            if (_function(_this[i], i, _this)) {
                newArray.push(_this[i]);
            }
        }
        return newArray;
    };
};
/*
* @name : forEach [Array]
* @desc : 배열 순환하며 조건 처리.
* @param : 
*/
if (typeof Array.prototype.forEach != 'function') {
    Array.prototype.forEach = function (_function) {
        var _this = this;
        
        for (var i = 0, len = _this.length; i < len; i++) {
            _function.call(_this, _this[i], i, _this);
        }
    };
};
/*
* @name : contains [Array]
* @desc : 배열에 존재하는 원소인지 확인.
* @param : 
*/
if (typeof Array.prototype.contains != 'function') {
    Array.prototype.contains = function (compareValue) {
        var _this = this;
        for (var i = 0, len = _this.length; i < len; i++) {
            if (_this[i] === compareValue) {
                return true;
                break;
            }
        }
        return false;
    };
};

// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {

    var k;

    // 1. Let O be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      var kValue;
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of O with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}
//============================================================

;(function( $, window, document){
	'use strict';
	
	
	jrx.define('g', function(fn){
		$(function(){
			if($.isFunction(fn)){
				fn();
			}
		});
	});
	
	jrx.define('p', function(fn){
		$(function(){
			if($.isFunction(fn)){
				fn();
			}
		});
	});
	
	jrx.define('isString', function(obj){
		return $.type(obj) === 'string';
	});
	
	jrx.define('isNumber', function(obj){
		return $.type(obj) === 'number';
	});
	
	jrx.define('isArray', function(obj){
		return $.type(obj) === 'array';
	});
	
	jrx.define('isBoolean', function(obj){
		return $.type(obj) === 'boolean';
	});
	
	jrx.define('isObject', function(obj){
		return $.type(obj) === 'object';
	});
	
	jrx.define('isEmail', function(obj){
		return $.regexp('email').test(obj);
	});
	
	jrx.define('isUrl', function(obj){
		return $.regexp('url').test(obj);
	});
	
	jrx.define('isDate', function(obj){
		return !/Invalid|NaN/.test(new Date(obj).toString());
	});
	
	/*
	 * @define : validate
	 * @desc : init, extend validate
	 */
	jrx.define('validate.init', function(){
		/*
        * @name : set jquery.validate extend
        * @depends : {plugin} jquery.validate
        */
       	if($.type($.fn.validate) === 'function'){
   			   			
   			$.extend($.validator.messages, {
                required: jrx.language.validate.required,
                remote: jrx.language.validate.remote,
                email: jrx.language.validate.email,
                url: jrx.language.validate.url,
                date: jrx.language.validate.date,
                dateISO: jrx.language.validate.dateISO,
                number: jrx.language.validate.number,
                digits: jrx.language.validate.digits,
                creditcard: jrx.language.validate.creditcard,
                equalTo: jrx.language.validate.equalTo,
                length: $.validator.format(jrx.language.validate.length),
                maxlength: $.validator.format(jrx.language.validate.maxlength),
                minlength: $.validator.format(jrx.language.validate.minlength),
                rangelength: $.validator.format(jrx.language.validate.rangelength),
                range: $.validator.format(jrx.language.validate.range),
                max: $.validator.format(jrx.language.validate.max),
                min: $.validator.format(jrx.language.validate.min),
                engnum : $.validator.format(jrx.language.validate.engnum),
                count: $.validator.format(jrx.language.validate.count)
            });            

            $.validator.addMethod('engnum', function(value, element, params){
                return this.optional(element) || jrx.regexp('engnum').test(value);
		    });

            $.validator.addMethod('length', function(value, element, params){
			    return this.optional(element) || value.length == element.getAttribute('length');
		    });
            
            // addMethod : count
    		$.validator.addMethod('count', function(value, element, params){
    			return this.optional(element) || value >= params[0];
    		});
    		
            $.validator.setDefaults({
                ignore: '',
                onkeyup: false,
                onfocusout: false,
                focusInvalid: true,
                showErrors: function (errorMap, errorList) {

                    if (errorList.length === 0) return false;

                    var labelWrap = $('<div />').addClass('label-lists'), textLabels = '', textAlert = '';

                    $.each(errorList, function (i, v) {
                        var _$element = $(v.element);
                        if (i != 0) return;
                        textLabels += $('<label />')
						    .attr('for', _$element.attr('id'))
						    .html('<strong>' + getMessage(_$element) + ' : </strong>' + (_$element.data('message') || v.message))
						    .appendTo(labelWrap);
                        if (i == 0) {
                            textAlert += getMessage(_$element) + (_$element.data('message') || v.message);
                            _$element.focus();
                        }
                    });

                    function getMessage(_$element) {
                        return _$element.data('title')
						    // || $('[for=' + _$element.attr('id') + ']').text()
						    || _$element.parent('label').text()
						    || _$element.attr('placeholder')
						    || _$element.attr('name');
                    };

					if(!jrx.config('useAlert') && $.isfunction($.stateAlarm)){
						$.stateAlarm(textAlert);	
					} else {
						alert(textAlert);
					}
                    
                    return;
                },
                submitHandler: function (form) { form.submit(); }
            });
       	}
	});
	
})( jQuery, window, document );;(function( $, window, document){
	
	//======================== Valiable ==========================
	var utils = $ || {};
	
	//============================================================
	
	//======================== mix $.utils =======================
	
	utils.jrx = jrx;
	
	$.each(jrx, function(v, i){
		
		if( utils[v] === undefined ){
			utils[v] = jrx[v];
		} else {
			jrx.log('ooora! - ' + v);
		}
	});
	//============================================================
	
	//======================== Language ==========================
	
	//============================================================
	
	$(function(){
		
		//========================= variable =========================
		var dateFormat = 'yy-mm-dd',
			timeFormat = 'HH:mm',
			content_type = {
				defaults : 'application/x-www-form-urlencoded; charset=UTF-8',
				json : 'application/json'
			};
		//============================================================
				
		//===================== set jquery ajax. ===================== contentType : content_type.defaults, 
		$.ajaxSetup({ cache: false,
        	converters: {
				// Convert anything to text
				"* text": window.String,
				// Text to html (true = no transformation)
				"text html": true,
				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,
				// Parse text as xml
				"text xml": jQuery.parseXML
			}
        });
		//============================================================
		
		
		//======================== datepicker ========================
		if($.isFunction($.fn.datepicker)){
			$.datepicker.setDefaults({
				// showOn: "button",
                // buttonImage: $.config('staticPath') + "images/ico_calendar.gif",
                // buttonImageOnly: true,
                dateFormat: dateFormat
            });
            
			// $('input[date]', $contents).datepicker();
		}
		//============================================================
		
	});
})( jQuery, window, document );

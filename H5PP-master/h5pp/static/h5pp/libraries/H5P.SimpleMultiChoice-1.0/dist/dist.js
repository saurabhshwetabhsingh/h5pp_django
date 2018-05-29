/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Load library
	H5P.SimpleMultiChoice = __webpack_require__(1).default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	__webpack_require__(2);

	var _xapiGenerator = __webpack_require__(6);

	var _xapiGenerator2 = _interopRequireDefault(_xapiGenerator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var instanceId = 0;

	var SimpleMultiChoice = function (_H5P$EventDispatcher) {
	  _inherits(SimpleMultiChoice, _H5P$EventDispatcher);

	  /**
	   * Constructor for Simple Multiple Choice
	   * @param {string} question Question text
	   * @param {string} inputType Checkbox or radio
	   * @param {Array} alternatives Array of strings with answers alternatives
	   * @param {number|*} contentId
	   * @param {Object} contentData
	   */
	  function SimpleMultiChoice(_ref) {
	    var question = _ref.question;
	    var _ref$alternatives = _ref.alternatives;
	    var alternatives = _ref$alternatives === undefined ? [] : _ref$alternatives;
	    var inputType = _ref.inputType;
	    var contentId = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var contentData = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    _classCallCheck(this, SimpleMultiChoice);

	    // Provide a unique identifier for each multi choice
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleMultiChoice).call(this));

	    _this.uniqueName = 'h5p-simple-multiple-choice-' + instanceId;
	    instanceId += 1;

	    // Keep track of the state
	    _this.state = alternatives.map(function (alt, i) {
	      return {
	        id: i,
	        text: alt,
	        checked: false
	      };
	    });

	    _this.xapiGenerator = new _xapiGenerator2.default({ question: question, alternatives: alternatives });

	    /**
	     * Attach library to wrapper
	     * @param {jQuery} $wrapper
	     */
	    _this.attach = function ($wrapper) {
	      var element = document.createElement('div');
	      element.className = 'h5p-simple-multiple-choice';
	      var questionElement = document.createElement('div');
	      questionElement.classList.add('h5p-simple-multiple-choice-question', 'h5p-subcontent-question');
	      var questionText = this.createQuestion(this.uniqueName);
	      questionElement.appendChild(questionText);

	      element.appendChild(questionElement);

	      var altList = this.createAlternativesList(this.uniqueName);
	      element.appendChild(altList);

	      $wrapper.get(0).appendChild(element);
	    };

	    /**
	     * Create html for multiple choice
	     * @return {HTMLElement} html for multiple choice
	     */
	    _this.createQuestion = function (id) {
	      var questionElement = document.createElement('div');
	      questionElement.id = id;
	      questionElement.innerHTML = question;
	      return questionElement;
	    };

	    /**
	     * Handle input changed, trigger event for listeners
	     * @param {number} inputIndex Index of input element that changed
	     */
	    _this.handleInputChange = function (inputIndex) {
	      this.state = this.state.map(function (alt, j) {
	        var checked = j === inputIndex;
	        if (inputType !== 'radio') {
	          checked = j === inputIndex ? !alt.checked : alt.checked;
	        }

	        // Immutable state
	        return _extends({}, alt, {
	          checked: checked
	        });
	      });

	      var xApiTemplate = this.createXAPIEventTemplate('interacted');
	      var xApiEvent = this.xapiGenerator.generateXApi(xApiTemplate, this.state);
	      this.trigger(xApiEvent);
	    };

	    /**
	     * Create alternatives for multiple choice
	     *
	     * @param {string} questionId Unique id of question element
	     * @return {HTMLElement} html for alternatives list items
	     */
	    _this.createAlternativesList = function (questionId) {
	      var _this2 = this;

	      if (!this.state.length) {
	        var err = document.createElement('div');
	        err.className = 'h5p-simple-multiple-choice-alternatives-error';
	        err.textContent = 'ERROR: No alternatives chosen';
	        return err;
	      }

	      var altList = document.createElement('ul');
	      altList.classList.add('h5p-simple-multiple-choice-alternatives', 'h5p-subcontent-body');
	      altList.setAttribute('role', 'listbox');
	      altList.setAttribute('aria-labelledby', questionId);

	      this.state.forEach(function (_ref2) {
	        var id = _ref2.id;
	        var text = _ref2.text;
	        var checked = _ref2.checked;


	        // Elements
	        var listItem = document.createElement('li');
	        listItem.className = 'h5p-simple-multiple-choice-alternative-li';
	        var label = document.createElement('label');
	        var input = document.createElement('input');
	        input.className = 'h5p-simple-multiple-choice-alternative-input';

	        // Input attributes
	        input.type = inputType || 'checkbox';
	        input.name = _this2.uniqueName;
	        if (checked) {
	          input.setAttribute('checked', 'checked');
	        }

	        // Label attributes
	        label.addEventListener('change', _this2.handleInputChange.bind(_this2, id));
	        label.appendChild(input);
	        label.innerHTML += text;

	        listItem.appendChild(label);
	        altList.appendChild(listItem);
	      });

	      return altList;
	    };

	    /**
	     * Get current state result pattern
	     * @return {string}
	     */
	    _this.getCurrentState = function () {
	      return _xapiGenerator2.default.getResultPattern(this.state);
	    };

	    /**
	     * Restore previous state
	     */
	    _this.restorePreviousState = function () {
	      var _this3 = this;

	      if (!contentData.previousState) {
	        return;
	      }

	      // Parse answer
	      var answers = contentData.previousState.split('[,]');
	      answers.forEach(function (value) {
	        _this3.state[value].checked = true;
	      });
	    };

	    _this.restorePreviousState();
	    return _this;
	  }

	  return SimpleMultiChoice;
	}(H5P.EventDispatcher);

	exports.default = SimpleMultiChoice;

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Generate xAPI statements
	 */
	var xApiGenerator = function () {
	  function xApiGenerator(_ref) {
	    var question = _ref.question;
	    var alternatives = _ref.alternatives;

	    _classCallCheck(this, xApiGenerator);

	    var choices = alternatives.map(function (alt, i) {
	      return {
	        id: '' + i,
	        description: {
	          'en-US': alt
	        }
	      };
	    });

	    // Set up default response object
	    this.event = {
	      description: {
	        'en-US': question // We don't actually know the language of the question
	      },
	      type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
	      interactionType: 'choice',
	      choices: choices
	    };
	  }

	  /**
	   * Extend xAPI template
	   * @param {Event} xApiTemplate xAPI event template
	   * @param {Object} state State of multiple choice
	   * @return {Event} Extended xAPI event
	   */


	  _createClass(xApiGenerator, [{
	    key: 'generateXApi',
	    value: function generateXApi(xApiTemplate, state) {
	      var response = xApiGenerator.getResultPattern(state);

	      var statement = xApiTemplate.data.statement;
	      _extends(statement, {
	        result: {
	          response: response
	        }
	      });

	      if (statement.object) {
	        var definition = statement.object.definition;
	        _extends(definition, this.event);
	      }

	      return xApiTemplate;
	    }

	    /**
	     * Generate result pattern
	     * @param state
	     * @return {*}
	     */

	  }], [{
	    key: 'getResultPattern',
	    value: function getResultPattern(state) {
	      return state.reduce(function (pattern, alt, i) {
	        if (alt.checked) {
	          pattern += (pattern.length ? '[,]' : '') + i;
	        }
	        return pattern;
	      }, '');
	    }
	  }]);

	  return xApiGenerator;
	}();

	exports.default = xApiGenerator;

/***/ }
/******/ ]);
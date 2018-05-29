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
	H5P.Questionnaire = __webpack_require__(1).default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	__webpack_require__(2);

	__webpack_require__(6);

	var _successScreen = __webpack_require__(8);

	var _successScreen2 = _interopRequireDefault(_successScreen);

	var _requiredMessage = __webpack_require__(11);

	var _requiredMessage2 = _interopRequireDefault(_requiredMessage);

	var _footer = __webpack_require__(14);

	var _footer2 = _interopRequireDefault(_footer);

	var _progressBar = __webpack_require__(17);

	var _progressBar2 = _interopRequireDefault(_progressBar);

	var _questionContent = __webpack_require__(23);

	var _questionContent2 = _interopRequireDefault(_questionContent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Questionnaire = function (_H5P$EventDispatcher) {
	  _inherits(Questionnaire, _H5P$EventDispatcher);

	  /**
	   * Constructor for questionnaire
	   * @param questionnaireElements
	   * @param successScreenOptions
	   * @param successScreenOptions.enableSuccessScreen
	   * @param uiElements
	   * @param uiElements.buttonLabels
	   * @param uiElements.requiredMessage
	   * @param contentId
	   * @param contentData
	   */
	  function Questionnaire(_ref) {
	    var _ref$questionnaireEle = _ref.questionnaireElements;
	    var questionnaireElements = _ref$questionnaireEle === undefined ? [] : _ref$questionnaireEle;
	    var _ref$successScreenOpt = _ref.successScreenOptions;
	    var successScreenOptions = _ref$successScreenOpt === undefined ? {} : _ref$successScreenOpt;
	    var _ref$uiElements = _ref.uiElements;
	    var uiElements = _ref$uiElements === undefined ? {} : _ref$uiElements;
	    var contentId = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var contentData = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    _classCallCheck(this, Questionnaire);

	    var _this = _possibleConstructorReturn(this, (Questionnaire.__proto__ || Object.getPrototypeOf(Questionnaire)).call(this));

	    _this.contentId = contentId;
	    _this.state = {
	      questionnaireElements: [],
	      currentIndex: 0
	    };

	    uiElements = _extends({}, {
	      buttonLabels: {
	        prevLabel: 'Previous',
	        nextLabel: 'Next',
	        submitLabel: 'Submit'
	      },
	      accessibility: {
	        requiredTextExitLabel: "Close error message",
	        progressBarText: 'Question %current of %max'
	      },
	      requiredMessage: 'This question requires an answer',
	      requiredText: 'required'
	    }, uiElements);

	    /**
	     * Instantiate all questions
	     * @return {Element}
	     */
	    _this.createQuestionnaireBody = function () {
	      var _this2 = this;

	      var content = document.createElement('div');
	      content.className = 'h5p-questionnaire-content';

	      questionnaireElements.forEach(function (_ref2, index) {
	        var requiredField = _ref2.requiredField;
	        var library = _ref2.library;

	        var questionContent = _this2.createQuestionContent(requiredField, library, index);
	        content.appendChild(questionContent.getElement());
	        _this2.state.questionnaireElements.push(questionContent);
	      });

	      this.createSuccessScreen().attachTo(content);

	      return content;
	    };

	    /**
	     * Instantiate a single question
	     *
	     * @param {boolean} requiredField
	     * @param {Object} library
	     * @param {number} index
	     * @return {QuestionContent}
	     */
	    _this.createQuestionContent = function (requiredField, library, index) {
	      var _this3 = this;

	      var questionContent = new _questionContent2.default({
	        progressBar: this.progressBar,
	        params: library,
	        contentId: this.contentId,
	        requiredField: requiredField,
	        index: index,
	        uiElements: uiElements
	      });
	      questionContent.hideElement(index !== this.state.currentIndex);
	      questionContent.on('handledInteraction', function () {
	        _this3.trigger('resize');
	        _this3.requiredMessage.trigger('hideMessage');
	      });

	      return questionContent;
	    };

	    /**
	     * Create questionnaire wrapper
	     * @return {Element} questionnaire element
	     */
	    _this.createQuestionnaire = function () {
	      var questionnaireWrapper = document.createElement('div');
	      questionnaireWrapper.className = 'h5p-questionnaire';
	      if (questionnaireElements.length === 1 && !questionnaireElements[0].library) {
	        questionnaireWrapper.classList.add('h5p-invalid-questionnaire');
	        questionnaireWrapper.textContent = 'Invalid content';
	        return questionnaireWrapper;
	      }

	      this.createProgressBar(questionnaireElements).attachTo(questionnaireWrapper);

	      var content = this.createQuestionnaireBody();
	      questionnaireWrapper.appendChild(content);

	      this.requiredMessage = new _requiredMessage2.default(uiElements);
	      this.requiredMessage.attachTo(questionnaireWrapper);

	      var footer = this.createFooter();
	      footer.attachTo(questionnaireWrapper);

	      // Start initial questionnaire element activity
	      if (this.state.questionnaireElements.length) {
	        this.state.questionnaireElements[0].setActivityStarted();
	      }

	      if (this.state.questionnaireElements.length && this.state.currentIndex >= this.state.questionnaireElements.length) {
	        this.showSuccessScreen();
	      } else if (this.state.currentIndex > 0) {
	        this.move(this.state.currentIndex);
	      }

	      return questionnaireWrapper;
	    };

	    /**
	     * Create success screen
	     * @return {SuccessScreen}
	     */
	    _this.createSuccessScreen = function () {
	      var _this4 = this;

	      this.successScreen = new _successScreen2.default(successScreenOptions, this);
	      this.successScreen.on('noSuccessScreen', function () {
	        _this4.trigger('noSuccessScreen');
	      });

	      /**
	       * Need to resize when image is loaded in case we are restoring the
	       * success screen page.
	       */
	      this.successScreen.on('imageLoaded', function () {
	        _this4.trigger('resize');
	      });

	      return this.successScreen;
	    };

	    /**
	     * Create progress bar
	     * @param questionnaireElements
	     * @return {ProgressBar}
	     */
	    _this.createProgressBar = function (questionnaireElements) {
	      this.progressBar = new _progressBar2.default({
	        currentIndex: this.state.currentIndex + 1,
	        maxIndex: questionnaireElements.length,
	        uiElements: uiElements
	      });

	      return this.progressBar;
	    };

	    _this.showSuccessScreen = function () {
	      var currentEl = this.state.questionnaireElements[this.state.questionnaireElements.length - 1];
	      if (this.successScreen.show()) {
	        currentEl.hideElement(true);
	        this.footer.trigger('disablePrev');
	        this.footer.trigger('disableNext');
	        this.footer.trigger('disableSubmit');
	        this.progressBar.remove();
	        this.footer.remove();
	      }
	    };

	    /**
	     * Create a Footer instance
	     * @return {Footer}
	     */
	    _this.createFooter = function () {
	      var _this5 = this;

	      var footer = new _footer2.default(uiElements.buttonLabels);
	      footer.on('submit', function () {
	        var currentEl = _this5.state.questionnaireElements[_this5.state.questionnaireElements.length - 1];
	        if (_this5.isValidAnswer(currentEl)) {
	          _this5.triggerXAPI('completed');
	          _this5.showSuccessScreen();
	          _this5.trigger('resize');
	          if (successScreenOptions.enableSuccessScreen) {
	            _this5.state.currentIndex = _this5.state.questionnaireElements.length;
	          }
	        } else {
	          _this5.triggerRequiredQuestion();
	        }
	      });

	      footer.on('next', function () {
	        _this5.move(_this5.state.currentIndex + 1);
	      });

	      footer.on('prev', function () {
	        _this5.move(_this5.state.currentIndex - 1);
	      });

	      footer.trigger('disablePrev');
	      if (this.state.questionnaireElements.length > 1) {
	        footer.trigger('disableSubmit');
	      } else {
	        footer.trigger('disableNext');
	      }
	      this.footer = footer;

	      return footer;
	    };

	    /**
	     * Trigger required question to any listeners
	     */
	    _this.triggerRequiredQuestion = function () {
	      this.requiredMessage.trigger('showMessage');
	      this.trigger('resize');
	    };

	    /**
	     * Move in a direction
	     * @param {number} index
	     */
	    _this.move = function (index) {
	      var _state = this.state;
	      var currentIndex = _state.currentIndex;
	      var questionnaireElements = _state.questionnaireElements;

	      var element = questionnaireElements[currentIndex];

	      if (index > currentIndex && !this.isValidAnswer(element)) {
	        this.triggerRequiredQuestion();
	        return;
	      }

	      if (index >= 0 || index < questionnaireElements.length) {
	        this.footer.trigger(index === 0 ? 'disablePrev' : 'enablePrev');
	        this.footer.trigger(index >= questionnaireElements.length - 1 ? 'disableNext' : 'enableNext');
	        this.footer.trigger(index !== questionnaireElements.length - 1 ? 'disableSubmit' : 'enableSubmit');

	        this.requiredMessage.trigger('hideMessage');
	        questionnaireElements[currentIndex].hideElement(true);
	        var nextQuestion = questionnaireElements[index];
	        nextQuestion.hideElement(false);
	        var nextQuestionHeader = nextQuestion.getElement().querySelector('.h5p-subcontent-question');
	        this.progressBar.attachNumberWidgetTo(nextQuestionHeader);
	        this.trigger('resize');
	      }

	      this.state = _extends(this.state, {
	        currentIndex: index
	      });
	      this.progressBar.move(index + 1);

	      var progressedEvent = this.createXAPIEventTemplate('progressed');
	      if (progressedEvent.data.statement.object) {
	        progressedEvent.data.statement.object.definition.extensions['http://id.tincanapi.com/extension/ending-point'] = index + 1;
	        this.trigger(progressedEvent);
	      }

	      questionnaireElements[index].setActivityStarted();
	    };

	    /**
	     * Valid answer if field is not required or answered
	     *
	     * @param element
	     * @return {boolean}
	     */
	    _this.isValidAnswer = function (element) {
	      return !element.isRequired() || element.isAnswered();
	    };

	    /**
	     * Attach library to wrapper
	     * @param {jQuery} $wrapper
	     */
	    _this.attach = function ($wrapper) {
	      $wrapper.get(0).classList.add('h5p-questionnaire-wrapper');
	      $wrapper.get(0).appendChild(questionnaireWrapper);
	    };

	    /**
	     * Get current state
	     * @return {{questions: Array, progress: number}}
	     */
	    _this.getCurrentState = function () {
	      var questions = this.state.questionnaireElements.map(function (question) {
	        return question.getCurrentState();
	      });

	      return {
	        questions: questions,
	        progress: this.state.currentIndex
	      };
	    };

	    /**
	     * Restore previous state
	     */
	    _this.setPreviousState = function () {
	      var previousState = contentData.previousState;

	      // No valid content data
	      if (!previousState || !previousState.questions) {
	        return;
	      }

	      if (previousState.progress) {
	        this.state.currentIndex = previousState.progress;

	        // Has no success screen, must restore previous page.
	        if (this.state.currentIndex > questionnaireElements.length - 1 && !successScreenOptions.enableSuccessScreen) {
	          this.state.currentIndex -= 1;
	        }
	      }

	      previousState.questions.forEach(function (question, idx) {
	        questionnaireElements[idx].library.userDatas = questionnaireElements[idx].library.userDatas || {};

	        questionnaireElements[idx].library.userDatas.state = question;
	      });
	    };

	    _this.setPreviousState();
	    var questionnaireWrapper = _this.createQuestionnaire();
	    return _this;
	  }

	  return Questionnaire;
	}(H5P.EventDispatcher);

	exports.default = Questionnaire;

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

	// removed by extract-text-webpack-plugin

/***/ },
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SuccessScreen = function (_H5P$EventDispatcher) {
	  _inherits(SuccessScreen, _H5P$EventDispatcher);

	  function SuccessScreen(_ref, parent) {
	    var _ref$enableSuccessScr = _ref.enableSuccessScreen;
	    var enableSuccessScreen = _ref$enableSuccessScr === undefined ? true : _ref$enableSuccessScr;
	    var _ref$successScreenIma = _ref.successScreenImage;
	    var successScreenImage = _ref$successScreenIma === undefined ? {} : _ref$successScreenIma;
	    var _ref$successMessage = _ref.successMessage;
	    var successMessage = _ref$successMessage === undefined ? '' : _ref$successMessage;

	    _classCallCheck(this, SuccessScreen);

	    var _this = _possibleConstructorReturn(this, (SuccessScreen.__proto__ || Object.getPrototypeOf(SuccessScreen)).call(this));

	    _this.wrapper = document.createElement('div');
	    _this.wrapper.className = 'h5p-questionnaire-success';
	    _this.wrapper.setAttribute('tabindex', '-1');
	    _this.wrapper.classList.add('hide');

	    var centeredElements = document.createElement('div');
	    centeredElements.className = 'h5p-questionnaire-success-center';
	    _this.wrapper.appendChild(centeredElements);

	    var successIcon = document.createElement('div');
	    successIcon.className = 'h5p-questionnaire-success-icon';

	    // Add image instead of icon
	    if (successScreenImage.params && successScreenImage.params.file) {
	      successIcon.classList.add('image');
	      var image = H5P.newRunnable(successScreenImage, parent.contentId, H5P.jQuery(successIcon), undefined, { parent: parent });
	      image.on('loaded', function () {
	        _this.trigger('imageLoaded');
	      });
	    } else {
	      successIcon.classList.add('standard-icon');
	    }

	    var successText = document.createElement('div');
	    successText.className = 'h5p-questionnaire-success-message';
	    successText.innerHTML = successMessage;

	    centeredElements.appendChild(successIcon);
	    centeredElements.appendChild(successText);

	    /**
	     * Show success screen, returns true on success
	     * @return {boolean} True on success
	     */
	    _this.show = function () {
	      if (enableSuccessScreen) {
	        this.wrapper.classList.remove('hide');
	        this.wrapper.focus();
	        return true;
	      } else {
	        this.trigger('noSuccessScreen');
	        return false;
	      }
	    };
	    return _this;
	  }

	  _createClass(SuccessScreen, [{
	    key: 'attachTo',
	    value: function attachTo(container) {
	      container.appendChild(this.wrapper);
	    }
	  }]);

	  return SuccessScreen;
	}(H5P.EventDispatcher);

	exports.default = SuccessScreen;

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(12);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RequiredMessage = function (_H5P$EventDispatcher) {
	  _inherits(RequiredMessage, _H5P$EventDispatcher);

	  function RequiredMessage(uiElements) {
	    _classCallCheck(this, RequiredMessage);

	    var _this = _possibleConstructorReturn(this, (RequiredMessage.__proto__ || Object.getPrototypeOf(RequiredMessage)).call(this));

	    _this.requiredElement = document.createElement('div');
	    _this.requiredElement.classList.add('h5p-questionnaire-choice-required', 'hide');

	    _this.requiredMessage = document.createElement('div');
	    _this.requiredMessage.textContent = uiElements.requiredMessage;
	    _this.requiredMessage.className = 'h5p-questionnaire-choice-required-message';
	    _this.requiredMessage.setAttribute('role', 'alert');

	    var exitButton = document.createElement('button');
	    exitButton.className = 'h5p-questionnaire-choice-required-exit';
	    exitButton.setAttribute('aria-label', uiElements.accessibility.requiredTextExitLabel);
	    exitButton.addEventListener('click', function () {
	      _this.hideMessage();
	    });

	    _this.on('hideMessage', function () {
	      _this.hideMessage();
	    });

	    _this.on('showMessage', function () {
	      _this.showMessage();
	    });

	    _this.requiredElement.appendChild(_this.requiredMessage);
	    _this.requiredElement.appendChild(exitButton);
	    return _this;
	  }

	  _createClass(RequiredMessage, [{
	    key: 'showMessage',
	    value: function showMessage() {
	      this.requiredElement.classList.remove('hide');
	    }
	  }, {
	    key: 'hideMessage',
	    value: function hideMessage() {
	      this.requiredElement.classList.add('hide');
	    }
	  }, {
	    key: 'attachTo',
	    value: function attachTo(element) {
	      element.appendChild(this.requiredElement);
	    }
	  }]);

	  return RequiredMessage;
	}(H5P.EventDispatcher);

	exports.default = RequiredMessage;

/***/ },
/* 12 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(15);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Footer = function (_H5P$EventDispatcher) {
	  _inherits(Footer, _H5P$EventDispatcher);

	  function Footer(buttonLabels) {
	    _classCallCheck(this, Footer);

	    var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this));

	    _this.footerWrapper = document.createElement('div');
	    _this.footerWrapper.className = 'h5p-questionnaire-footer';

	    var submitButton = _this.createFooterButton(buttonLabels.submitLabel);
	    submitButton.classList.add('h5p-questionnaire-footer-submit');
	    submitButton.addEventListener('click', function () {
	      _this.trigger('submit');
	    });
	    _this.on('enableSubmit', function () {
	      submitButton.classList.remove('disable');
	    });
	    _this.on('disableSubmit', function () {
	      submitButton.classList.add('disable');
	    });

	    var nextButton = _this.createFooterButton(buttonLabels.nextLabel);
	    nextButton.classList.add('h5p-questionnaire-footer-next');
	    nextButton.addEventListener('click', function () {
	      _this.trigger('next');
	    });
	    _this.on('enableNext', function () {
	      nextButton.classList.remove('disable');
	    });
	    _this.on('disableNext', function () {
	      nextButton.classList.add('disable');
	    });

	    var previousButton = _this.createFooterButton(buttonLabels.prevLabel);
	    previousButton.classList.add('h5p-questionnaire-footer-previous');
	    previousButton.addEventListener('click', function () {
	      _this.trigger('prev');
	    });
	    _this.on('enablePrev', function () {
	      previousButton.classList.remove('disable');
	    });
	    _this.on('disablePrev', function () {
	      previousButton.classList.add('disable');
	    });

	    _this.footerWrapper.appendChild(previousButton);
	    _this.footerWrapper.appendChild(nextButton);
	    _this.footerWrapper.appendChild(submitButton);
	    return _this;
	  }

	  /**
	   * Handle creating submit answer button
	   * @param {string} buttonText Button text
	   * @return {Element} Submit button
	   */


	  _createClass(Footer, [{
	    key: 'createFooterButton',
	    value: function createFooterButton(buttonText) {
	      var footerButton = document.createElement('button');
	      footerButton.className = 'h5p-questionnaire-footer-button';
	      footerButton.type = 'button';
	      footerButton.textContent = buttonText;

	      return footerButton;
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      this.footerWrapper.parentNode.removeChild(this.footerWrapper);
	    }
	  }, {
	    key: 'attachTo',
	    value: function attachTo(element) {
	      element.appendChild(this.footerWrapper);
	    }
	  }]);

	  return Footer;
	}(H5P.EventDispatcher);

	exports.default = Footer;

/***/ },
/* 15 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(18);

	var _numberWidget = __webpack_require__(20);

	var _numberWidget2 = _interopRequireDefault(_numberWidget);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ProgressBar = function () {
	  function ProgressBar(_ref) {
	    var currentIndex = _ref.currentIndex;
	    var maxIndex = _ref.maxIndex;
	    var uiElements = _ref.uiElements;

	    _classCallCheck(this, ProgressBar);

	    this.maxIndex = maxIndex;
	    this.uiElements = uiElements;

	    this.progressBar = document.createElement('div');
	    this.progressBar.className = 'h5p-questionnaire-progress-bar';
	    this.progressBar.setAttribute('tabindex', '-1');
	    this.progressBar.setAttribute('role', 'progressbar');
	    this.progressBar.setAttribute('aria-valuemin', '0');
	    this.progressBar.setAttribute('aria-valuemax', maxIndex);
	    this.updateAriaValues(currentIndex);

	    this.currentProgress = document.createElement('div');
	    this.currentProgress.className = 'h5p-questionnaire-progress-bar-current';

	    this.numberWidget = new _numberWidget2.default(currentIndex, maxIndex);

	    this.move(currentIndex);

	    this.progressBar.appendChild(this.currentProgress);
	  }

	  _createClass(ProgressBar, [{
	    key: 'updateAriaValues',
	    value: function updateAriaValues(currentIndex) {
	      this.progressBar.setAttribute('aria-valuenow', currentIndex);
	      this.progressBar.setAttribute('aria-valuetext', this.uiElements.accessibility.progressBarText.replace('%current', currentIndex).replace('%max', this.maxIndex));
	    }
	  }, {
	    key: 'move',
	    value: function move(index) {
	      this.numberWidget.setCurrentIndex(index);
	      this.currentProgress.style.width = index / this.maxIndex * 100 + '%';
	      this.updateAriaValues(index);
	      this.progressBar.focus();
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      this.numberWidget.remove();
	      this.progressBar.parentNode.removeChild(this.progressBar);
	    }
	  }, {
	    key: 'attachNumberWidgetTo',
	    value: function attachNumberWidgetTo(container) {
	      this.numberWidget.attachTo(container);
	    }
	  }, {
	    key: 'attachTo',
	    value: function attachTo(container) {
	      container.appendChild(this.progressBar);
	    }
	  }]);

	  return ProgressBar;
	}();

	exports.default = ProgressBar;

/***/ },
/* 18 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 19 */,
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NumberWidget = function () {
	  function NumberWidget(currentIndex, maxIndex) {
	    _classCallCheck(this, NumberWidget);

	    this.numberWidget = document.createElement('div');
	    this.numberWidget.className = 'h5p-questionnaire-progress-bar-widget';
	    this.numberWidget.setAttribute('aria-hidden', 'true');

	    this.currentIndex = document.createElement('div');
	    this.currentIndex.className = 'h5p-questionnaire-progress-bar-widget-current';
	    this.currentIndex.textContent = currentIndex;

	    var separator = document.createElement('div');
	    separator.className = 'h5p-questionnaire-progress-bar-widget-separator';
	    separator.textContent = '/';

	    var maxIndexElement = document.createElement('div');
	    maxIndexElement.className = 'h5p-questionnaire-progress-bar-widget-max';
	    maxIndexElement.textContent = maxIndex;

	    this.numberWidget.appendChild(this.currentIndex);
	    this.numberWidget.appendChild(separator);
	    this.numberWidget.appendChild(maxIndexElement);
	  }

	  _createClass(NumberWidget, [{
	    key: 'setCurrentIndex',
	    value: function setCurrentIndex(index) {
	      this.currentIndex.textContent = index;
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      this.numberWidget.parentNode.removeChild(this.numberWidget);
	    }
	  }, {
	    key: 'attachTo',
	    value: function attachTo(container) {
	      container.appendChild(this.numberWidget);
	    }
	  }]);

	  return NumberWidget;
	}();

	exports.default = NumberWidget;

/***/ },
/* 21 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 22 */,
/* 23 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var QuestionContent = function (_H5P$EventDispatcher) {
	  _inherits(QuestionContent, _H5P$EventDispatcher);

	  function QuestionContent(_ref) {
	    var progressBar = _ref.progressBar;
	    var params = _ref.params;
	    var contentId = _ref.contentId;
	    var requiredField = _ref.requiredField;
	    var index = _ref.index;
	    var uiElements = _ref.uiElements;

	    _classCallCheck(this, QuestionContent);

	    var _this = _possibleConstructorReturn(this, (QuestionContent.__proto__ || Object.getPrototypeOf(QuestionContent)).call(this));

	    _this.progressBar = progressBar;

	    _this.questionnaireElement = document.createElement('div');
	    _this.questionnaireElement.className = 'h5p-questionnaire-element';
	    _this.instance = H5P.newRunnable(params, contentId, H5P.jQuery(_this.questionnaireElement), undefined, { parent: _this });
	    _this.requiredField = requiredField;
	    _this.answered = params.userDatas && params.userDatas.state && params.userDatas.state.length;

	    _this.attachNumberWidget(index);
	    _this.attachRequiredField(requiredField, uiElements);

	    _this.instance.on('xAPI', _this.handleInteraction.bind(_this));
	    return _this;
	  }

	  /**
	   * Attaches number widget if first Question
	   * @param index
	   */


	  _createClass(QuestionContent, [{
	    key: 'attachNumberWidget',
	    value: function attachNumberWidget(index) {
	      var subContentQuestion = this.questionnaireElement.querySelector('.h5p-subcontent-question');
	      if (index === 0 && subContentQuestion) {
	        this.progressBar.attachNumberWidgetTo(subContentQuestion);
	      }
	    }

	    /**
	     * Attaches required field if question is required
	     * @param {boolean} requiredField
	     * @param {Object} uiElements
	     */

	  }, {
	    key: 'attachRequiredField',
	    value: function attachRequiredField(requiredField, uiElements) {
	      if (!requiredField) {
	        return;
	      }

	      var subContentQuestion = this.questionnaireElement.querySelector('.h5p-subcontent-question');
	      this.questionnaireElement.classList.add('h5p-questionnaire-required');
	      var requiredSymbol = document.createElement('div');
	      requiredSymbol.textContent = '* ' + uiElements.requiredText;
	      requiredSymbol.className = 'h5p-questionnaire-required-symbol';
	      if (subContentQuestion) {
	        subContentQuestion.insertBefore(requiredSymbol, subContentQuestion.firstChild);
	      }
	    }

	    /**
	     * Handle interaction on question
	     * @param e
	     */

	  }, {
	    key: 'handleInteraction',
	    value: function handleInteraction(e) {
	      // Handle interacted events
	      if (e.data.statement.verb.id !== "http://adlnet.gov/expapi/verbs/interacted") {
	        return;
	      }

	      // Make sure there was a results response
	      var results = e.data.statement.result.response;

	      // Trim if string
	      if (results.trim) {
	        results = results.trim();
	      }

	      this.answered = !!results.length;
	      this.trigger('handledInteraction');
	    }
	  }, {
	    key: 'getCurrentState',


	    /**
	     * Get current state
	     * @return {*}
	     */
	    value: function getCurrentState() {
	      return this.instance.getCurrentState ? this.instance.getCurrentState() : null;
	    }

	    /**
	     * Get element
	     * @return {Element}
	     */

	  }, {
	    key: 'getElement',
	    value: function getElement() {
	      return this.questionnaireElement;
	    }

	    /**
	     * Check if question requires an answer
	     * @return {boolean}
	     */

	  }, {
	    key: 'isRequired',
	    value: function isRequired() {
	      return this.requiredField;
	    }

	    /**
	     * Check if question is answered
	     * @return {boolean}
	     */

	  }, {
	    key: 'isAnswered',
	    value: function isAnswered() {
	      return this.answered;
	    }

	    /**
	     * Toggle visibility of question
	     * @param {boolean} hide
	     */

	  }, {
	    key: 'hideElement',
	    value: function hideElement(hide) {
	      this.questionnaireElement.classList.toggle('hide', hide);
	    }

	    /**
	     * Set question activity as started if possible
	     */

	  }, {
	    key: 'setActivityStarted',
	    value: function setActivityStarted() {
	      if (this.instance.setActivityStarted) {
	        this.instance.setActivityStarted();
	      }
	    }
	  }]);

	  return QuestionContent;
	}(H5P.EventDispatcher);

	exports.default = QuestionContent;

/***/ }
/******/ ]);
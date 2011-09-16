/*
 *  html5  placeholder组件
 *  
 *  1. 默认绑定在KISSY中,  使用方式 KISSY.placeholder(container);
 *  2. 加载此js, 会直接进行初始化
 *  3. 调用方法后, 会遍历container下面的所有input与textarea
 *
 *  @author daolin
 *  @date   2011.09.17
 */
KISSY.ready(function(S) {
	var placeholder = function(container) {
		var support = "placeholder" in document.createElement("input");
		if (support) {
			return ;
		}

		var S = KISSY, D = S.DOM, E = S.Event;
		container = D.get(container) || document;
		if(container.tagName == 'INPUT' || container.tagName == 'TEXTAREA') {
			_activePlaceholder(container);
		} else {
			S.each(S.query('INPUT', container), _activePlaceholder); 
			S.each(S.query('TEXTAREA', container), _activePlaceholder);
		}

		function _activePlaceholder(el) {
			var ATTR = "placeholder", CLASS = "placeholder";
			var TIP = el.getAttribute(ATTR);
			if (!TIP) return ;

			E.on(el, 'focusin', function(ev){
				_hidePlaceholder(el, CLASS, "");
			});
			E.on(el, 'focusout', function(ev){
				_showPlaceholder(el, CLASS, TIP);
			});
			E.on(window, 'unload', function(ev) {   //主要是解决firefox3.6刷新问题
				_hidePlaceholder(el, CLASS, "");
			});
			if (el.form) {
				E.on(el.form, 'submit', function(ev) {
					_hidePlaceholder(el, CLASS, "");
				});
			}
			_showPlaceholder(el, CLASS, TIP);
		}
					
		function _showPlaceholder(el, className, value) {
			if (!D.hasClass(el, className) && !el.value) {
				el.value = value;
				D.addClass(el, className);
			}
		}
		 
		function _hidePlaceholder(el, className, value) {
			if (D.hasClass(el, className)) {
				el.value = value;
				D.removeClass(el, className);
			}
		}
	};
	
	KISSY.placeholder = placeholder;

	S.placeholder();
});
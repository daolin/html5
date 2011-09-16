/*
 *  html5  placeholder���
 *  
 *  1. Ĭ�ϰ���KISSY��,  ʹ�÷�ʽ KISSY.placeholder(container);
 *  2. ���ش�js, ��ֱ�ӽ��г�ʼ��
 *  3. ���÷�����, �����container���������input��textarea
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
			E.on(window, 'unload', function(ev) {   //��Ҫ�ǽ��firefox3.6ˢ������
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
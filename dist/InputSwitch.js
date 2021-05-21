var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _myLocalStorage, _changeEventListener, _clickEventListener, _keydownEventListener;
/**
 * <input type="switch">
 */
export default class InputSwitch extends HTMLElement {
    constructor() {
        super();
        _myLocalStorage.set(this, null);
        _changeEventListener.set(this, void 0);
        _clickEventListener.set(this, void 0);
        _keydownEventListener.set(this, void 0);
        try {
            __classPrivateFieldSet(this, _myLocalStorage, localStorage);
        }
        catch (e) {
            console.info('Storage access blocked.');
        }
        const cssString = `
			:host {
				--switch-width: 3.6em; /* 外枠の幅 */
				--switch-height: 1.8em; /* 外枠の高さ */
				--switch-padding: .2em; /* 外枠と球の間隔（マイナス値指定可能） */
				--switch-bgcolor-on: #29f; /* オンの時の背景色 */
				--switch-bgcolor-off: #ccc; /* オフの時の背景色 */
				--switch-bgcolor-disabled-on: #666; /* [disabled] オンの時の背景色 */
				--switch-bgcolor-disabled-off: #666; /* [disabled] オフの時の背景色 */
				--switch-ball-color: #fff; /* スライダーの球の色（background プロパティ） */
				--switch-animation-duration: .5s; /* アニメーションに掛かる時間（transition-duration プロパティ） */
				--switch-outline-mouse-focus: none; /* マウスフォーカス時のフォーカスインジゲーター（outline プロパティ） */

				position: relative;
				display: inline-block;
				width: var(--switch-width);
				height: var(--switch-height);
			}

			:host(:focus:not(:focus-visible)) {
				outline: var(--switch-outline-mouse-focus);
			}

			.slider {
				--switch-bgcolor: var(--switch-bgcolor-off);

				border-radius: var(--switch-height);
				position: absolute;
				inset: 0;
				background: var(--switch-bgcolor);
				transition: background var(--switch-animation-duration);
			}

			@supports not (inset: 0) {
				.slider {
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
				}
			}

			.slider::before {
				--switch-ball-diameter: calc(var(--switch-height) - var(--switch-padding) * 2);
				--switch-ball-transform: translateX(0);

				border-radius: 50%;
				content: "";
				width: var(--switch-ball-diameter);
				height: var(--switch-ball-diameter);
				position: absolute;
				inset: var(--switch-padding);
				background: var(--switch-ball-color);
				transform: var(--switch-ball-transform);
				transition: transform var(--switch-animation-duration);
			}

			@supports not (inset: 0) {
				.slider::before {
					top: var(--switch-padding);
					left: var(--switch-padding);
				}
			}

			:host([checked]) .slider {
				--switch-bgcolor: var(--switch-bgcolor-on);
			}

			:host([checked]) .slider::before {
				--switch-ball-transform: translateX(calc(var(--switch-width) - var(--switch-height)));
			}

			:host([disabled]) .slider {
				--switch-bgcolor: var(--switch-bgcolor-disabled-off);
			}
			:host([disabled][checked]) .slider {
				--switch-bgcolor: var(--switch-bgcolor-disabled-on);
			}
		`;
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
			<span class="slider"></span>
		`;
        if (shadow.adoptedStyleSheets !== undefined) {
            const cssStyleSheet = new CSSStyleSheet();
            cssStyleSheet.replaceSync(cssString);
            shadow.adoptedStyleSheets = [cssStyleSheet];
        }
        else {
            /* adoptedStyleSheets 未対応環境 */
            shadow.innerHTML += `<style>${cssString}</style>`;
        }
        __classPrivateFieldSet(this, _changeEventListener, this._changeEvent.bind(this));
        __classPrivateFieldSet(this, _clickEventListener, this._clickEvent.bind(this));
        __classPrivateFieldSet(this, _keydownEventListener, this._keydownEvent.bind(this));
    }
    static get formAssociated() {
        return true;
    }
    static get observedAttributes() {
        return ['checked', 'disabled', 'storage-key'];
    }
    connectedCallback() {
        const checked = this.checked;
        const disabled = this.disabled;
        if (__classPrivateFieldGet(this, _myLocalStorage) !== null) {
            const storageKey = this.storageKey;
            if (storageKey !== null && storageKey !== '') {
                /* ストレージから前回アクセス時のチェック情報を取得する */
                const storageValue = __classPrivateFieldGet(this, _myLocalStorage).getItem(storageKey);
                switch (storageValue) {
                    case 'true':
                        if (!checked) {
                            this.checked = true;
                        }
                        break;
                    case 'false':
                        if (checked) {
                            this.checked = false;
                        }
                        break;
                }
            }
        }
        this.tabIndex = disabled ? -1 : 0;
        this.setAttribute('role', 'switch');
        this.setAttribute('aria-checked', String(checked));
        this.setAttribute('aria-disabled', String(disabled));
        if (!disabled) {
            this.addEventListener('change', __classPrivateFieldGet(this, _changeEventListener), { passive: true });
            this.addEventListener('click', __classPrivateFieldGet(this, _clickEventListener));
            this.addEventListener('keydown', __classPrivateFieldGet(this, _keydownEventListener));
        }
    }
    disconnectedCallback() {
        this.removeEventListener('change', __classPrivateFieldGet(this, _changeEventListener));
        this.removeEventListener('click', __classPrivateFieldGet(this, _clickEventListener));
        this.removeEventListener('keydown', __classPrivateFieldGet(this, _keydownEventListener));
    }
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case 'checked': {
                const checked = newValue !== null;
                this.setAttribute('aria-checked', String(checked));
                break;
            }
            case 'disabled': {
                const disabled = newValue !== null;
                this.setAttribute('aria-disabled', String(disabled));
                if (disabled) {
                    this.tabIndex = -1;
                    this.removeEventListener('change', __classPrivateFieldGet(this, _changeEventListener));
                    this.removeEventListener('click', __classPrivateFieldGet(this, _clickEventListener));
                    this.removeEventListener('keydown', __classPrivateFieldGet(this, _keydownEventListener));
                    this.blur();
                }
                else {
                    this.tabIndex = 0;
                    this.addEventListener('change', __classPrivateFieldGet(this, _changeEventListener), { passive: true });
                    this.addEventListener('click', __classPrivateFieldGet(this, _clickEventListener));
                    this.addEventListener('keydown', __classPrivateFieldGet(this, _keydownEventListener));
                }
                break;
            }
            case 'storage-key': {
                break;
            }
        }
    }
    get checked() {
        return this.getAttribute('checked') !== null;
    }
    set checked(value) {
        if (typeof value !== 'boolean') {
            throw new TypeError(`Only a boolean value can be specified for the \`checked\` attribute of the <${this.localName}> element.`);
        }
        if (value) {
            this.setAttribute('checked', '');
        }
        else {
            this.removeAttribute('checked');
        }
    }
    get disabled() {
        return this.getAttribute('disabled') !== null;
    }
    set disabled(value) {
        if (typeof value !== 'boolean') {
            throw new TypeError(`Only a boolean value can be specified for the \`disabled\` attribute of the <${this.localName}> element.`);
        }
        if (value) {
            this.setAttribute('disabled', '');
        }
        else {
            this.removeAttribute('disabled');
        }
    }
    get storageKey() {
        return this.getAttribute('storage-key');
    }
    set storageKey(value) {
        if (value === null) {
            this.removeAttribute('storage-key');
            return;
        }
        if (typeof value !== 'string') {
            throw new TypeError(`Only a string value can be specified for the \`storage-key\` attribute of the <${this.localName}> element.`);
        }
        this.setAttribute('storage-key', value);
    }
    /**
     * スイッチの状態を変更する
     */
    _changeEvent() {
        const checked = this.checked;
        this.checked = !checked;
        if (__classPrivateFieldGet(this, _myLocalStorage) !== null) {
            const storageKey = this.storageKey;
            if (storageKey !== null && storageKey !== '') {
                /* スイッチのチェック情報をストレージに保管する */
                __classPrivateFieldGet(this, _myLocalStorage).setItem(storageKey, String(!checked));
            }
        }
    }
    /**
     * スイッチをクリックしたときの処理
     *
     * @param {MouseEvent} ev - Event
     */
    _clickEvent(ev) {
        this.dispatchEvent(new Event('change'));
        ev.preventDefault();
    }
    /**
     * スイッチにフォーカスした状態でキーボードが押された時の処理
     *
     * @param {KeyboardEvent} ev - Event
     */
    _keydownEvent(ev) {
        switch (ev.key) {
            case ' ':
                this.dispatchEvent(new Event('change'));
                ev.preventDefault();
                break;
        }
    }
}
_myLocalStorage = new WeakMap(), _changeEventListener = new WeakMap(), _clickEventListener = new WeakMap(), _keydownEventListener = new WeakMap();
//# sourceMappingURL=InputSwitch.js.map
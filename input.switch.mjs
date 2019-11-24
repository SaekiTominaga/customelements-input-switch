/**
 * <input type="switch">
 *
 * @example
 * <x-input-switch
 *   checked="【任意】コントロールがチェックされているかどうか"
 *   disabled="【任意】コントロールが無効であるかどうか"
 *   storage-key="【任意】コントロールを切り替えたとき、この値を localStorage のキーとして保存する（値はチェック状態によって true / false のいずれかとなる）"
 *   polyfill="【任意】`hidden`  : カスタム要素 v1 未対応ブラウザ（Microsoft Edge 44 等）では関連する <label> を含めて非表示にする
 *                     `checkbox`: カスタム要素 v1 未対応ブラウザ（Microsoft Edge 44 等）では代替に <input type=checkbox> を生成する">
 * </x-input-switch>
 *
 * @version 1.2.1 2019-11-23 HTML属性の初期設定をコンストラクタから connectedCallback() に移動
 */
export default class InputSwitch extends HTMLElement {
	static get observedAttributes() {
		return ['checked', 'disabled'];
	}

	static get formAssociated() {
		return true;
	}

	constructor() {
		super();

		try {
			this._myLocalStorage = localStorage;
		} catch(e) {
			console.info('Storage access blocked.');
		}

		this.attachShadow({mode: 'open'}).innerHTML = `
			<style>
				:host {
					--switch-width: 3.6em; /* 外枠の幅 */
					--switch-height: 1.8em; /* 外枠の高さ */
					--switch-padding: .2em; /* 外枠と円の間隔 */
					--switch-color-on: #29f; /* オンの時の背景色 */
					--switch-color-off: #ccc; /* オフの時の背景色 */
					--switch-animation-duration: .5s; /* アニメーションに掛かる時間 */

					display: inline-block;
					position: relative;
					height: var(--switch-height);
					width: var(--switch-width);
					vertical-align: top;
				}

				.slider {
					--switch-color: var(--switch-color-off);

					border-radius: var(--switch-height);
					height: var(--switch-height);
					width: var(--switch-width);
					position: absolute;
					top: 0;
					left: 0;
					background: var(--switch-color);
					transition: background-color var(--switch-animation-duration);
				}

				.slider::before {
					--switch-circle-diameter: calc(var(--switch-height) - var(--switch-padding) * 2);

					border-radius: 50%;
					content: "";
					height: var(--switch-circle-diameter);
					width: var(--switch-circle-diameter);
					position: absolute;
					left: var(--switch-padding);
					top: var(--switch-padding);
					background: #fff;
					transition: transform var(--switch-animation-duration);
				}

				:host([checked]) .slider {
					--switch-color: var(--switch-color-on);
				}

				:host([checked]) .slider::before {
					transform: translateX(calc(3.6em - 1.8em)); /* TODO Edge 18 はここにカスタムプロパティを使うと認識されない */
				}
			</style>
			<span class="slider"></span>
		`;

		this._changeEventListener = this._changeEvent.bind(this);
	}

	connectedCallback() {
		const hostElement = this;

		hostElement.setAttribute('role', 'switch');

		const storageKey = hostElement.getAttribute('storage-key');
		this._storageKey = storageKey;

		if (storageKey !== null && storageKey !== '') {
			/* ストレージから前回アクセス時のチェック情報を取得する */
			try {
				const storageValue = this._myLocalStorage.getItem(storageKey);
				switch (storageValue) {
					case 'true':
						hostElement.checked = true;
						break;
					case 'false':
						hostElement.checked = false;
						break;
				}
			} catch(e) {
				/* ストレージ無効環境やプライベートブラウジング時 */
			}
		}

		hostElement.setAttribute('aria-checked', hostElement.checked);
		if (!hostElement.disabled) {
			hostElement.tabIndex = 0;
		} else {
			hostElement.setAttribute('aria-disabled', 'true');
		}

		hostElement.addEventListener('click', this._changeEventListener);
		hostElement.addEventListener('keydown', this._changeEventListener);
	}

	disconnectedCallback() {
		const hostElement = this;

		hostElement.removeEventListener('click', this._changeEventListener);
		hostElement.removeEventListener('keydown', this._changeEventListener);
	}

	/**
	 * スイッチの状態を変更する
	 *
	 * @param {Event} ev - Event
	 */
	_changeEvent(ev) {
		const hostElement = this;

		const exec = (hostElement) => {
			if (!hostElement.disabled) {
				const checked = !hostElement.checked;

				hostElement.checked = checked;
				hostElement.dispatchEvent(new Event('change'));

				const storageKey = this._storageKey;
				if (storageKey !== null && storageKey !== '') {
					/* コントロールのチェック情報をストレージに保管する */
					try {
						this._myLocalStorage.setItem(storageKey, checked);
					} catch(e) {
						/* ストレージ無効環境やプライベートブラウジング時 */
					}
				}
			}
		}

		switch (ev.type) {
			case 'click':
				exec(hostElement);
				break;
			case 'keydown':
				switch (ev.key) {
					case ' ':
						exec(hostElement);
						ev.preventDefault();
						break;
				}
				break;
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'checked': {
				const checked = newValue !== null;

				this.setAttribute('aria-checked', checked);
				break;
			}
			case 'disabled': {
				const disabled = newValue !== null;

				if (disabled) {
					this.removeAttribute('tabindex');
					this.blur();
				} else {
					this.tabIndex = 0;
				}
				this.setAttribute('aria-disabled', disabled);
				break;
			}
		}
	}

	get checked() {
		return this.getAttribute('checked') !== null;
	}
	set checked(value) {
		if (typeof value !== 'boolean') {
			console.warn('Only a boolean value can be specified for the `checked` attribute of the <x-input-switch> element.');
			return;
		}

		if (value) {
			this.setAttribute('checked', '');
		} else {
			this.removeAttribute('checked');
		}
	}

	get disabled() {
		return this.getAttribute('disabled') !== null;
	}
	set disabled(value) {
		if (typeof value !== 'boolean') {
			console.warn('Only a boolean value can be specified for the `disabled` attribute of the <x-input-switch> element.');
			return;
		}

		if (value) {
			this.setAttribute('disabled', '');
		} else {
			this.removeAttribute('disabled');
		}
	}
}

/**
 * Custom Elements 未対応ブラウザ向けの処理
 *
 * @param {string} customElementName - カスタム要素名
 *
 * @version 2.0.0 2019-11-23 polyfill属性対応
 */
export const polyfill = (customElementName) => {
	document.addEventListener('DOMContentLoaded', () => {
		for (const customElement of document.getElementsByTagName(customElementName)) {
			switch (customElement.getAttribute('polyfill')) {
				case 'hidden': {
					/* 未対応ブラウザでは関連する <label> を含めて非表示にする */
					const implicitLabelElement = customElement.closest('label');
					if (implicitLabelElement !== null) {
						implicitLabelElement.hidden = true;
					} else {
						const id = customElement.id;
						if (id !== '') {
							for (const explicitLabelElement of document.querySelectorAll(`label[for="${id}"]`)) {
								explicitLabelElement.hidden = true;
							}
						}

						customElement.hidden = true;
					}
					break;
				}
				case 'checkbox': {
					/* 未対応ブラウザでは代替に <input type=checkbox> を生成する */
					const checkboxElement = document.createElement('input');
					checkboxElement.type = 'checkbox';

					/* ID を移行 */
					const id = customElement.id;
					if (id !== '') {
						customElement.removeAttribute('id');
						checkboxElement.id = id;
					}

					/* ID を除くすべての属性をコピー */
					for (const attribute of customElement.attributes) {
						checkboxElement.setAttribute(attribute.name, attribute.value);
					}

					/* 生成した <input type="checkbox"> を挿入し、元のカスタム要素は非表示にする */
					customElement.insertAdjacentElement('afterend', checkboxElement);
					customElement.hidden = true;
				}
			}
		}
	});
}

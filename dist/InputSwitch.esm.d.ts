/**
 * <input type="switch">
 *
 * @version 2.1.0
 */
export default class InputSwitch extends HTMLElement {
    #private;
    static get formAssociated(): boolean;
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, _oldValue: string, newValue: string): void;
    get checked(): boolean;
    set checked(value: boolean);
    get disabled(): boolean;
    set disabled(value: boolean);
    get storageKey(): string | null;
    set storageKey(value: string | null);
    /**
     * スイッチの状態を変更する
     */
    private _changeEvent;
    /**
     * スイッチをクリックしたときの処理
     *
     * @param {MouseEvent} ev - Event
     */
    private _clickEvent;
    /**
     * スイッチにフォーカスした状態でキーボードが押された時の処理
     *
     * @param {KeyboardEvent} ev - Event
     */
    private _keydownEvent;
}
//# sourceMappingURL=InputSwitch.esm.d.ts.map
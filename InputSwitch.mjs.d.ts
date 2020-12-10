/**
 * <input type="switch">
 *
 * @example
 * <x-input-switch
 *   checked="[Optional] Whether the control is checked."
 *   disabled="[Optional] Whether the form control is disabled."
 *   storage-key="[Optional] Save this value as localStorage key when switching controls. (value is `true` or `false` depending on the check state)"
 * </x-input-switch>
 *
 * @version 2.0.2
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

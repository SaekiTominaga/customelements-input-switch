# &lt;w0s-input-switch&gt;

## Sample

- [Sample](https://saekitominaga.github.io/customelements-input-switch/sample.html)

## Attributes

<dl>
<dt>checked [optional]</dt>
<dd>Whether the control is checked. (Same as <a href="https://html.spec.whatwg.org/multipage/input.html#attr-input-checked">checked attribute of &lt;input&gt; Element</a>)</dd>
<dt>disabled [optional]</dt>
<dd>Whether the form control is disabled. (Same as <a href="https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-disabled">disabled attribute of &lt;input&gt; Element</a>)</dd>
<dt>storage-key [optional]</dt>
<dd>Save this value as localStorage key when switching controls. (value is `true` or `false` depending on the check state)</dd>
<dt>polyfill [optional]</dt>
<dd>`hidden`: In browsers that do not support Custom Elements v1 (e.g. Microsoft Edge 44), hide the associated with this control.</dd>
<dd>`checkbox`: In browsers that do not support Custom Elements v1 (e.g. Microsoft Edge 44), generate &lt;input type=checkbox&gt; instead.</dd>
</dl>

e.g. `<label><w0s-input-switch checked="" storage-key="ctrl3" polyfill="hidden"></w0s-input-switch> input switch 3</label>`

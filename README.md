# &lt;w0s-input-switch&gt;

[![npm version](https://badge.fury.io/js/%40saekitominaga%2Fcustomelements-input-switch.svg)](https://badge.fury.io/js/%40saekitominaga%2Fcustomelements-input-switch)

Implement something like &lt;input type=switch&gt; in a Custom Elements.

## Demo

- [Demo page](https://saekitominaga.github.io/customelements-input-switch/demo.html)

## Attributes

<dl>
<dt>checked [optional]</dt>
<dd>Whether the control is checked. (Same as <a href="https://html.spec.whatwg.org/multipage/input.html#attr-input-checked">checked attribute of &lt;input&gt; Element</a>)</dd>
<dt>disabled [optional]</dt>
<dd>Whether the form control is disabled. (Same as <a href="https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-disabled">disabled attribute of &lt;input&gt; Element</a>)</dd>
<dt>storage-key [optional]</dt>
<dd>Save this value as localStorage key when switching controls. (value is `true` or `false` depending on the check state)</dd>
</dl>

e.g. `<label><w0s-input-switch checked="" disabled="" storage-key="ctrl"></w0s-input-switch> input switch</label>`

\* The `polyfill` attribute that existed in version 1 series is obsolete in version 2.0.0 .

## Style customization (CSS custom properties)

| name | deault | Description |
|-|-|-|-|-|
| --switch-width | 3.6em | Outer frame width |
| --switch-height | 1.8em | Outer frame height |
| --switch-padding | 0.2em | Spacing between the outer frame and the sphere (Negative value can be specified) |
| --switch-bgcolor-on | #2299ff | Background color when \`on\` |
| --switch-bgcolor-off | #cccccc | Background color when \`off\` |
| --switch-bgcolor-disabled-on | #666666 | [disabled] Background color when \`on\` |
| --switch-bgcolor-disabled-off | #666666 | [disabled] Background color when \`off\` |
| --switch-ball-color | #ffffff | Slider sphere color (background property) |
| --switch-animation-duration | 0.5s | Time a transition animation (transition-duration property) |
| --switch-outline-mouse-focus | none | Focus indicator on mouse-focus (outline property) |

\* CSS custom properties names have changed in the version 2.0.0 update. **(Not compatible with version 1 series)**

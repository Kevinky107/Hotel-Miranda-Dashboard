"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreenButton = void 0;
var styled_components_1 = require("styled-components");
exports.GreenButton = styled_components_1.styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border-radius: 0.5em;\n  border: none;\n  padding: 0.8em;\n  padding-inline: 4em;\n\n  ", "\n\n  &:hover{\n    cursor: pointer\n  }\n"], ["\n  border-radius: 0.5em;\n  border: none;\n  padding: 0.8em;\n  padding-inline: 4em;\n\n  ", "\n\n  &:hover{\n    cursor: pointer\n  }\n"])), function (props) { return props.theme === 'light' ? "\n    background: #EBF1EF;\n    color: #135846;\n    " : "\n    background: #135846;\n    color: white;\n    "; });
var templateObject_1;

/**
 * Fake react file to allow us to use .jsx without importing all of React
 * for no reason.
 *
 * https://stackoverflow.com/a/42405694/3453504
 */

const React = {
    createElement: function (tag, attrs, children) {
        var element = document.createElement(tag);

        for (let name in attrs) {
            if (name && attrs.hasOwnProperty(name)) {
                let value = attrs[name];
                if (value === true) {
                    element.setAttribute(name, name);
                } else if (value !== false && value != null) {
                    element.setAttribute(name, value.toString());
                }
            }
        }
        for (let i = 2; i < arguments.length; i++) {
            let child = arguments[i];
            element.appendChild(
                child.nodeType == null ?
                    document.createTextNode(child.toString()) : child);
        }
        return element;
    }
};

var NodeUpdate = (function () {
    function NodeUpdate() {
    }
    NodeUpdate.hasChanged = function (node1, node2) {
        if (node1.nodeType !== node2.nodeType)
            return true;
        if (node1.nodeName !== node2.nodeName)
            return true;
        if (node1.nodeType == Node.TEXT_NODE && node1.textContent !== node2.textContent)
            return true;
        return false;
    };
    NodeUpdate.updateAttributes = function (oldNode, newNode) {
        var attrToRm = oldNode.getAttributeNames().filter(function (attr) { return newNode.getAttributeNames().indexOf(attr) === -1; });
        attrToRm.forEach(function (attr) { return oldNode.removeAttribute(attr); });
        for (var i = 0; i < newNode.attributes.length; ++i) {
            oldNode.setAttribute(newNode.attributes[i].name, newNode.attributes[i].value);
        }
    };
    NodeUpdate.updateChildren = function (oldNode, newNode) {
        var newNodeLength = newNode.children.length;
        var oldNodeLength = oldNode.children.length;
        var maxLength = Math.max(newNodeLength, oldNodeLength);
        for (var i = 0; i < maxLength; i++) {
            if (i >= oldNodeLength) {
                try {
                    oldNode.appendChild(newNode.children[oldNodeLength]);
                }
                catch (e) {
                    console.log(e);
                }
            }
            else if (i >= newNodeLength) {
                oldNode.removeChild(oldNode.children[newNodeLength]);
            }
            else {
                if (NodeUpdate.hasChanged(oldNode.children[i], newNode.children[i])) {
                    oldNode.replaceChild(newNode.children[i], oldNode.children[i]);
                }
                else {
                    NodeUpdate.updateAttributes(oldNode.children[i], newNode.children[i]);
                    NodeUpdate.updateChildren(oldNode.children[i], newNode.children[i]);
                }
            }
        }
    };
    NodeUpdate.updateDiv = function (id, html) {
        var oldDiv = document.getElementById(id);
        if (oldDiv != null) {
            var newdiv = document.createElement('div');
            newdiv.innerHTML = html;
            NodeUpdate.updateChildren(oldDiv, newdiv);
        }
    };
    return NodeUpdate;
}());
//# sourceMappingURL=NodeUpdate.js.map
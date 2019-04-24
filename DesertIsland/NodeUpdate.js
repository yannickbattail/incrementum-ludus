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
    NodeUpdate.updateChildNodes = function (oldNode, newNode) {
        var newNodeLength = newNode.childNodes.length;
        var oldNodeLength = oldNode.childNodes.length;
        var maxLength = Math.max(newNodeLength, oldNodeLength);
        for (var i = 0; i < maxLength; i++) {
            if (i >= oldNodeLength) {
                try {
                    oldNode.appendChild(newNode.childNodes[oldNodeLength]);
                }
                catch (e) {
                    console.log(e);
                }
            }
            else if (i >= newNodeLength) {
                oldNode.removeChild(oldNode.childNodes[newNodeLength]);
            }
            else {
                if (NodeUpdate.hasChanged(oldNode.childNodes[i], newNode.childNodes[i])) {
                    oldNode.replaceChild(newNode.childNodes[i], oldNode.childNodes[i]);
                }
                else {
                    NodeUpdate.updateChildNodes(oldNode.childNodes[i], newNode.childNodes[i]);
                }
            }
        }
    };
    NodeUpdate.updateDiv = function (id, html) {
        var oldDiv = document.getElementById(id);
        if (oldDiv != null) {
            var newdiv = document.createElement('div');
            newdiv.innerHTML = html;
            NodeUpdate.updateChildNodes(oldDiv, newdiv);
        }
    };
    return NodeUpdate;
}());
//# sourceMappingURL=NodeUpdate.js.map
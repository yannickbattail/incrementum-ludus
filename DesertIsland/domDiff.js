function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.type !== node2.type;
}
function updateElement($parent, oldNode, newNode, index) {
    if (index === void 0) { index = 0; }
    if (!oldNode) {
        $parent.appendChild(newNode);
    }
    else if (!newNode) {
        $parent.removeChild($parent.childNodes[index]);
    }
    else if (changed(newNode, oldNode)) {
        $parent.replaceChild(newNode, $parent.childNodes[index]);
    }
    else if (newNode.type) {
        var newLength = newNode.children.length;
        var oldLength = oldNode.children.length;
        for (var i = 0; i < newLength || i < oldLength; i++) {
            updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
        }
    }
}
function hasChanged(node1, node2) {
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.nodeType !== node2.nodeType;
}
function updateChildNodes(oldNode, newNode) {
    var newNodeLength = newNode.childNodes.length;
    var oldNodeLength = oldNode.childNodes.length;
    var maxLength = Math.max(newNodeLength, oldNodeLength);
    for (var i = 0; i < maxLength; i++) {
        if (i >= oldNodeLength) {
            oldNode.appendChild(newNode.childNodes[i]);
        }
        else if (i >= newNodeLength) {
            oldNode.removeChild(oldNode.childNodes[i]);
        }
        else {
            if (hasChanged(oldNode.childNodes[i], newNode.childNodes[i])) {
                oldNode.replaceChild(newNode.childNodes[i], oldNode.childNodes[i]);
            }
            else {
                updateChildNodes(oldNode.childNodes[i], newNode.childNodes[i]);
            }
        }
    }
}
//# sourceMappingURL=domDiff.js.map
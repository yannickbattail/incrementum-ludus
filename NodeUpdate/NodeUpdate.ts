
class NodeUpdate {

    public static hasChanged(node1 : Node, node2 : Node) {
        if (node1.nodeType !== node2.nodeType)
            return true;
        if (node1.nodeName !== node2.nodeName)
            return true;
        if (node1.nodeType == Node.TEXT_NODE && node1.textContent !== node2.textContent) 
            return true;

        return false;
    }
    
    public static updateAttributes(oldNode : Element, newNode : Element) {
        let attrToRm = oldNode.getAttributeNames().filter(attr => newNode.getAttributeNames().indexOf(attr) === -1);
        attrToRm.forEach(attr => oldNode.removeAttribute(attr));

        for(var i = 0; i < newNode.attributes.length; ++i) {
            if ((!oldNode.hasAttribute(newNode.attributes[i].name))
                || (oldNode.getAttribute(newNode.attributes[i].name) != newNode.attributes[i].value)) {
                oldNode.setAttribute(newNode.attributes[i].name, newNode.attributes[i].value);
            }
        }
    }

    public static updateChildren(oldNode : Node, newNode : Node) {
        let newNodeLength = newNode.childNodes.length
        let oldNodeLength = oldNode.childNodes.length;
        let maxLength = Math.max(newNodeLength, oldNodeLength);
        for (let i = 0; i < maxLength; i++) {
            if (i >= oldNodeLength) {
                try {
                    oldNode.appendChild(newNode.childNodes[i].cloneNode(true));
                } catch (e) {
                    console.log(e);
                }
            } else if (i >= newNodeLength) {
                oldNode.removeChild(oldNode.childNodes[newNodeLength]);
            } else {
                let oldChild = oldNode.childNodes[i];
                let newChild = newNode.childNodes[i];
                if (NodeUpdate.hasChanged(oldChild, newChild)) {
                    oldNode.replaceChild(newChild.cloneNode(true), oldChild);
                } else {
                    NodeUpdate.updateChildren(oldChild, newChild);

                    if (oldChild instanceof HTMLElement && newChild instanceof HTMLElement) {
                        NodeUpdate.updateAttributes(oldChild, newChild);
                    }
                }
            }
        }
    }

    public static updateDiv(id : string, html : string) {
        var oldDiv = document.getElementById(id);
        if (oldDiv != null) {
            var newdiv = document.createElement('div');
            newdiv.innerHTML = html;
            NodeUpdate.updateChildren(oldDiv, newdiv);
        }
    }
}

class NodeUpdate {

    public static hasChanged(node1 : Element, node2 : Element) {
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

    public static updateChildren(oldNode : Element, newNode : Element) {
        let newNodeLength = newNode.children.length
        let oldNodeLength = oldNode.children.length;
        let maxLength = Math.max(newNodeLength, oldNodeLength);
        for (let i = 0; i < maxLength; i++) {
            if (i >= oldNodeLength) {
                try {
                    oldNode.appendChild(newNode.children[oldNodeLength]);
                } catch (e) {
                    console.log(e);
                }
            } else if (i >= newNodeLength) {
                oldNode.removeChild(oldNode.children[newNodeLength]);
            } else {
                if (NodeUpdate.hasChanged(oldNode.children[i], newNode.children[i])) {
                    oldNode.replaceChild(newNode.children[i], oldNode.children[i]);
                } else {
                    NodeUpdate.updateAttributes(oldNode.children[i], newNode.children[i]);
                    NodeUpdate.updateChildren(oldNode.children[i], newNode.children[i]);
                    NodeUpdate.updateAttributes(oldNode.children[i], newNode.children[i]);
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
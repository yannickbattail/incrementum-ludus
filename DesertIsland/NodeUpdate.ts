
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
        let newNodeLength = newNode.attributes.length
        let oldNodeLength = oldNode.attributes.length;
        let maxLength = Math.max(newNodeLength, oldNodeLength);
        for(var i = maxLength - 1; i >= 0; i--) {
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
                }
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
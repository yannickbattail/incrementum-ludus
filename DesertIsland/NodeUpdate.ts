
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
      
    public static updateChildNodes(oldNode : Node, newNode : Node) {
        let newNodeLength = newNode.childNodes.length
        let oldNodeLength = oldNode.childNodes.length;
        let maxLength = Math.max(newNodeLength, oldNodeLength);
        for (let i = 0; i < maxLength; i++) {
            if (i >= oldNodeLength) {
                try {
                    oldNode.appendChild(newNode.childNodes[oldNodeLength]);
                } catch (e) {
                    console.log(e);
                }
            } else if (i >= newNodeLength) {
                oldNode.removeChild(oldNode.childNodes[newNodeLength]);
            } else {
                if (NodeUpdate.hasChanged(oldNode.childNodes[i], newNode.childNodes[i])) {
                    oldNode.replaceChild(newNode.childNodes[i], oldNode.childNodes[i]);
                } else {
                    NodeUpdate.updateChildNodes(oldNode.childNodes[i], newNode.childNodes[i]);
                }
            }
        }
    }

    public static updateDiv(id : string, html : string) {
        var oldDiv = document.getElementById(id);
        if (oldDiv != null) {
            var newdiv = document.createElement('div');
            newdiv.innerHTML = html;
            NodeUpdate.updateChildNodes(oldDiv, newdiv);
        }
    }
}
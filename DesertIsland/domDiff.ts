
//from https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060

function changed(node1 : any, node2 : any) {
  return typeof node1 !== typeof node2 ||
          typeof node1 === 'string' && node1 !== node2 ||
          node1.type !== node2.type
}

function updateElement($parent : any, oldNode : any, newNode : any, index = 0) {
  if (!oldNode) {
    $parent.appendChild(
      newNode
    );
  } else if (!newNode) {
    $parent.removeChild(
      $parent.childNodes[index]
    );
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(
      newNode,
      $parent.childNodes[index]
    );
  } else if (newNode.type) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}

function hasChanged(node1 : Node, node2 : Node) {
  return typeof node1 !== typeof node2 ||
          typeof node1 === 'string' && node1 !== node2 ||
          node1.nodeType !== node2.nodeType
}

function updateChildNodes(oldNode : Node, newNode : Node) {
  const newNodeLength = newNode.childNodes.length
  const oldNodeLength = oldNode.childNodes.length;
  const maxLength = Math.max(newNodeLength, oldNodeLength);
  for (let i = 0; i < maxLength; i++) {
    if (i >= oldNodeLength) {
      oldNode.appendChild(newNode.childNodes[i]);
    } else if (i >= newNodeLength) {
      oldNode.removeChild(oldNode.childNodes[i]);
    } else {
      if (hasChanged(oldNode.childNodes[i], newNode.childNodes[i])) {
        oldNode.replaceChild(newNode.childNodes[i], oldNode.childNodes[i]);
      } else {
        updateChildNodes(oldNode.childNodes[i], newNode.childNodes[i]);
      }
    }
  }
}

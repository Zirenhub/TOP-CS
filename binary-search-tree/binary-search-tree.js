class Node {
  constructor(d) {
    this.d = d;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = removeDup(arr);
    this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
    this.preorderData = [];
    this.inorderData = [];
    this.postorderData = [];
    this.heightC = -1;
  }

  buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }

    let mid = parseInt((start + end) / 2);
    let rootNode = new Node(arr[mid]);

    rootNode.left = this.buildTree(arr, start, mid - 1);
    rootNode.right = this.buildTree(arr, mid + 1, end);

    return rootNode;
  }

  insert(value, root = this.root) {
    if (root == null) {
      return (root = new Node(value));
    }

    if (root.d < value) {
      root.right = this.insert(value, root.right);
    } else {
      root.left = this.insert(value, root.left);
    }

    return root;
  }

  delete(value, root = this.root) {
    if (root == null) {
      return root;
    }

    if (root.d > value) {
      root.left = this.delete(value, root.left);
      return root;
    } else if (root.d < value) {
      root.right = this.delete(value, root.right);
      return root;
    }

    if (root.left == null) {
      let temp = root.right;
      return temp;
    } else if (root.right == null) {
      let temp = root.left;
      return temp;
    } else {
      let succParent = root;
      let succ = root.right;
      while (succ.left != null) {
        succParent = succ;
        succ = succ.left;
      }

      if (succParent != root) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }

      root.d = succ.d;

      return root;
    }
  }

  find(value, root = this.root) {
    if (root == null) return false;
    if (root.d == value) return root;

    if (root.d > value) {
      return this.find(value, root.left);
    } else if (root.d < value) {
      return this.find(value, root.right);
    }

    return root;
  }

  levelOrder(root = this.root) {
    if (root == null) return [];
    let result = [];
    let queue = [];
    queue.push(root);

    while (queue.length != 0) {
      let subarr = [];
      const n = queue.length;
      for (let i = 0; i < n; i++) {
        let node = queue.pop();
        subarr.push(node.d);
        if (node.left) queue.unshift(node.left);
        if (node.right) queue.unshift(node.right);
      }
      result.push(subarr);
    }

    // return result
    result.forEach((arr) => {
      console.log(arr);
    });
  }

  preorder(root = this.root) {
    if (root == null) return;

    if (root.d !== undefined || root.d !== null) {
      this.preorderData.push(root.d);
    }
    if (root.left !== null) {
      this.preorder(root.left);
    }
    if (root.right !== null) {
      this.preorder(root.right);
    }
  }

  inorder(root = this.root) {
    if (root == null) return;

    if (root.left !== null) {
      this.inorder(root.left);
    }
    if (root.d !== undefined || root.d !== null) {
      this.inorderData.push(root.d);
    }
    if (root.right !== null) {
      this.inorder(root.right);
    }
  }

  postorder(root = this.root) {
    if (root == null) return;

    if (root.left !== null) {
      this.postorder(root.left);
    }
    if (root.right !== null) {
      this.postorder(root.right);
    }
    if (root.d !== undefined || root.d !== null) {
      this.postorderData.push(root.d);
    }
  }

  _height(root = this.root) {
    if (root == null) {
      return -1;
    } else {
      let left = this._height(root.left);
      let right = this._height(root.right);

      return Math.max(left, right) + 1;
    }
  }

  // specifically to be used with findHeight to find
  // the height of given value/data.
  _heightUtil(value, root = this.root) {
    if (root == null) {
      return -1;
    }

    var leftHeight = this._heightUtil(value, root.left);

    var rightHeight = this._heightUtil(value, root.right);

    var update = Math.max(leftHeight, rightHeight) + 1;

    if (root.d == value) {
      this.heightC = update;
    }

    return update;
  }

  findHeight(value, root = this.root) {
    this._heightUtil(value, root);

    return this.heightC;
  }

  findDepth(value, root = this.root) {
    if (root == null) return -1;

    let dist = -1;

    if (
      root.d == value ||
      (dist = this.findDepth(value, root.left)) >= 0 ||
      (dist = this.findDepth(value, root.right)) >= 0
    ) {
      return dist + 1;
    }

    return dist;
  }

  isBalanced(root = this.root) {
    if (root == null) return false;

    let leftHalf = root.left;
    let rightHalf = root.right;

    if (
      Math.abs(this._height(leftHalf) - this._height(rightHalf)) > 1
    ) {
      return false;
    } else {
      return true;
    }
  }

  rebalance(root = this.root) {
    if (this.isBalanced(this.root)) return this.root;
    if (root === null) return;

    this.inorder();
    let newArr = this.inorderData;
    //clear inorder data.
    this.inorderData = [];

    const sorted = mergeSort(newArr);

    let balancedTree = new Tree(sorted);
    this.root = balancedTree.root;
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(
      node.right,
      `${prefix}${isLeft ? '│   ' : '    '}`,
      false
    );
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.d}`);
  if (node.left !== null) {
    prettyPrint(
      node.left,
      `${prefix}${isLeft ? '    ' : '│   '}`,
      true
    );
  }
};

let res = [];

const mergeSort = (arr) => {
  if (arr.length < 2) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle, arr.length);
  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
  res = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      res.push(left.shift());
    } else {
      res.push(right.shift());
    }
  }
  while (left.length) {
    res.push(left.shift());
  }
  while (right.length) {
    res.push(right.shift());
  }
  return res;
};

const removeDup = (arr) => {
  return [...new Set(arr)];
};

const driverScript = () => {
  let randoms = [...Array(12)].map(() =>
    Math.floor(Math.random() * 5000)
  );

  mergeSort(randoms);
  // mergeSort return a sorted array from random array in a variable called res
  // so we pass res as a sorted array to the newly generated tree.
  let tree = new Tree(res);

  console.log('initial array used: ' + res);

  console.log('is the tree balanced: ' + tree.isBalanced());

  console.log('---level order of tree---');
  tree.levelOrder();
  console.log('---level order of tree---');

  console.log('---preorder of tree---');
  tree.preorder();
  console.log(tree.preorderData);
  console.log('---preorder of tree---');

  console.log('---postorder of tree---');
  tree.postorder();
  console.log(tree.postorderData);
  console.log('---postorder of tree---');

  console.log('---inorder of tree---');
  tree.inorder();
  console.log(tree.inorderData);
  console.log('---inorder of tree---');

  prettyPrint(tree.root);

  // tree.insert(8);
  // tree.insert(9);
  // tree.insert(11);
  // tree.insert(13);
  // tree.insert(16);
  // tree.insert(19);
  // tree.insert(26);
  // tree.insert(38);
  // tree.insert(51);
  // tree.insert(65);
  // tree.insert(85);

  // tree.rebalance();
  // console.log(
  //   '-----------------------------------------------------'
  // );

  // console.log('---level order of tree---');
  // tree.levelOrder();
  // console.log('---level order of tree---');

  // console.log('---preorder of tree---');
  // tree.preorder();
  // console.log(tree.preorderData);
  // console.log('---preorder of tree---');

  // console.log('---postorder of tree---');
  // tree.postorder();
  // console.log(tree.postorderData);
  // console.log('---postorder of tree---');

  // console.log('---inorder of tree---');
  // tree.inorder();
  // console.log(tree.inorderData);
  // console.log('---inorder of tree---');

  // prettyPrint(tree.root);
  // console.log('is the tree balanced: ' + tree.isBalanced());
};

driverScript();

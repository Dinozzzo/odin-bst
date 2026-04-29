export { Node, Tree };

function Node(data) {
  return {
    data: data,
    left: null,
    right: null,
  };
}

function Tree(array) {
  // SORT + REMOVE DUPLICATES
  array.sort((a, b) => a - b);
  array = [...new Set(array)];

  const length = array.length;
  const start = 0;
  const end = length - 1;

  return {
    root: buildTree(array, start, end), // BUILD BALANCED TREE

    includes(value) {
      let current = this.root;

      // SEARCH VALUE IN BST
      while (current !== null) {
        if (value === current.data) {
          return true;
        }

        // MOVE LEFT OR RIGHT
        if (value < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
      }

      return false;
    },

    insert(value) {
      //  IF TREE IS EMPTU
      if (this.root === null) {
        this.root = Node(value);
        return;
      }

      let current = this.root;

      while (true) {
        // IF VALUE EXIST > NOTHING
        if (value === current.data) {
          return;
        }

        // GO LEFT
        if (value < current.data) {
          if (current.left === null) {
            current.left = Node(value);
            return;
          }
          current = current.left;
        }

        // GO RIGHT
        else {
          if (current.right === null) {
            current.right = Node(value);
            return;
          }
          current = current.right;
        }
      }
    },

    deleteItem(value) {
      this.root = deleteNode(this.root, value); // UPDATE ROOT AFTER DELETE
    },

    levelOrderForEach(callback) {
      // CHECK IF CALLBACK IS A FUNCTION
      if (typeof callback !== "function") {
        throw new Error("Callback needs to be a FUNCTION.");
      }

      const queue = [];
      queue.push(this.root); // START WITH ROOT

      while (queue.length > 0) {
        let current = queue.shift(); // GET FIRST NODE
        callback(current.data);

        // ADD CHILDREN TO QUEUE
        if (current.left !== null) {
          queue.push(current.left);
        }
        if (current.right !== null) {
          queue.push(current.right);
        }
      }
    },

    // LEFT > ROOT > RIGHT
    inOrderForEach(callback) {
      // CHECK IF CALLBACK IS A FUNCTION
      if (typeof callback !== "function") {
        throw new Error("Callback needs to be a FUNCTION.");
      }

      function traverse(node) {
        // IF NO VALUE = STOP
        if (node === null) {
          return;
        }

        traverse(node.left); // LEFT
        callback(node.data); // NODE
        traverse(node.right); // RIGHT
      }

      traverse(this.root);
    },

    // ROOT > LEFT > RIGHT
    preOrderForEach(callback) {
      // CHECK IF CALLBACK IS A FUNCTION
      if (typeof callback !== "function") {
        throw new Error("Callback needs to be a FUNCTION.");
      }

      function traverse(node) {
        // IF NO VALUE = STOP
        if (node === null) {
          return;
        }
        callback(node.data); // NODE
        traverse(node.left); // LEFT
        traverse(node.right); // RIGHT
      }

      traverse(this.root);
    },

    // LEFT > RIGHT > ROOT
    postOrderForEach(callback) {
      // CHECK IF CALLBACK IS A FUNCTION
      if (typeof callback !== "function") {
        throw new Error("Callback needs to be a FUNCTION.");
      }

      function traverse(node) {
        // IF NO VALUE = STOP
        if (node === null) {
          return;
        }

        traverse(node.left); // LEFT
        traverse(node.right); // RIGHT
        callback(node.data); // NODE
      }

      traverse(this.root);
    },

    height(value) {
      let current = this.root;

      // FIND THE NODE
      while (current !== null) {
        if (value === current.data) {
          break;
        }

        // MOVE LEFT OR RIGHT
        if (value < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
      }

      // IF NODE IS NOT FOUND
      if (current === null) {
        return undefined;
      }

      // CALCULATE HEIGHT
      function getHeight(node) {
        if (node === null) {
          return -1; // SO LEAF = 0
        }

        const left = getHeight(node.left);
        const right = getHeight(node.right);

        return 1 + Math.max(left, right);
      }

      return getHeight(current);
    },

    isBalanced() {
      function check(node) {
        // IF NODE IS NOT FOUND
        if (node === null) {
          return 0;
        }

        const left = check(node.left);
        const right = check(node.right);

        // IF ONE SIDE IS ALREADY UNBALANCED
        if (left === -1 || right === -1) {
          return -1;
        }

        // CHECK HEIGHT DIFFERENCE
        if (left - right > 1 || right - left > 1) {
          return -1;
        }

        // RETURN HEIGHT
        return 1 + Math.max(left, right);
      }

      return check(this.root) !== -1;
    },

    rebalance() {
      const values = [];

      // GET SORTED VALUES FROM TREE
      this.inOrderForEach((value) => values.push(value));

      // REBUILD BALANCED TREE
      this.root = buildTree(values, 0, values.length - 1);
    },
  };
}

function buildTree(array, start, end) {
  if (start > end) return null; // BASE CASE

  const mid = start + Math.floor((end - start) / 2); // MIDDLE > BALANCED

  const root = Node(array[mid]);
  root.left = buildTree(array, start, mid - 1); // BUILD LEFT
  root.right = buildTree(array, mid + 1, end); // BUILD RIGHT

  return root;
}

function getSuccessor(curr) {
  curr = curr.right;
  while (curr !== null && curr.left !== null) curr = curr.left; // SMALLEST ON RIGHT
  return curr;
}

function deleteNode(node, value) {
  if (node === null) {
    return node; // VALUE NOT FOUND
  }

  // SEARCH NODE
  if (node.data > value) {
    node.left = deleteNode(node.left, value);
  } else if (node.data < value) {
    node.right = deleteNode(node.right, value);
  } else {
    // NODE FOUND

    // 0 OR 1 CHILD
    if (node.left === null) {
      return node.right;
    }
    if (node.right === null) {
      return node.left;
    }

    // 2 CHILDREN > REPLACE WITH SUCCESSOR
    const successor = getSuccessor(node);
    node.data = successor.data;
    node.right = deleteNode(node.right, successor.data);
  }

  return node; // RETURN UPDATED NODE
}

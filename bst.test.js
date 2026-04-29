import { Node, Tree } from "./bst.js";

// CREATE A RANDOM ARRAY
function randomArray(size = 10, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

// CREATE THE TREE
const numbers = randomArray(15, 100);
console.log("Random array:", numbers);

const tree = Tree(numbers);

console.log("Is balanced?", tree.isBalanced());

function printOrders(tree) {
  console.log("Level order:");
  tree.levelOrderForEach((v) => console.log(v));

  console.log("Pre order:");
  tree.preOrderForEach((v) => console.log(v));

  console.log("Post order:");
  tree.postOrderForEach((v) => console.log(v));

  console.log("In order:");
  tree.inOrderForEach((v) => console.log(v));
}

printOrders(tree);

tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);

console.log("Is balanced after insert?", tree.isBalanced());

tree.rebalance();

console.log("Is balanced after rebalance?", tree.isBalanced());

printOrders(tree);

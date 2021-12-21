const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const exisitingProdIndex = cart.products.findIndex(
        (item) => item.id === id
      );
      if (exisitingProdIndex !== -1) {
        cart.products[exisitingProdIndex].qty += 1;
      } else {
        cart.products.push({ id, qty: 1 });
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }
  // update price when edited product

  // static updateProduct(id, productPriceDelta) {
  //   fs.readFile(p, (err, fileContent) => {
  //     let cart = {
  //       products: [],
  //       totalPrice: 0,
  //     };
  //     if (!err) {
  //       cart = JSON.parse(fileContent);
  //       const productIndex = cart.products.findIndex((prod) => prod.id === id);
  //       const product = cart.products[productIndex];
  //       if (product) {
  //         const productQty = product.qty;
  //         cart.totalPrice = +(
  //           cart.totalPrice +
  //           productPriceDelta * productQty
  //         ).toFixed(2);
  //         fs.writeFile(p, JSON.stringify(cart), (err) => {
  //           if (err) {
  //             console.log(err);
  //           }
  //         });
  //       }
  //     }
  //   });
  // }

  // get all product form cart

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};

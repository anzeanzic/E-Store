angular.module('EStore').factory('ShoppingCartFactory', function(locker, CheckoutFactory){   
	return {
		cart: (locker.has('cart')) ? locker.get('cart') : [],
		AddToCart: function(product) {
			// mogoce notification v kotu, da je shranjeno?
			this.cart.push({ product: product, quantity: 1 });
			locker.put('cart', this.cart);
		},
		EditCartItem: function(product, new_quantity) {
			var product_index = this.cart.indexOf(product);
			this.cart[product_index].quantity = new_quantity;
			locker.put('cart', this.cart);
		},
		RemoveCartItem: function(product) {
			var product_index = this.cart.indexOf(product);
			if (product_index > -1) {
				this.cart.splice(product_index, 1);
				locker.put('cart', this.cart);
			}
		},
		CalculateTotalCost: function() {
			var sum = 0;
			if (this.cart.length > 0) {
				for (var i = 0; i < this.cart.length; i++) {
					sum += (this.cart[i].product.price * this.cart[i].quantity);
				}
			}

			return sum;
		},
		SendOrder: function(firstname, lastname, email, address, country, city, zip) {
			var products = [];
			for (var i = 0; i < this.cart.length; i++) {
				products.push({ id: this.cart[i].product.id, quantity: this.cart[i].quantity });
			}

			var newOrder = new CheckoutFactory({ firstName: firstname, lastName: lastname, email: email, address: address, country: country, city: city, zip: zip, products: products });
			newOrder.$save();
		}
	};
});
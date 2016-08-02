INVOISE.factory('getInvoiceData', function(){
	return {
		getProductsInCart: function(data, productsList){
			var filterInvoiceProductsInCart = [];
			angular.forEach(data, function(invoiceProduct){
				productsList.filter(function(item){
					if(item.id === invoiceProduct.product_id){
						invoiceProduct.price = item.price;
						invoiceProduct.name = item.name;
						filterInvoiceProductsInCart.push(invoiceProduct);
					}
				})
			});
			return filterInvoiceProductsInCart;
		},
		getPrice: function(){

		}
	}
});

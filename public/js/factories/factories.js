INVOISE.factory('getInvoiceData', function($modal){
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
        getPrice: function(data, scope){
            var inputPriceArr = [];
            angular.forEach(data, function(invoiceProduct){
	            scope.productsList.filter(function(item){
                    if(item.id === invoiceProduct.product_id){
                        inputPriceArr.push(invoiceProduct.price * invoiceProduct.quantity);
	                    scope.invoiceToEdit.totalPriceWithoutDiscount = inputPriceArr.reduce(function(sum, current){
                            return sum + current;
                        }, 0);
	                    scope.invoiceToEdit.total = scope.invoiceToEdit.totalPriceWithoutDiscount;
                        if(scope.invoiceToEdit.discount !== ''){
	                        scope.invoiceToEdit.total = scope.invoiceToEdit.totalPriceWithoutDiscount - (scope.invoiceToEdit.totalPriceWithoutDiscount * scope.invoiceToEdit.discount / 100);
                        }
                    }
                })
            });
            return scope.invoiceToEdit.total;
        },
        getWithoutDiscount: function(data, scope){
            var inputPriceArr = [];
            angular.forEach(data, function(invoiceProduct){
	            scope.productsList.filter(function(item){
                    if(item.id === invoiceProduct.product_id){
                        inputPriceArr.push(invoiceProduct.price * invoiceProduct.quantity);
	                    scope.invoiceToEdit.totalPriceWithoutDiscount = inputPriceArr.reduce(function(sum, current){
                            return sum + current;
                        }, 0);
                    }
                })
            });
            return scope.invoiceToEdit.totalPriceWithoutDiscount;
        },
        alreadyExistsOnCreate: function(product, productsInCart){
            var compare = [];
            angular.forEach(productsInCart, function(item){
                if (product.id === item.id) {
                    compare.push(1);
                    $modal.open({
                        templateUrl: '/partials/already-exists.html',
                        controller: 'CreateInvoiceCtrl'
                    });
                }
            });
            if (compare.length) return true;
        },
        alreadyExistsOnEdit: function(product, productsInCart){
            var compare = [];
            angular.forEach(productsInCart, function(item){
                if (product.id === item.product_id) {
                    compare.push(1);
                    $modal.open({
                        templateUrl: '/partials/already-exists.html',
                        controller: 'CreateInvoiceCtrl'
                    });
                }
            });
            if (compare.length) return true;
        },
	    addInvoiceItem: function(scope, data){
		    var inputPriceArr = [];
		    scope.productsList.filter(function(item){
			    if(item.id === data.product_id){
				    data.price = item.price;
				    data.name = item.name;
				    scope.invoiceProductsInCart.push(data);
				    inputPriceArr.push(data.price * data.quantity);
				    scope.invoiceToEdit.totalPriceWithoutDiscount = inputPriceArr.reduce(function(sum, current){
					    return sum + current;
				    }, 0);
				    scope.invoiceToEdit.total = scope.invoiceToEdit.totalPriceWithoutDiscount;
				    if(scope.invoiceToEdit.discount !== ''){
					    scope.invoiceToEdit.total = scope.invoiceToEdit.totalPriceWithoutDiscount - (scope.invoiceToEdit.totalPriceWithoutDiscount * scope.invoiceToEdit.discount / 100);
				    }
			    }
		    })
		    return scope.invoiceProductsInCart;
	    }
    }
});

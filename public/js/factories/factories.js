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
        getPrice: function(data, productsList, invoiceToEdit){
            var inputPriceArr = [];
            angular.forEach(data, function(invoiceProduct){
                productsList.filter(function(item){
                    if(item.id === invoiceProduct.product_id){
                        inputPriceArr.push(invoiceProduct.price * invoiceProduct.quantity);
                        invoiceToEdit.totalPriceWithoutDiscount = inputPriceArr.reduce(function(sum, current){
                            return sum + current;
                        }, 0);
                        invoiceToEdit.total = invoiceToEdit.totalPriceWithoutDiscount;
                        if(invoiceToEdit.discount !== ''){
                            invoiceToEdit.total = invoiceToEdit.totalPriceWithoutDiscount - (invoiceToEdit.totalPriceWithoutDiscount * invoiceToEdit.discount / 100);
                        }
                    }
                })
            });
            return invoiceToEdit.total;
        },
        getWithoutDiscount: function(data, productsList, invoiceToEdit){
            var inputPriceArr = [];
            angular.forEach(data, function(invoiceProduct){
                productsList.filter(function(item){
                    if(item.id === invoiceProduct.product_id){
                        inputPriceArr.push(invoiceProduct.price * invoiceProduct.quantity);
                        invoiceToEdit.totalPriceWithoutDiscount = inputPriceArr.reduce(function(sum, current){
                            return sum + current;
                        }, 0);
                    }
                })
            });
            console.log(invoiceToEdit.totalPriceWithoutDiscount)
            return invoiceToEdit.totalPriceWithoutDiscount;
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
        }
    }
});

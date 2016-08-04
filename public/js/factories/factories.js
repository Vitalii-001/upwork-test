INVOISE.factory('getInvoiceData', function($modal){
    return {
        getNameById: function(scope, data){
            var invoiceProductsName = [];
            angular.forEach(data, function(invoiceItem){
                scope.productsList.filter(function(item){
                    if(item.id === invoiceItem.product_id){
                        invoiceProductsName.push(item.name + ' - ( ' + item.price + ' )' + " * " + invoiceItem.quantity);
                    }
                })
            })
            return invoiceProductsName;
        },
        getInvoiceTotalPrice: function(scope, data){
            var invoiceTotalPriceArr = [],
                invoiceTotalPrice = 0,
                price = 0;
            angular.forEach(data, function(invoiceItem){
                scope.productsList.filter(function(item){
                    if(item.id === invoiceItem.product_id){

                        if(invoiceItem.discount !== ''){
                            price = (item.price * invoiceItem.quantity) - (item.price * invoiceItem.quantity * scope.invoice.discount / 100);
                            invoiceTotalPriceArr.push(price);
                console.log()
                        } else{
                            invoiceTotalPriceArr.push(item.price * invoiceItem.quantity);
                        }
                    }
                })
            })
            invoiceTotalPrice = invoiceTotalPriceArr.reduce(function(sum, current){
                return sum + current;
            }, 0);

            return invoiceTotalPrice;
        },
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
                if(product.id === item.id){
                    compare.push(1);
                    $modal.open({
                        templateUrl: '/partials/already-exists.html',
                        controller: 'CreateInvoiceCtrl'
                    });
                }
            });
            if(compare.length) return true;
        },
        alreadyExistsOnEdit: function(product, productsInCart){
            var compare = [];
            angular.forEach(productsInCart, function(item){
                if(product.id === item.product_id){
                    compare.push(1);
                    $modal.open({
                        templateUrl: '/partials/already-exists.html',
                        controller: 'CreateInvoiceCtrl'
                    });
                }
            });
            if(compare.length) return true;
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

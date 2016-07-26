'use strict'

/*-----Customers-----*/

INVOISE.controller('CustomersCtrl', function($scope, customer, $modal){
    $scope.init = function(){
        $scope.getAll();
    }
    $scope.create = function(){
        var modalInstance = $modal.open({
            templateUrl: '/partials/create-customer.html',
            controller: 'CreateCustomerCtrl'
        });
        modalInstance.result.then(function(){
            $scope.getAll();
        }, function(){
            $scope.getAll();
        })
    }
    $scope.delete = function(id){
        customer.deleteCustomer(id)
            .then(function(res){
                $scope.getAll();
            }, function(){

            })
    }
    $scope.getAll = function(){
        customer.getAllCustomers()
            .then(function(res){
                $scope.customersList = customer.list;
            }, function(err){

            })
    }
    $scope.init()
});

INVOISE.controller('CreateCustomerCtrl', function($scope, customer, $modalInstance){
    $scope.init = function(){
        function Customer(){
            this.name = '';
            this.address = '';
            this.phone = '';
        }

        $scope.customer = new Customer();
    }
    $scope.submit = function(){
        customer.addCustomer($scope.customer)
            .then(function(){
                $modalInstance.close();
            }, function(){
                $scope.customer = {
                    name: 'Failed',
                    address: 'Failed',
                    phone: 'Failed'
                }
            })
    }
    $scope.close = function(){
        $modalInstance.close();
    }
    $scope.init();
});


/*-----products-----*/

INVOISE.controller('ProductsCtrl', function($scope, product, $modal){
    $scope.init = function(){
        $scope.getAll();
    }
    $scope.create = function(){
        var modalInstance = $modal.open({
            templateUrl: '/partials/create-product.html',
            controller: 'CreateProductCtrl'
        });
        modalInstance.result.then(function(){
            $scope.getAll();
        }, function(){
            $scope.getAll();
        })
    }
    $scope.delete = function(id){
        product.deleteProduct(id)
            .then(function(res){
                $scope.getAll();
            }, function(){

            })
    }
    $scope.getAll = function(){
        product.getAllProducts()
            .then(function(res){
                $scope.productsList = product.list;
            }, function(err){

            })
    }
    $scope.init()
});

INVOISE.controller('CreateProductCtrl', function($scope, product, $modalInstance){
    $scope.init = function(){
        function Product(){
            this.name = '';
            this.price = '';
        }

        $scope.product = new Product();
    }
    $scope.submit = function(){
        product.addProduct($scope.product)
            .then(function(){
                $modalInstance.close();
            }, function(){
                $scope.product = {
                    name: 'Failed',
                    price: 'Failed',
                }
            })
    }
    $scope.close = function(){
        $modalInstance.close();
    }
    $scope.init();
});


/*-----Invoices-----*/

INVOISE.controller('InvoicesCtrl', function($scope, invoice, $modal){
    $scope.dataInvoice = [];
    $scope.init = function(){
        $scope.getAll();
        $scope.getProductsList();
    }
    $scope.create = function(){
        var modalInstance = $modal.open({
            templateUrl: '/partials/create-invoice.html',
            windowClass: 'create-invoice-popup',
            controller: 'CreateInvoiceCtrl',
            resolve: {},
            scope: $scope.$new()
        });
        modalInstance.result.then(function(selectedItem){
            $scope.dataInvoice.push({
                id: selectedItem.id,
                customer: selectedItem.customer_id,
                discount: selectedItem.discount,
                total: selectedItem.total
            });
            $scope.getAll();
        }, function(){
            alert('Modal dismissed at: ' + new Date());
            $scope.getAll();
        })
    }
    $scope.delete = function(id){
        invoice.deleteInvoice(id)
            .then(function(res){
                $scope.getAll();
            }, function(){

            })
    }
    $scope.edit = function(invoiceEdit){
        var invoiceToEdit = invoiceEdit;
        var modalInstance = $modal.open({
            templateUrl: '/partials/edit-invoice.html',
            windowClass: 'edit-invoice-popup',
            controller: 'EditInvoiceCtrl',
            resolve: {
                invoiceEdit: function(){
                    return invoiceToEdit;
                }
            },
            scope: $scope.$new()
        });
        modalInstance.result.then(function(selectedItem){
            invoiceToEdit.id = selectedItem.id;
            invoiceToEdit.customer = selectedItem.customer;
            invoiceToEdit.discount = selectedItem.discount;
            invoiceToEdit.total = selectedItem.total;
            $scope.getAll();
        }, function(){
            $scope.getAll();
        })
    }
    $scope.getAll = function(){
        invoice.getAllInvoices().then(function(){
            $scope.invoicesList = invoice.list;
        }, function(){

        })
    }
    $scope.getProductsList = function(){
        invoice.getAllProducts()
            .then(function(){
                $scope.productsList = invoice.productsList;
            }, function(){

            })
    }
    $scope.init()
});

INVOISE.controller('getInvoiceId', function($scope, invoice){
    $scope.invoiceProductsName = [];
    var invoiceId = $scope.invoice.id;
    invoice.getInvoiceItems(invoiceId)
        .then(function(data){
            $scope.invoiceProducts = invoice.invoiceProducts;
            angular.forEach($scope.invoiceProducts, function(invoiceItem){
                $scope.productsList.filter(function(item){
                    if (item.id === invoiceItem.product_id) {
                        $scope.invoiceProductsName.push(item.name);
                        return item.name;
                    }
                })
            })
        });
});

INVOISE.controller('CreateInvoiceCtrl', function($scope, invoice, $modalInstance, $modal){
    $scope.input = [];
    $scope.init = function(){
        function Invoice(){
            this.customer_id = '';
            this.discount = '';
            this.total = '';
        }

        $scope.invoice = new Invoice();
        $scope.invoicesInCart = [];
        $scope.compareAddItems = [];
        $scope.invoiceItems = [];
        $scope.invoice.total = 0;
        $scope.invoice.totalPriceWithoutDiscount = 0;
        $scope.getCustomersList();
        $scope.getProductsList();
    }
    function InvoiceItem(){
        this.invoice_id = '';
        this.product_id = '';
        this.quantity = '';
    }

    $scope.getCustomersList = function(){
        invoice.getAllCustomers()
            .then(function(){
                $scope.customersList = invoice.customersList;
            }, function(){

            })
    }
    $scope.$watch('invoice.discount', function(newV, oldV){
        $scope.invoice.total = $scope.invoice.totalPriceWithoutDiscount - ($scope.invoice.totalPriceWithoutDiscount * newV / 100);
        if(newV === ''){
            $scope.invoice.total = $scope.invoice.totalPriceWithoutDiscount;
        }
    });
    $scope.getProductsList = function(){
        invoice.getAllProducts()
            .then(function(){
                $scope.productsList = invoice.productsList;
            }, function(){

            })
    }
    $scope.addInvoiceItem = function(product){
        if($scope.compareAddItems.indexOf(product.id) != -1){
            $modal.open({
                templateUrl: '/partials/already-exists.html',
                controller: 'CreateInvoiceCtrl'
            });
            return false;
        }
        $scope.compareAddItems.push(product.id);
        $scope.invoicesInCart.push(product);
    }
    $scope.$watch('invoicesInCart', function(watchProducts){
        var allPricesInElements = [];
        angular.forEach(watchProducts, function(val){
            allPricesInElements.push(val.value * val.price)
        })
        $scope.invoice.total = allPricesInElements.reduce(function(sum, current){
            return sum + current;
        }, 0);
        $scope.invoice.totalPriceWithoutDiscount = $scope.invoice.total;
        if($scope.invoice.discount !== ''){
            $scope.invoice.total = $scope.invoice.totalPriceWithoutDiscount - ($scope.invoice.totalPriceWithoutDiscount * $scope.invoice.discount / 100);
        }
    }, true);
    $scope.removeInvoiceItem = function(indexEl, productPrice){
        $scope.invoicesInCart.splice(indexEl, 1);
        $scope.compareAddItems.splice(indexEl, 1);
        $scope.invoice.total = $scope.invoice.total - productPrice;
        $scope.invoice.totalPriceWithoutDiscount = $scope.invoice.totalPriceWithoutDiscount - productPrice;
    }

    $scope.submit = function(){
        invoice.addInvoice($scope.invoice)
            .then(function(response){
                angular.forEach($scope.invoicesInCart, function(product){
                    var invoiceItem = new InvoiceItem();
                    invoiceItem.product_id = product.id;
                    invoiceItem.quantity = product.value;
                    invoiceItem.invoice_id = response.id;
                    $scope.invoiceItems.push(invoiceItem)
                });
                invoice.addInvoiceItems($scope.invoiceItems)
                $modalInstance.close($scope.input);
                // $scope.customer = '';
                // $scope.discount = '';
                // $scope.total = '';
            }, function(){
                $scope.invoice = {
                    name: 'Failed',
                    price: 'Failed',
                }
            });
    }
    $scope.close = function(){
        $modalInstance.close();
    }
    $scope.init();
});
INVOISE.controller('EditInvoiceCtrl', function($scope, invoice, $modalInstance, $modal, invoiceEdit){
    // $scope.input = angular.copy(invoiceEdit);
    $scope.init = function(){
        $scope.getCustomersList();
    }
        $scope.invoice = invoiceEdit;
    // $scope.invoice.discount = invoiceEdit.discount;
    $scope.getCustomersList = function(){
        invoice.getAllCustomers()
            .then(function(){
                $scope.customersList = invoice.customersList;
            }, function(){

            })
    }
    $scope.invoiceEdit = invoiceEdit;
    $scope.submit = function(){
        $modalInstance.close($scope.input);
    }
    $scope.close = function(){
        $modalInstance.dismiss('close');
    }
    $scope.init();

});


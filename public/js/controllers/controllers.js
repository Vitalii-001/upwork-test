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
    $scope.init = function(){
        $scope.getAll();
    }
    $scope.create = function(){
        var modalInstance = $modal.open({
            templateUrl: '/partials/create-invoice.html',
            windowClass: 'create-invoice-popup',
            controller: 'CreateInvoiceCtrl'
        });
        modalInstance.result.then(function(){
            $scope.getAll();
        }, function(){
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
    $scope.getAll = function(){
        invoice.getAllInvoices().then(function(){
            $scope.invoicesList = invoice.list;
        }, function(){

        })
    }
    $scope.init()
});

INVOISE.controller('CreateInvoiceCtrl', function($scope, invoice, $modalInstance){
    $scope.init = function(){
        function Invoice(){
            this.customer_id = '';
            this.discount = '';
            this.total = '';
        }
        function InvoiceItem(){
            this.invoice_id = '';
            this.product_id = '';
            this.quantity = '';
        }

        $scope.invoice = new Invoice();
        $scope.invoiceItem = new InvoiceItem();
        $scope.invoicesInCart = [];
        $scope.getCustomersList();
        $scope.getProductsList();
    }
    $scope.getCustomersList = function(){
        invoice.getAllCustomers()
            .then(function(){
                $scope.customersList = invoice.customersList;
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
    $scope.addInvoiceItem = function(product){
        $scope.invoicesInCart.push(product)
    }
    $scope.removeInvoiceItem = function(indexEl){
        var index = $scope.invoicesInCart.indexOf(indexEl);
        if (indexEl > -1) {
            $scope.invoicesInCart.splice(index, 1);
        }
    }
    $scope.submit = function(){
        invoice.addInvoice($scope.invoice)
            .then(function(){
                $modalInstance.close();
            }, function(){
                $scope.invoice = {
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


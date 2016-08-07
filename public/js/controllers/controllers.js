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
            this.description = '';
            this.myFile = '';
        }

        $scope.product = new Product();
        $scope.product.myFile = $scope.myFile;
    }
    $scope.submit = function(){
        product.addProduct($scope.product)
            .then(function(){
        console.log($scope.fileModel)
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
        modalInstance.result.then(function(){
            $scope.getAll();
        }, function(){
            $scope.getAll();
        });
    }
    $scope.delete = function(id){
        invoice.deleteInvoice(id)
            .then(function(res){
                $scope.getAll();
            }, function(){

            })
    }
    $scope.edit = function(invoiceToEdit){
        var modalInstance = $modal.open({
            templateUrl: '/partials/edit-invoice.html',
            windowClass: 'edit-invoice-popup',
            controller: 'EditInvoiceCtrl',
            resolve: {
                invoiceToEdit: function(){
                    return invoiceToEdit;
                }
            }
        });
        modalInstance.result.then(function(){
            $scope.$broadcast('getInvoiceItemsName', invoiceToEdit);
            $scope.getAll();
        }, function(){
            $scope.getAll();
        });
    }
    $scope.getAll = function(){
        invoice.getAllInvoices().then(function(){
            $scope.invoicesList = invoice.list;
        })
    }
    $scope.getProductsList = function(){
        invoice.getAllProducts()
            .then(function(){
                $scope.productsList = invoice.productsList;
            })
    }
    $scope.init()
});

INVOISE.controller('getInvoiceItems', function($scope, invoice, getInvoiceData){
    $scope.$on('getInvoiceItemsName', function(event, obj){
        invoice.getInvoiceItems($scope.invoice.id)
            .then(function(data){
                $scope.invoiceProducts = getInvoiceData.getNameById($scope, data);
                $scope.invoice.total = getInvoiceData.getInvoiceTotalPrice($scope, data);
            });
    });
    invoice.getInvoiceItems($scope.invoice.id)
        .then(function(data){
            $scope.invoiceProducts = getInvoiceData.getNameById($scope, data);
            $scope.invoice.total = getInvoiceData.getInvoiceTotalPrice($scope, data);
        });
});

INVOISE.controller('CreateInvoiceCtrl', function($scope, invoice, $modalInstance, getInvoiceData){
    $scope.init = function(){
        function Invoice(){
            this.customer_id = '';
            this.discount = '';
            this.total = '';
        }

        $scope.invoice = new Invoice();
        $scope.invoicesInCart = []; //+
        $scope.invoiceItems = []; //+
        $scope.invoice.total = 0; //+
        $scope.invoice.totalPriceWithoutDiscount = 0; //+
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
        if(getInvoiceData.alreadyExistsOnCreate(product, $scope.invoicesInCart)) return false;
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
        $scope.invoice.total = $scope.invoice.total - productPrice;
        $scope.invoice.totalPriceWithoutDiscount = $scope.invoice.totalPriceWithoutDiscount - productPrice;
    }

    $scope.createInvoice = function(){
        invoice.addInvoice($scope.invoice)
            .then(function(response){
                angular.forEach($scope.invoicesInCart, function(product){
                    var invoiceItem = new InvoiceItem();
                    invoiceItem.product_id = product.id;
                    invoiceItem.quantity = product.value;
                    invoiceItem.invoice_id = response.id;
                    $scope.invoiceItems.push(invoiceItem)
                });
                invoice.addInvoiceItems($scope.invoiceItems);
                $modalInstance.close();
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
INVOISE.controller('EditInvoiceCtrl', function($scope, invoice, $modalInstance, invoiceToEdit, $modal, getInvoiceData){
    $scope.init = function(){
        $scope.getCustomersList();
    }
    function InvoiceItem(){
        this.invoice_id = '';
        this.product_id = '';
        this.quantity = '';
    }

    $scope.invoiceToEdit = invoiceToEdit;
    $scope.invoiceItem = [];
    $scope.updateInvoiceItem = [];
    $scope.changeQuanity = function(product){
        invoice.changeProductCount(product);
    };
    $scope.updateInvoiceItems = [];
    invoice.getAllProducts()
        .then(function(){
            $scope.productsList = invoice.productsList;
        })
    $scope.getCustomersList = function(){
        invoice.getAllCustomers()
            .then(function(){
                $scope.customersList = invoice.customersList;
            })
    }
    invoice.getInvoiceItems(invoiceToEdit.id)
        .then(function(data){
            $scope.invoiceProductsInCart = getInvoiceData.getProductsInCart(data, $scope.productsList);
            $scope.invoiceToEdit.totalPriceWithoutDiscount = getInvoiceData.getWithoutDiscount(data, $scope);
            $scope.invoiceToEdit.total = getInvoiceData.getPrice(data, $scope);
        });
    $scope.$watch('invoiceToEdit.discount', function(newV){
        $scope.invoiceToEdit.total = $scope.invoiceToEdit.totalPriceWithoutDiscount - ($scope.invoiceToEdit.totalPriceWithoutDiscount * newV / 100);
        if(newV === ''){
            $scope.invoiceToEdit.total = $scope.invoiceToEdit.totalPriceWithoutDiscount;
        }
    });
    $scope.addInvoiceItem = function(product, invoiceToEdit){
        if(getInvoiceData.alreadyExistsOnEdit(product, $scope.invoiceProductsInCart)) return false;
        var invoiceItem = new InvoiceItem();
        product.quantity = 1;
        invoiceItem.product_id = product.id;
        invoiceItem.quantity = product.quantity;
        invoiceItem.invoice_id = invoiceToEdit.id;
        $scope.invoiceItem = invoiceItem;
        invoice.addInvoiceItem($scope.invoiceItem)
            .then(function(data){
                $scope.invoiceProductsInCart = getInvoiceData.addInvoiceItem($scope, data)
            })
    }


    $scope.$watch('invoiceProductsInCart', function(newQ, oldQ){
        var allPricesInElements = [];
        angular.forEach(newQ, function(val){
            allPricesInElements.push(val.quantity * val.price);
        })
        $scope.invoiceToEdit.total = allPricesInElements.reduce(function(sum, current){
            return sum + current;
        }, 0);
        $scope.invoiceToEdit.totalPriceWithoutDiscount = $scope.invoiceToEdit.total;
        if($scope.invoiceToEdit.discount !== ''){
            $scope.invoiceToEdit.total = $scope.invoiceToEdit.totalPriceWithoutDiscount - ($scope.invoiceToEdit.totalPriceWithoutDiscount * $scope.invoiceToEdit.discount / 100);
        }
    }, true);
    $scope.removeInvoiceItem = function(invoiceId, productId, indexEl, productPrice){
        $scope.invoiceProductsInCart.splice(indexEl, 1);
        $scope.invoiceToEdit.total = $scope.invoiceToEdit.total - productPrice;
        $scope.invoiceToEdit.totalPriceWithoutDiscount = $scope.invoiceToEdit.totalPriceWithoutDiscount - productPrice;
        invoice.deleteInvoiceItem(productId, invoiceId)
            .then(function(response){

            });
    }
    $scope.saveEdit = function(){
        invoice.updateInvoice($scope.invoiceToEdit)
            .then(function(response){
                $modalInstance.close();
            });

    }
    $scope.close = function(){
        $modalInstance.close();
    }
    $scope.init();
});


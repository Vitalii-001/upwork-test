INVOISE.service('customer', function customers($http, $q, $rootScope){
    var customer = this;
    customer.list = {};
    customer.getAllCustomers = function(){
        var defer = $q.defer();
        $http.get($rootScope.endPoint + '/api/customers')
            .success(function(response){
                customer.list = response;
                defer.resolve(response)
            })
            .error(function(err, status){
                defer.reject(err);
            })

        return defer.promise;
    }
    customer.addCustomer = function(customer){
        var defer = $q.defer();
        $http.post($rootScope.endPoint + '/api/customers', customer)
            .success(function(response){
                defer.resolve(response)
            })
            .error(function(err, status){
                defer.reject(err);
            })
        return defer.promise;
    }
    customer.deleteCustomer = function(id){
        var defer = $q.defer();
        $http.delete($rootScope.endPoint + '/api/customers/' + id)
            .success(function(response){
                defer.resolve(response)
            })
            .error(function(err, status){
                defer.reject(err);
            })
        return defer.promise;
    }
    return customer;
});

INVOISE.service('product', function products($http, $q, $rootScope){
    var product = this;
    product.list = {};
    product.getAllProducts = function(){
        var defer = $q.defer();
        $http.get($rootScope.endPoint + '/api/products')
            .success(function(response){
                product.list = response;
                defer.resolve(response)
            })
            .error(function(err, status){
                defer.reject(err);
            })

        return defer.promise;
    }
    product.addProduct = function(product){
        var defer = $q.defer();
        $http.post($rootScope.endPoint + '/api/products', product)
            .success(function(response){
                defer.resolve(response)
            })
            .error(function(err, status){
                defer.reject(err);
            })
        return defer.promise;
    }
    product.deleteProduct = function(id){
        var defer = $q.defer();
        $http.delete($rootScope.endPoint + '/api/products/' + id)
            .success(function(response){
                defer.resolve(response)
            })
            .error(function(err, status){
                defer.reject(err);
            })
        return defer.promise;
    }
    return product;
});

INVOISE.service('invoice', function products($http, $q, $rootScope){
    var invoice = this;
    invoice.list = {};
    invoice.customersList = {};
    invoice.productsList = {};
    invoice.getAllInvoices = function(){
        var defer = $q.defer();
        $http.get($rootScope.endPoint + '/api/invoices')
            .success(function(response){
                invoice.list = response;
                defer.resolve(response)
            })
            .error(function(err, status){
                defer.reject(err);
            })
        return defer.promise;
    }
    invoice.getAllCustomers = function(){
        var defer = $q.defer();
        $http.get($rootScope.endPoint + '/api/customers')
            .success(function(response){
                invoice.customersList = response;
                defer.resolve(response)
            })
            .error(function(err, status){
                defer.reject(err);
            })

        return defer.promise;
    }
    invoice.getAllProducts = function(){
        var defer = $q.defer();
        $http.get($rootScope.endPoint + '/api/products')
            .success(function(response){
                invoice.productsList = response;
                defer.resolve(response)
            })
            .error(function(err, status){
                defer.reject(err);
            })

        return defer.promise;
    }
    invoice.addInvoice = function(invoice){
        var defer = $q.defer();
        $http.post($rootScope.endPoint + '/api/invoices', invoice)
            .success(function(response){
                defer.resolve(response)
            })
            .error(function(err, status){
                defer.reject(err);
            })
        return defer.promise;
    }
    invoice.deleteInvoice = function(id){
        var defer = $q.defer();
        $http.delete($rootScope.endPoint + '/api/invoices/' + id)
            .success(function(response){
                defer.resolve(response)
            })
            .error(function(err, status){
                defer.reject(err);
            })
        return defer.promise;
    }
});

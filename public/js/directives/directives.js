(function () {
    angular.module('autoActive', [])
        .directive('autoActive', ['$location', function ($location) {
            return {
                restrict: 'A',
                scope: false,
                link: function (scope, element) {
                    function setActive() {
                        var path = $location.path();
                        if (path) {
                            angular.forEach(element.find('li'), function (li) {
                                var anchor = li.querySelector('a');
                                if (anchor.href.match('#' + path + '(?=\\?|$)')) {
                                    angular.element(li).addClass('active');
                                } else {
                                    angular.element(li).removeClass('active');
                                }
                            });
                        }
                    }

                    setActive();

                    scope.$on('$locationChangeSuccess', setActive);
                }
            }
        }]);
}());
INVOISE.directive('myUpload', function() {
    return {
        link: function postLink(scope, element, attrs) {
            element.find("input").bind("change", function(changeEvent) {
                var reader = new FileReader();
                reader.onload = function(loadEvent) {
                    scope.$apply(function() {
                        scope[attrs.key] = loadEvent.target.result;
                    });
                }
                if (typeof(changeEvent.target.files[0]) === 'object') {
                    reader.readAsDataURL(changeEvent.target.files[0]);
                };
            });

        },
        controller: 'CreateProductCtrl',
        template:
        '<span class="btn btn-success fileinput-button">' +
        '<i class="glyphicon glyphicon-plus"></i>' +
        '<span>Replace Image</span>' +
        '<input type="file" accept="image/*" name="files[]" multiple="">' +
        '</span>',
        restrict: 'E'

    };
});
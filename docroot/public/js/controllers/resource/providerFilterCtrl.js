angular.module('app')

.controller('ProviderFilterController', ['$scope', '$filter', '$sce', '$rootScope', '$timeout', 'FilteredResults',
                         function(  $scope,   $filter,   $sce,   $rootScope ,  $timeout,   FilteredResults) {  

  var self = this;

  // Init event emitter
  FilteredResults.resultEvent();

  var filteredProviderTypes = [
    'Center',
    'Group Home',
    'Slot Contractor',
    'Non-Relative In-Home',
    'Non-Relative Out-of-Home',
    'Relative In-Home',
    'Relative Out-of-Home'
  ];

  // Function subscribes to results change
  $scope.respondFilterChange = function(scope) {
    $scope.$on('resultChange', function(event, data){
      $timeout(function () {
        scope.$apply(function () {
          // var filteredProviderTypes = [];

          // // Loop over filtered data set and get unique set of types.
          // for (var i=0; i<data.results.length; i++) {
          //   // Check if type is in providerType array.
          //   if (filteredProviderTypes.indexOf(data.results[i].ProviderTypeDescription) == -1) {
          //     filteredProviderTypes.push(data.results[i].ProviderTypeDescription);
          //   }
          // }

           scope.providerTypes = filteredProviderTypes;
        });
      }) 
    });
  }

  $scope.filterClick = function(event, filterType, value) {
    event.preventDefault();
    var filters = {};
    filters[filterType] = [];
    // Get active items if applicable
    if(filteredResults.activeFilters[filterType]) {
      filters[filterType] = filteredResults.activeFilters[filterType]
    }
    // Already active ?
    var index = filters[filterType].indexOf(value);
    if(index !== -1) {
      filters = filters[filterType].splice(index, 1);
    }
    else {
      filters[filterType].push(value);
    }
    filteredResults.setFilters(filters);
  };

  $scope.filterActive = function(filterType, value) {
    if(filteredResults.activeFilters[filterType] && filteredResults.activeFilters[filterType].indexOf(value) !== -1) {
      return true;
    }
    return false;
  }

}]);
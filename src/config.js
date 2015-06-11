angular.module('EStore').config(function(lockerProvider){
	
	//	Setting default driver and namespace
	lockerProvider.setDefaultDriver('local')
		  .setDefaultNamespace('EStore');
	
});

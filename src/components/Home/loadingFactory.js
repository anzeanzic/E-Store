angular.module('EStore').factory('LoadingFactory', function() {
	return {
		loading: false,
		errorNotification: false,
		ShowSpinner: function() {
			this.loading = true;
		},
		HideSpinner: function() {
			this.loading = false;
		},
		ShowErrorNotification: function() {
			this.errorNotification = true;
		},
		HideErrorNotification: function() {
			this.errorNotification = false;
		}
	}
});
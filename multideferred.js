
(function($) {
    
    $.MultiDeferred = function(func) {
        var deferred = new $.Deferred(func),
            conditions = [],
            started = false,
            resolve;
        
        var checkResolve = function() {
            if (started && conditions.length === 0) {
                resolve();
            }
        }
        
        $.extend(this, deferred);
        resolve = this.resolve;
        $.extend(this, {
            addCondition: function() {
                if (started) {
                    $.error("Cannot add condition to a started handler");
                }
                var callback = function() {
                    var key = conditions.indexOf(callback);
                    if (key != -1) {
                        conditions.splice(key, 1);
                    }
                    checkResolve();
                }
                conditions.push(callback);
                return callback;
            },
            resolve: function() {
                started = true;
                checkResolve();
            }
        });
        
        
    }
    
})(jQuery);
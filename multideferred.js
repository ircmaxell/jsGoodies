
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
            }
        });
        
        
    }
    
    
    var def = new $.MultiDeferred();
    
    def.done(function() {
        console.log('done');
    })
    
    setTimeout(def.addCondition(), 500);
    setTimeout(def.addCondition(), 1000);
    setTimeout(def.addCondition(), 1500);
    setTimeout(def.addCondition(), 2000);
    setTimeout(def.addCondition(), 2500);
    setTimeout(def.addCondition(), 3000);
    setTimeout(def.addCondition(), 3500);
    setTimeout(def.addCondition(), 4000);
    setTimeout(def.addCondition(), 4500);
    setTimeout(def.addCondition(), 5000);
    setTimeout(def.addCondition(), 5500);
    setTimeout(def.addCondition(), 6000);
    setTimeout(def.addCondition(), 6500);
    setTimeout(def.addCondition(), 7000);
    setTimeout(def.addCondition(), 7500);
    
    def.resolve();
})(jQuery);
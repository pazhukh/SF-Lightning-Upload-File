({
	handleUploadImage : function(component, event, helper) {
        var file = event.getSource().get('v.files')[0];

        if (file.size > 1000000) {
            component.set('v.file', null);
            alert('Please upload file less than 1MB');
            
            return;
        }
        
		component.set('v.file', file);
    },
    
    attachImageToRecord : function(component, event, helper) {
        var file = component.get('v.file');
        
        if (!$A.util.isEmpty(file)) {
            helper.attachImage(component, event, helper, file);
        } else {
            alert('Please upload file');
        }
    },
})
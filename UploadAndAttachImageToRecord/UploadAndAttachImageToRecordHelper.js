({
	attachImage : function(component, event, helper, file) {
    	var recordId = '5000X00001ei2X3QAI';
        var reader = new FileReader();
        var self = this;

        reader.onload = $A.getCallback(()=> {
            var action = component.get('c.uploadImage');
            action.setParams({
                doc : encodeURIComponent(reader.result),
                fileName : file.name,
                recordId : recordId
            });

            action.setCallback(this, (response)=> {
                var state = response.getState();

                if (state === 'SUCCESS') {
                    alert('Cover image uploaded');
                } else {
                    alert('Cover image upload failed');
                }
            });

            $A.enqueueAction(action);
        });

        reader.readAsDataURL(file);
	}
})
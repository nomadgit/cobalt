cobalt.tizen_adapter={
	//
	//TIZEN ADAPTER
	//
	init:function(){
		//add the object that will talk to tizen to the current webpage
		$('body').prepend('<object id="Tizen" type="application/x-tizen-jsbridge" width="0" height="0" style="position:absolute;"></object>');

		cobalt.navigate=this.navigate;
		cobalt.defaultBehaviors.initStorage(); //cause we need it for push !

		cobalt.platform="Tizen";
	},
	//Navigate to an other page or do some special navigation actions
	//See doc for guidelines.
	navigate:function(navigationType, navigationPageName, navigationClassId){
		switch (navigationType){
			case "push":
				if (navigationPageName){
					if ( cobalt.checkDependency('storage') ){
						var pushNumber= cobalt.storage.getItem('cobalt_pushNumber','int') || 0;
						pushNumber++;
						cobalt.storage.setItem('cobalt_pushNumber',pushNumber)
						cobalt.send({ type:"navigation", action:"push", data : { page  : navigationPageName, controller: navigationClassId, pushNumber :pushNumber} });
					}
				}
			break;
			case "pop":
				cobalt.send({ type: "navigation", action : "pop"});
			break;
			case "modale":
				if (navigationPageName){
					cobalt.adapter.navigateToModale(navigationPageName, navigationClassId);
				}
			break;
			case "dismiss":
				cobalt.adapter.dismissFromModale();
			break;
		}
	},
	
	// handle events sent by native side
    handleEvent:function(json){
		cobalt.log("----received : "+JSON.stringify(json), false)
		if (cobalt.userEvents && typeof cobalt.userEvents[json.event] === "function"){
			cobalt.userEvents[json.event](json.data,json.callback);
	    }else{
	        switch (json.event){
		        case "onBackButtonPressed":
				    cobalt.log('sending OK for a native back')
			        cobalt.sendCallback(json.callback,{value : true});
			    break;
	        }
        }
    },
    //send native stuff
    send:function(obj){
        if (obj && cobalt.sendingToNative){
        	cobalt.log('----sending :'+JSON.stringify(obj), false)
	        try{	        	
				var jsondata = {name:"HPNativeBridge", data:obj};
				Tizen.requestToNative(JSON.stringify(jsondata));        
			}catch (e){
		        cobalt.log('cant connect to native : '+e, false)
	        }
        }
    },
	//default behaviours
    handleCallback : cobalt.defaultBehaviors.handleCallback,
    navigateToModale : cobalt.defaultBehaviors.navigateToModale,
	dismissFromModale : cobalt.defaultBehaviors.dismissFromModale,
	initStorage : cobalt.defaultBehaviors.initStorage
};
cobalt.adapter=cobalt.tizen_adapter;
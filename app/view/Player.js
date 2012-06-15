
Ext.define('sponsorPanel' ,{
	extend:'Ext.Img',
	xtype: 'sponsorPanel',
	config :
	{
		xtype:'Image',		
		
		style:'-webkit-background-size: contain;background-position:center;',
		listeners: 
		{
			tap: function(){goToSponsorTab();},		
			painted : function(panel) {
				Ext.Ajax.request({
					url:'kindasfw.json',
					success: function (response){
						imagesJson=Ext.JSON.decode(response.responseText);
						sponsorPanel=panel;
						rotateImage();
						setInterval(rotateImage,10000);
					},
				});			
			}
		}
	}
});

function goToSponsorTab() 
{
	var child=Ext.getCmp('Sponsors');
	var par =child.getParent() 
	par.setActiveItem(child);

}


var imagesJson;
var imagesIndex=0;
var sponsorPanel;
var rotateImage=function(){
	if (imagesIndex>=imagesJson.length){imagesIndex=0}
	sponsorPanel.setSrc(imagesJson[imagesIndex].url);
	imagesIndex+=1;
};




var IsHigh =true ;
Ext.define('qualityButton', {
	extend:'Ext.Button', 	
	xtype: 'qualityButton',
	
	config:{
		cls: ["qualirtButton"],
		text: 'High',
		handler:function(){
			var container = this.getParent();
			var audio = container.down('audio');	
			if (IsHigh)
			{
				alert('debug high');
				audio.setUrl(audioStreamUrl.low);
				this.setText('Low');
				IsHigh =false;
			}
			else 		
			{
				alert('debug low');
				audio.setUrl(audioStreamUrl.high);
				this.setText('High');
				IsHigh =true;
			}
		}
	}
});

var audioStreamUrl;


Ext.define('playerButton', {
	extend: 'Ext.Button',
	xtype:'playerButton',
	
	config:{
		iconCls: 'arrow_right',
		iconMask: true,		
		cls: ["playerButton"],
		pressedCls : 'playerButton-button-pressing',
	},
	action:'togglePlay'
});

Ext.define('playerPanel', {  
	extend: 'Ext.Container',
	xtype: 'playerPanel',
    config :{
		layout: 'hbox',
	    items: [		
			{
				xtype: 'playerButton',
				flex:1,
				
				listeners        : {
					painted : function(button) {
					Ext.Ajax.request({
						url:'json.json',
						success: function (response){
							audioStreamUrl = Ext.JSON.decode(response.responseText);
							var container = button.getParent();
							audio =container.down('audio');
							audio.setUrl(audioStreamUrl.high);
						}
					}) 					
					}
				}	
			},
			{
			xtype: 'sponsorPanel',
			flex:4,
			},
			{
				xtype: 'qualityButton',
				flex:1,
				
				listeners        : {
					painted : function(button) {
					Ext.Ajax.request({
						url:'json.json',
						success: function (response){
							audioStreamUrl = Ext.JSON.decode(response.responseText);
							var container = button.getParent();
							audio =container.down('audio');
							audio.setUrl(audioStreamUrl.high);
						}
					}) 					
					}
				}	
			},
			
			
			{
				xtype : 'audio',
				//hidden: true,
				url   : '',
				flex:3
			}
		]
	}
});

Ext.define("CRWeb.view.Player", {
    extend: 'Ext.Panel',
	
	xtype: 'Player',	
    config:
	{
		items:
		[
			{
				xtype:'playerPanel'
			}
		],
    }
});

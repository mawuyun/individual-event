new Vue({
	el:".container",
	data:{
		addressData:[],
		showNum:3,
		currentindex:0,
		shipingMethods:0,
	},
	mounted:function(){
		var _this = this;
		_this.$nextTick(function(){
			_this.getAddressData();
		});
		
	},
	computed:{
		filterAddress:function(){//控制地址显示数量
			return this.addressData.slice(0,this.showNum);
		}
	},
	methods:{
		getAddressData:function(){//获取地址数据
			var _this = this;
			_this.$http.get('data/address.json').then(function(data){
				console.log(data.data.result);
				_this.addressData = data.data.result;
			},
			function(error){
				console.log(error);
			})
		},
		changeIndex:function(item,index){//设置地址选中 
			this.currentindex = index;
		},
		setDefault:function(item,addressID){//设为默认地址
			this.addressData.forEach(function(product,index){
				if(product.addressId == addressID){
					product.isDefault = true;
				}else{
					product.isDefault = false;
				}
			});
		}
	}
	
})
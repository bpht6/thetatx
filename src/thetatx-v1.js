class thetatx {
    constructor(array){
        this.array = array;
    }
    buildtx(){

        if (this.array['txType'] == 11) {

	    this.transaction = "0bf8";
	    this.ben = String(this.array['beneficiary']).toLowerCase().slice(2);
	    this.nounce = Number(this.array['sequence']);
	    this.split =  Number(this.array['split']);
	    this.node = String(this.array['node']).toLowerCase().slice(2);
	    this.nounce = this.nounce.toString(16).padStart(2, '0');
	    this.split = this.split.toString(16).padStart(2, '0');
	    this.p1 = "66";
	    this.p2 = "4b";
	    this.totalData = "83";
	    this.tAdd = 40;
	    this.totalNounce = "5c";
	    this.count = 0;
            this.nounce = this.num2byte(this.nounce);
	    if (Number(this.array['split']) == 0){this.split = "80";}else{
	    this.split = this.num2byte(this.split);}
	    this.nounceData2 = (218 + (this.nounce.length - 2)/2).toString(16); 
	    this.nounceLength = (this.nounce.length / 2) - 1; 
	    this.splitLength = (this.split.length / 2) - 1;
	    this.count = this.nounceLength + this.splitLength;
	    if (this.count == 1){ this.tAdd = 41; this.p1 = "67"; this.p2 = "4c"; this.totalData = "84"; }
	    if (this.count == 2){ this.tAdd = 42; this.p1 = "68"; this.p2 = "4d"; this.totalData = "85"; }
	    if (this.count == 3){ this.tAdd = 43; this.p1 = "69"; this.p2 = "4e"; this.totalData = "86";}
	    if (this.count == 4){ this.tAdd = 44; this.p1 = "6a"; this.p2 = "4f"; this.totalData = "87";}
	    if (this.count == 5){ this.tAdd = 45; this.p1 = "6b"; this.p2 = "50"; this.totalData = "88";}
	    if (this.count == 6){ this.tAdd = 46; this.p1 = "6c"; this.p2 = "51"; this.totalData = "89";}
	    if (this.count == 7){ this.tAdd = 47; this.p1 = "6d"; this.p2 = "52"; this.totalData = "8a";}
	    if (this.count == 8){ this.tAdd = 48; this.p1 = "6e"; this.p2 = "53"; this.totalData = "8b";}
	    if (this.count == 9){ this.tAdd = 49; this.p1 = "6f"; this.p2 = "54"; this.totalData = "8c";}
	    if (this.count == 10){ this.tAdd = 50; this.p1 = "70"; this.p2 = "55"; this.totalData = "8d";}    
	    this.transaction = this.transaction.concat(this.tAdd,"ca80880429d069189e0000",this.nounceData2,"94",this.node,"c28080",this.nounce,"80d894",this.ben,"c28080",this.split);
	    this.datatx = "0x876d61696e6e6574".concat(this.transaction);
	    this.transactionEth = {
    		nonce: 0,
    		gasPrice: 0,
    		gasLimit: 0,
    		to: "0x0000000000000000000000000000000000000000",
    		value: 0,
    		data:  this.datatx,
	    }
	    return this.transactionEth;
	    
	}

	if (this.array['txType'] == 2) {
	    if (this.array['theta'] > 0 && this.array['tfuel'] == 0){
		this.nounce = this.num2byte(Number(this.array['sequence']).toString(16));
		this.nounceLength = this.nounce.length / 2;
		if (Number.isInteger(Number(this.array['theta'])) == true){
			this.theta = BigInt(this.array['theta']) * BigInt(Math.pow(10, 18));
		}else{
			this.index = String(this.array['theta']).indexOf(".");
			this.index = String(this.array['theta']).slice(this.index).length;
			this.theta = (BigInt(Math.round(Number(this.array['theta'])* Math.pow(10, this.index))) * BigInt(Math.pow(10, 18)))/ BigInt(Math.pow(10, this.index));		
		}
		this.theta = this.num2byte(this.theta.toString(16));
		this.thetaLength = (this.theta.length - 2)/2;
		this.transaction = (72+this.thetaLength * 2 + this.nounceLength).toString(16).concat("ca80880429d069189e0000",(226+this.thetaLength+this.nounceLength).toString(16),(225+this.thetaLength+this.nounceLength).toString(16),"94",this.array['from'].toLowerCase().slice(2),(202+this.thetaLength).toString(16),this.theta,"880429d069189e0000",this.nounce,"80",(217+this.thetaLength).toString(16),(216+this.thetaLength).toString(16),"94",this.array['to'].toLowerCase().slice(2),(194+this.thetaLength).toString(16),this.theta,"80");
		this.datatx = "0x876d61696e6e657402f8".concat(this.transaction);
	    }
	    if (this.array['tfuel'] > 0 && this.array['theta'] == 0){

		this.nounce = this.num2byte(Number(this.array['sequence']).toString(16));
		this.nounceLength = this.nounce.length / 2;
		if (Number.isInteger(Number(this.array['tfuel'])) == true){
			this.tfuel = BigInt(this.array['tfuel']) * BigInt(Math.pow(10, 18));
		}else{
			this.index = String(this.array['tfuel']).indexOf(".");
			this.index = String(this.array['tfuel']).slice(this.index).length;
			this.tfuel = (BigInt(Math.round(this.array['tfuel']* Math.pow(10, this.index))) * BigInt(Math.pow(10, 18)))/ BigInt(Math.pow(10, this.index));
		}
		this.tfuel = this.num2byte(this.tfuel.toString(16));
		this.tfuelLength = (this.tfuel.length - 2)/2;
		if (Number.isInteger(Number(this.array['tfuel'])) == true){
			this.tfuelNumber = BigInt(300000000000000000) + (BigInt(this.array['tfuel']) * BigInt(Math.pow(10, 18)));
		}else{
			this.index = String(this.array['tfuel']).indexOf(".");
			this.index = String(this.array['tfuel']).slice(this.index).length;
			this.tfuelNumber = (BigInt(Math.round(this.array['tfuel']* Math.pow(10, this.index))) * BigInt(Math.pow(10, 18)))/ BigInt(Math.pow(10, this.index))+ BigInt(300000000000000000) ;
		}
		this.tfuelNumber = this.num2byte(this.tfuelNumber.toString(16));
		this.tfuelNumberLength = (this.tfuelNumber.length - 2)/2;
		this.transaction = (64+this.tfuelNumberLength+this.tfuelLength+this.nounceLength).toString(16).concat("ca80880429d069189e0000",(218+this.tfuelNumberLength+this.nounceLength).toString(16),(217+this.tfuelNumberLength+this.nounceLength).toString(16),"94",this.array['from'].toLowerCase().slice(2),(194+this.tfuelNumberLength).toString(16),"80",this.tfuelNumber,this.nounce,"80",(217+this.tfuelLength).toString(16),(216+this.tfuelLength).toString(16),"94",this.array['to'].toLowerCase().slice(2),(194+this.tfuelLength).toString(16),"80",this.tfuel);
		this.datatx = "0x876d61696e6e657402f8".concat(this.transaction);
	    }

	    if (this.array['tfuel'] > 0 && this.array['theta'] > 0){
		this.nounce = this.num2byte(Number(this.array['sequence']).toString(16));
		this.nounceLength = this.nounce.length / 2;
		if (Number.isInteger(Number(this.array['theta'])) == true){
			this.theta = BigInt(this.array['theta']) * BigInt(Math.pow(10, 18));
		}else{
			this.index = String(this.array['theta']).indexOf(".");
			this.index = String(this.array['theta']).slice(this.index).length;
			this.theta = (BigInt(Math.round(Number(this.array['theta'])* Math.pow(10, this.index))) * BigInt(Math.pow(10, 18)))/ BigInt(Math.pow(10, this.index));		
		}
		this.theta = this.num2byte(this.theta.toString(16));
		this.thetaLength = (this.theta.length - 2)/2;
		if (Number.isInteger(Number(this.array['tfuel'])) == true){
			this.tfuel = BigInt(this.array['tfuel']) * BigInt(Math.pow(10, 18));
		}else{
			this.index = String(this.array['tfuel']).indexOf(".");
			this.index = String(this.array['tfuel']).slice(this.index).length;
			this.tfuel = (BigInt(Math.round(this.array['tfuel']* Math.pow(10, this.index))) * BigInt(Math.pow(10, 18)))/ BigInt(Math.pow(10, this.index));
		}
		this.tfuel = this.num2byte(this.tfuel.toString(16));
		this.tfuelLength = (this.tfuel.length - 2)/2;
		if (Number.isInteger(Number(this.array['tfuel'])) == true){
			this.tfuelNumber = BigInt(300000000000000000) + (BigInt(this.array['tfuel']) * BigInt(Math.pow(10, 18)));
		}else{
			this.index = String(this.array['tfuel']).indexOf(".");
			this.index = String(this.array['tfuel']).slice(this.index).length;
			this.tfuelNumber = (BigInt(Math.round(this.array['tfuel']* Math.pow(10, this.index))) * BigInt(Math.pow(10, 18)))/ BigInt(Math.pow(10, this.index))+ BigInt(300000000000000000) ;
		}
		this.tfuelNumber = this.num2byte(this.tfuelNumber.toString(16));
		this.tfuelNumberLength = (this.tfuelNumber.length - 2)/2;
		this.transaction = (64+this.tfuelNumberLength+this.tfuelLength+this.nounceLength+this.thetaLength*2).toString(16).concat("ca80880429d069189e0000",(218+this.nounceLength+this.thetaLength+this.tfuelNumberLength).toString(16),(217+this.nounceLength+this.thetaLength+this.tfuelNumberLength).toString(16),"94",this.array['from'].toLowerCase().slice(2),(194+this.thetaLength+this.tfuelNumberLength).toString(16),this.theta,this.tfuelNumber,this.nounce,"80",(217+this.tfuelLength+this.thetaLength).toString(16),(216+this.tfuelLength+this.thetaLength).toString(16),"94",this.array['to'].toLowerCase().slice(2),(194+this.tfuelLength+this.thetaLength).toString(16),this.theta,this.tfuel);
		this.datatx = "0x876d61696e6e657402f8".concat(this.transaction);
	    }
	    this.transactionEth = {
    		nonce: 0,
    		gasPrice: 0,
    		gasLimit: 0,
    		to: "0x0000000000000000000000000000000000000000",
    		value: 0,
    		data: this.datatx,
	    }
	    return this.transactionEth;	
	}

	if (this.array['txType'] == 9) {
	    this.nounce = this.num2byte(Number(this.array['sequence']).toString(16));
	    this.nounceLength = this.nounce.length / 2;
	    if ("edge".localeCompare(this.array["type"]) == 0){this.nodeType = "02";}
	    if ("guardian".localeCompare(this.array["type"]) == 0){this.nodeType = "01";}
	    if ("validator".localeCompare(this.array["type"]) == 0){this.nodeType = "80";}
	    this.datatx = "0x876d61696e6e657409f8".concat((64+this.nounceLength-1).toString(16),"ca80880429d069189e0000",(218+this.nounceLength-1).toString(16),"94",this.array['from'].toLowerCase().slice(2),"c28080",this.nounce,"80d894",this.array['node'].toLowerCase().slice(2),"c28080",this.nodeType);
	    this.transactionEth = {
    		nonce: 0,
    		gasPrice: 0,
    		gasLimit: 0,
    		to: "0x0000000000000000000000000000000000000000",
    		value: 0,
    		data: this.datatx,
	    }
	    return this.transactionEth;	
	}
	if (this.array['txType'] == 10) {
	    this.nounce = this.num2byte(Number(this.array['sequence']).toString(16).padStart(2, '0'));
	    this.nounceLength = this.nounce.length / 2;
	    if (Number.isInteger(Number(this.array['stake'])) == true){
			this.stake = BigInt(this.array['stake']) * BigInt(Math.pow(10, 18));
		}else{
			this.index = String(this.array['stake']).indexOf(".");
			this.index = String(this.array['stake']).slice(this.index).length;
			this.stake = (BigInt(Math.round(this.array['stake'] * Math.pow(10, this.index))) * BigInt(Math.pow(10, 18)))/ BigInt(Math.pow(10, this.index));
		}
            this.stake = this.num2byte(this.stake.toString(16));
 	    this.stakeLength = this.stake.length / 2;
	    if ("edge".localeCompare(this.array["type"]) == 0){this.nodeType = "02";}
	    if ("guardian".localeCompare(this.array["type"]) == 0){this.nodeType = "01";}
	    if ("guardian".localeCompare(this.array["type"]) == 0){
	    	this.datatx = "0x876d61696e6e65740af9".concat((62+this.stakeLength+this.nounceLength+214).toString(16).padStart(4,'0'),"ca80880429d069189e0000",(217+this.stakeLength+this.nounceLength-1).toString(16),"94",this.array['from'].toLowerCase().slice(2),(193+this.stakeLength).toString(16),this.stake,"80",this.nounce,"80d894",this.array['node'].toLowerCase().slice(2,42),"c28080",this.nodeType,"b0",this.array['node'].toLowerCase().slice(42,138),"b860",this.array['node'].toLowerCase().slice(138,330),"b841",this.array['node'].toLowerCase().slice(330,460));
	    }
	    if ("edge".localeCompare(this.array["type"]) == 0){
	    	this.datatx = "0x876d61696e6e65740af9".concat((62+this.stakeLength+this.nounceLength+214).toString(16).padStart(4,'0'),"ca80880429d069189e0000",(217+this.stakeLength+this.nounceLength-1).toString(16),"94",this.array['from'].toLowerCase().slice(2),(193+this.stakeLength).toString(16),"80",this.stake,this.nounce,"80d894",this.array['node'].toLowerCase().slice(2,42),"c28080",this.nodeType,"b0",this.array['node'].toLowerCase().slice(42,138),"b860",this.array['node'].toLowerCase().slice(138,330),"b841",this.array['node'].toLowerCase().slice(330,460));
	    }
	    this.transactionEth = {
    		nonce: 0,
    		gasPrice: 0,
    		gasLimit: 0,
    		to: "0x0000000000000000000000000000000000000000",
    		value: 0,
    		data: this.datatx,
	    }
	    return this.transactionEth;	
	}

	if (this.array['txType'] == 7) {
	     this.nounce = this.num2byte(Number(this.array['sequence']).toString(16));
	    this.nounceLength = this.nounce.length / 2;
	    if (Number.isInteger(Number(this.array['tfuel'])) == true){
		this.tfuel = BigInt(this.array['tfuel']) * BigInt(Math.pow(10, 18));
	    }else{
		this.index = String(this.array['tfuel']).indexOf(".");
		this.index = String(this.array['tfuel']).slice(this.index).length;
		this.tfuel = (BigInt(Math.round(this.array['tfuel']* Math.pow(10, this.index))) * BigInt(Math.pow(10, 18)))/ BigInt(Math.pow(10, this.index));
	    }
	    this.tfuel = this.num2byte(this.tfuel.toString(16));
    	    this.tfuelLength = this.tfuel.length / 2;
	    if (this.tfuel == 0){this.tfuel = 80; this.tfuelLength = 1;}
	    if (Number.isInteger(Number(this.array['gasPrice'])) == true){
		this.gasPrice = BigInt(this.array['gasPrice']) * BigInt(Math.pow(10, 18));
	    }else{
		this.index = String(this.array['gasPrice']).indexOf(".");
		this.index = String(this.array['gasPrice']).slice(this.index).length;
		this.gasPrice = (BigInt(Math.round(this.array['gasPrice']* Math.pow(10, this.index))) * BigInt(Math.pow(10, 18)))/ BigInt(Math.pow(10, this.index));
	    }     
	    this.gasPrice = this.num2byte((this.gasPrice).toString(16));
    	    this.gasPriceLength = this.gasPrice.length / 2;
	    this.gasLimit = this.num2byte(Number(this.array["gasLimit"]).toString(16));
    	    this.gasLimitLength = this.gasLimit.length / 2;
	    this.data = String(this.array['data']).toLowerCase().slice(2)
	    this.dataLength = this.data.length / 2;
	    this.dataLength2 = (this.dataLength+128).toString(16);
	    this.start = "f8"
	    this.dataLength3 = 0;
	    if (this.dataLength > 55){
		this.dataLengthHex = this.dataLength.toString(16);
		this.dataLengthHexcount = this.dataLengthHex.length / 2;
		if (Number.isInteger(this.dataLengthHexcount) == false){
            	    this.dataLengthHex = "0".concat(this.dataLengthHex);
	  	    this.dataLengthHexcount = this.dataLengthHexcount + .5;
		}
		if (this.dataLengthHexcount == 1){
			this.dataLength2 = "b8".concat(this.dataLengthHex);
			this.dataLength3 = 1;
		}	
		if (this.dataLengthHexcount == 2){
			this.dataLength2 = "b9".concat(this.dataLengthHex);
			this.dataLength3 = 2;
		}
		if (this.dataLengthHexcount == 3){
			this.dataLength2 = "ba".concat(this.dataLengthHex);
			this.dataLength3 = 3;
		}	
	    }
 	    this.start2 = (52+this.tfuelLength+this.nounceLength-1+this.gasPriceLength+this.gasLimitLength+this.dataLength+this.dataLength3).toString(16);
	    this.start2Length = this.start2.length;
            if (this.start2Length > 2){
	        this.start = "f9";
		this.countBytes = this.start2Length / 2;
		if (Number.isInteger(this.countBytes) == false){
            	    this.start2 = "0".concat(this.start2);
		}
	    }

 	    this.datatx = "0x876d61696e6e657407".concat(this.start,this.start2,(216+this.tfuelLength+this.nounceLength).toString(16),"94",this.array['from'].toLowerCase().slice(2),(193+this.tfuelLength).toString(16),"80",this.tfuel,this.nounce,"80d894",this.array['to'].toLowerCase().slice(2),"c28080",this.gasLimit,this.gasPrice,this.dataLength2,this.data);
	    this.transactionEth = {
    		nonce: 0,
    		gasPrice: 0,
    		gasLimit: 0,
    		to: "0x0000000000000000000000000000000000000000",
    		value: 0,
    		data: this.datatx,
	    }
	    return this.transactionEth;	
	}

    }
    rawtx(signed){
	if (this.array['txType'] == 11) {
 	    this.ben = String(this.array['beneficiary']).toLowerCase().slice(2);
	    this.nounce = Number(this.array['sequence']);
	    this.split =  Number(this.array['split']);
	    this.node = String(this.array['node']).toLowerCase().slice(2);
	    this.nounce = this.nounce.toString(16).padStart(2, '0');
	    this.split = this.split.toString(16).padStart(2, '0');
	    this.nounce = this.num2byte(this.nounce);
	    if (Number(this.array['split']) == 0){this.split = "80";}else{
	    this.split = this.num2byte(this.split);}
            this.nounceLength = (this.nounce.length )/2; 
	    if (this.nounceLength == 1) {this.totalNounce = "5c";}
	    if (this.nounceLength == 2) {this.totalNounce = "5d";}
	    if (this.nounceLength == 3) {this.totalNounce = "5e";}
	    if (this.nounceLength == 4) {this.totalNounce = "5f";}
	    if (this.nounceLength == 5) {this.totalNounce = "60";}
	    this.splitLength = (this.split.length - 2)/2;
	    this.signatureLocation = 58 + this.datatx.length;
	    this.sig3 = parseInt(signed.slice(this.signatureLocation,this.signatureLocation+2),16);
	    if (this.sig3 == 27){this.sig3 = "00"};
    	    if (this.sig3 == 28){this.sig3 = "01"};
	    this.adjust = 0;
	    this.firstSig = parseInt(signed.slice(this.signatureLocation+2,this.signatureLocation+4),16);
	    if (this.firstSig == 159) {this.adjust = 2;}
	    if (this.firstSig == 158) {this.adjust = 4;}
	    if (this.firstSig == 157) {this.adjust = 6;}
	    this.sig1 = signed.slice(this.signatureLocation + 4 ,this.signatureLocation + 68 - this.adjust);
	    this.sig2 = signed.slice(this.signatureLocation + 70 - this.adjust,this.signatureLocation + 134 - this.adjust);
	        if (this.adjust == 2) {this.sig1 = "00".concat(this.sig1);}
		if (this.adjust == 4) {this.sig1 = "0000".concat(this.sig1);}
		if (this.adjust == 6) {this.sig1 = "000000".concat(this.sig1);}
	    if (this.sig2.length < 64) {
		this.sigCount = 64 - this.sig2.length;
		if (this.sigCount == 2) {this.sig2 = "00".concat(this.sig2);}
		if (this.sigCount == 4) {this.sig2 = "0000".concat(this.sig2);}
		if (this.sigCount == 6) {this.sig2 = "000000".concat(this.sig2);}
	    }
            this.rawtransaction = "ca80880429d069189e0000f8".concat(this.totalNounce,"94",this.node,"c28080",this.nounce,"b841",this.sig1,this.sig2,this.sig3,"d894",this.ben,"c28080",this.split);
            this.rawlength = (this.rawtransaction.length / 2).toString(16);
	    return "0x0bf8".concat(this.rawlength,this.rawtransaction);
	}

	if (this.array['txType'] == 2) {
	    if (Number.isInteger(Number(this.array['theta'])) == true){
			this.theta = BigInt(this.array['theta']) * BigInt(Math.pow(10, 18));
		}else{
			this.index = String(this.array['theta']).indexOf(".");
			this.index = String(this.array['theta']).slice(this.index).length;
			this.theta = (BigInt(Math.round(Number(this.array['theta'])* Math.pow(10, this.index))) * BigInt(Math.pow(10, 18)))/ BigInt(Math.pow(10, this.index));		
		}
		this.theta = this.num2byte(this.theta.toString(16));
		this.thetaLength = (this.theta.length - 2)/2;
		if (Number.isInteger(Number(this.array['tfuel'])) == true){
			this.tfuel = BigInt(this.array['tfuel']) * BigInt(Math.pow(10, 18));
		}else{
			this.index = String(this.array['tfuel']).indexOf(".");
			this.index = String(this.array['tfuel']).slice(this.index).length;
			this.tfuel = (BigInt(Math.round(this.array['tfuel']* Math.pow(10, this.index))) * BigInt(Math.pow(10, 18)))/ BigInt(Math.pow(10, this.index));
		}
		this.tfuel = this.num2byte(this.tfuel.toString(16));
		this.tfuelLength = (this.tfuel.length - 2)/2;
		if (Number.isInteger(Number(this.array['tfuel'])) == true){
			this.tfuelNumber = BigInt(300000000000000000) + (BigInt(this.array['tfuel']) * BigInt(Math.pow(10, 18)));
		}else{
			this.index = String(this.array['tfuel']).indexOf(".");
			this.index = String(this.array['tfuel']).slice(this.index).length;
			this.tfuelNumber = (BigInt(Math.round(this.array['tfuel']* Math.pow(10, this.index))) * BigInt(Math.pow(10, 18)))/ BigInt(Math.pow(10, this.index))+ BigInt(300000000000000000) ;
		}
	    this.tfuelNumber = this.num2byte(this.tfuelNumber.toString(16));
	    this.tfuelNumberLength = (this.tfuelNumber.length - 2)/2;
 	    this.signatureLocation = 58 + this.datatx.length;
	    this.sig3 = parseInt(signed.slice(this.signatureLocation,this.signatureLocation+2),16);
	    if (this.sig3 == 27){this.sig3 = "00"};
    	    if (this.sig3 == 28){this.sig3 = "01"};
	    this.adjust = 0;
	    this.firstSig = parseInt(signed.slice(this.signatureLocation+2,this.signatureLocation+4),16);
	    if (this.firstSig == 159) {this.adjust = 2;}
	    if (this.firstSig == 158) {this.adjust = 4;}
	    if (this.firstSig == 157) {this.adjust = 6;}
	    this.sig1 = signed.slice(this.signatureLocation + 4 ,this.signatureLocation + 68 - this.adjust);
	    this.sig2 = signed.slice(this.signatureLocation + 70 - this.adjust,this.signatureLocation + 134 - this.adjust);
	        if (this.adjust == 2) {this.sig1 = "00".concat(this.sig1);}
		if (this.adjust == 4) {this.sig1 = "0000".concat(this.sig1);}
		if (this.adjust == 6) {this.sig1 = "000000".concat(this.sig1);}
	    if (this.sig2.length < 64) {
		this.sigCount = 64 - this.sig2.length;
		if (this.sigCount == 2) {this.sig2 = "00".concat(this.sig2);}
		if (this.sigCount == 4) {this.sig2 = "0000".concat(this.sig2);}
		if (this.sigCount == 6) {this.sig2 = "000000".concat(this.sig2);}
	    }
	    if (Number.isInteger(this.tfuelNumber.length /2) == false){this.tfuelNumber = "0".concat(this.tfuelNumber);}
	    if (this.array['theta'] > 0 && this.array['tfuel'] == 0){
		this.nounce = this.num2byte(Number(this.array['sequence']).toString(16));
	        this.nounceLength = this.nounce.length / 2;
		this.rawtransaction = "ca80880429d069189e0000f8".concat((101+this.thetaLength+this.nounceLength).toString(16),"f8",(99+this.thetaLength+this.nounceLength).toString(16),"94",this.array['from'].toLowerCase().slice(2),(202+this.thetaLength).toString(16),this.theta,"880429d069189e0000",this.nounce,"b841",this.sig1,this.sig2,this.sig3,(217+this.thetaLength).toString(16),(216+this.thetaLength).toString(16),"94",this.array['to'].toLowerCase().slice(2),(194+this.thetaLength).toString(16),this.theta,"80");
		this.rawlength = this.rawtransaction.length / 2;
		return "0x02f8".concat((this.rawlength).toString(16),this.rawtransaction);
	    }

	    if (this.array['tfuel'] > 0 && this.array['theta'] == 0){
		this.nounce = this.num2byte(Number(this.array['sequence']).toString(16));
	        this.nounceLength = this.nounce.length / 2;
		this.rawtransaction = "ca80880429d069189e0000f8".concat((93+this.nounceLength+this.tfuelNumberLength).toString(16),"f8",(91+this.nounceLength+this.tfuelNumberLength).toString(16),"94",this.array['from'].toLowerCase().slice(2),(194+this.tfuelNumberLength).toString(16),"80",this.tfuelNumber,this.nounce,"b841",this.sig1,this.sig2,this.sig3,(217+this.tfuelLength).toString(16),(216+this.tfuelLength).toString(16),"94",this.array['to'].toLowerCase().slice(2),(194+this.tfuelLength).toString(16),"80",this.tfuel);
		this.rawlength = this.rawtransaction.length / 2;
		return "0x02f8".concat((this.rawlength).toString(16),this.rawtransaction);
	    }

	    if (this.array['tfuel'] > 0 && this.array['theta'] > 0){
		this.nounce =this.num2byte( Number(this.array['sequence']).toString(16).padStart(2, '0'));
	        this.nounceLength = this.nounce.length / 2;
		this.rawtransaction = "ca80880429d069189e0000f8".concat((93+this.nounceLength+this.thetaLength+this.tfuelNumberLength).toString(16),"f8",(91+this.nounceLength+this.thetaLength+this.tfuelNumberLength).toString(16),"94",this.array['from'].toLowerCase().slice(2),(194+this.thetaLength+this.tfuelNumberLength).toString(16),this.theta,this.tfuelNumber,this.nounce,"b841",this.sig1,this.sig2,this.sig3,(217+this.tfuelLength+this.thetaLength).toString(16),(216+this.tfuelLength+this.thetaLength).toString(16),"94",this.array['to'].toLowerCase().slice(2),(194+this.tfuelLength+this.thetaLength).toString(16),this.theta,this.tfuel);
		this.rawlength = this.rawtransaction.length / 2;
		return "0x02f8".concat((this.rawlength).toString(16),this.rawtransaction);
	    }
	}
	if (this.array['txType'] == 9) {
	    this.nounce = this.num2byte(Number(this.array['sequence']).toString(16));
	    this.nounceLength = this.nounce.length / 2;
	    this.signatureLocation = 58 + this.datatx.length;
	    this.sig3 = parseInt(signed.slice(this.signatureLocation,this.signatureLocation+2),16);
	    if (this.sig3 == 27){this.sig3 = "00"};
    	    if (this.sig3 == 28){this.sig3 = "01"};
	    this.adjust = 0;
	    this.firstSig = parseInt(signed.slice(this.signatureLocation+2,this.signatureLocation+4),16);
	    if (this.firstSig == 159) {this.adjust = 2;}
	    if (this.firstSig == 158) {this.adjust = 4;}
	    if (this.firstSig == 157) {this.adjust = 6;}
	    this.sig1 = signed.slice(this.signatureLocation + 4 ,this.signatureLocation + 68 - this.adjust);
	    this.sig2 = signed.slice(this.signatureLocation + 70 - this.adjust,this.signatureLocation + 134 - this.adjust);
	        if (this.adjust == 2) {this.sig1 = "00".concat(this.sig1);}
		if (this.adjust == 4) {this.sig1 = "0000".concat(this.sig1);}
		if (this.adjust == 6) {this.sig1 = "000000".concat(this.sig1);}
	    if (this.sig2.length < 64) {
		this.sigCount = 64 - this.sig2.length;
		if (this.sigCount == 2) {this.sig2 = "00".concat(this.sig2);}
		if (this.sigCount == 4) {this.sig2 = "0000".concat(this.sig2);}
		if (this.sigCount == 6) {this.sig2 = "000000".concat(this.sig2);}
	    }
	    this.rawtransaction = "ca80880429d069189e0000f8".concat((92+this.nounceLength-1).toString(16),"94",this.array['from'].toLowerCase().slice(2),"c28080",this.nounce,"b841",this.sig1,this.sig2,this.sig3,"d894",this.array['node'].toLowerCase().slice(2),"c28080",this.nodeType);
		this.rawlength = this.rawtransaction.length / 2;
		return "0x09f8".concat((this.rawlength).toString(16),this.rawtransaction);
	}
	if (this.array['txType'] == 10) {
	    if ("edge".localeCompare(this.array["type"]) == 0){this.nodeType = "02";}
	    if ("guardian".localeCompare(this.array["type"]) == 0){this.nodeType = "01";}
	    this.nounce = this.num2byte(Number(this.array['sequence']).toString(16).padStart(2, '0'));
	    this.nounceLength = this.nounce.length / 2;
	    if (Number.isInteger(Number(this.array['tfuel'])) == true){
			this.stake = BigInt(this.array['stake']) * BigInt(Math.pow(10, 18));
		}else{
			this.index = String(this.array['stake']).indexOf(".");
			this.index = String(this.array['stake']).slice(this.index).length;
			this.stake = (BigInt(Math.round(this.array['stake']* Math.pow(10, this.index))) * BigInt(Math.pow(10, 18)))/ BigInt(Math.pow(10, this.index));
		}
	    this.stake = this.num2byte(this.stake.toString(16));
	    this.stakeLength = this.stake.length / 2;
	    this.signatureLocation = 62 + this.datatx.length;
	    this.sig3 = parseInt(signed.slice(this.signatureLocation,this.signatureLocation+2),16);
	    if (this.sig3 == 27){this.sig3 = "00"};
    	    if (this.sig3 == 28){this.sig3 = "01"};
	    this.adjust = 0;
	    this.firstSig = parseInt(signed.slice(this.signatureLocation+2,this.signatureLocation+4),16);
	    if (this.firstSig == 159) {this.adjust = 2;}
	    if (this.firstSig == 158) {this.adjust = 4;}
	    if (this.firstSig == 157) {this.adjust = 6;}
	    this.sig1 = signed.slice(this.signatureLocation + 4 ,this.signatureLocation + 68 - this.adjust);
	    this.sig2 = signed.slice(this.signatureLocation + 70 - this.adjust,this.signatureLocation + 134 - this.adjust);
	        if (this.adjust == 2) {this.sig1 = "00".concat(this.sig1);}
		if (this.adjust == 4) {this.sig1 = "0000".concat(this.sig1);}
		if (this.adjust == 6) {this.sig1 = "000000".concat(this.sig1);}
	    if (this.sig2.length < 64) {
		this.sigCount = 64 - this.sig2.length;
		if (this.sigCount == 2) {this.sig2 = "00".concat(this.sig2);}
		if (this.sigCount == 4) {this.sig2 = "0000".concat(this.sig2);}
		if (this.sigCount == 6) {this.sig2 = "000000".concat(this.sig2);}
	    }
	    if ("guardian".localeCompare(this.array["type"]) == 0){
	    	this.rawtransaction = "ca80880429d069189e0000f8".concat((90 + this.stakeLength + this.nounceLength).toString(16),"94",this.array['from'].toLowerCase().slice(2),(193 + this.stakeLength).toString(16),this.stake,"80",this.nounce,"b841",this.sig1,this.sig2,this.sig3,"d894",this.array['node'].toLowerCase().slice(2,42),"c28080",this.nodeType,"b0",this.array['node'].toLowerCase().slice(42,138),"b860",this.array['node'].toLowerCase().slice(138,330),"b841",this.array['node'].toLowerCase().slice(330,460));
    	    }
	    if ("edge".localeCompare(this.array["type"]) == 0){
	   	this.rawtransaction = "ca80880429d069189e0000f8".concat((90 + this.stakeLength + this.nounceLength).toString(16),"94",this.array['from'].toLowerCase().slice(2),(193 + this.stakeLength).toString(16),"80",this.stake,this.nounce,"b841",this.sig1,this.sig2,this.sig3,"d894",this.array['node'].toLowerCase().slice(2,42),"c28080",this.nodeType,"b0",this.array['node'].toLowerCase().slice(42,138),"b860",this.array['node'].toLowerCase().slice(138,330),"b841",this.array['node'].toLowerCase().slice(330,460));
	    }	
		this.rawlength = (this.rawtransaction.length ) / 2;
		return "0x0af9".concat((this.rawlength).toString(16).padStart(4, '0'),this.rawtransaction);
	}
	if (this.array['txType'] == 7) {
	    this.nounce = this.num2byte(Number(this.array['sequence']).toString(16));
	    this.nounceLength = this.nounce.length / 2;
	    if ("f8".localeCompare(signed.slice(2,4)) == 0){this.tranStart = 2; } 
	    if ("f9".localeCompare(signed.slice(2,4)) == 0){this.tranStart = 4; } 
	    if ("fa".localeCompare(signed.slice(2,4)) == 0){this.tranStart = 6; }

	    if ("b8".localeCompare(signed.slice(54+this.tranStart,56+this.tranStart)) == 0){this.tranStart2 = 2; } 
	    if ("b9".localeCompare(signed.slice(54+this.tranStart,56+this.tranStart)) == 0){this.tranStart2 = 4; } 
	    if ("ba".localeCompare(signed.slice(54+this.tranStart,56+this.tranStart)) == 0){this.tranStart2 = 6; }

 
	    this.signatureLocation = 54 + this.tranStart +this.tranStart2 + this.datatx.length;
	    this.sig3 = parseInt(signed.slice(this.signatureLocation,this.signatureLocation+2),16);
	    if (this.sig3 == 27){this.sig3 = "00"};
    	    if (this.sig3 == 28){this.sig3 = "01"};
	    this.adjust = 0;
	    this.firstSig = parseInt(signed.slice(this.signatureLocation+2,this.signatureLocation+4),16);
	    if (this.firstSig == 159) {this.adjust = 2;}
	    if (this.firstSig == 158) {this.adjust = 4;}
	    if (this.firstSig == 157) {this.adjust = 6;}
	    this.sig1 = signed.slice(this.signatureLocation + 4 ,this.signatureLocation + 68 - this.adjust);
	    this.sig2 = signed.slice(this.signatureLocation + 70 - this.adjust,this.signatureLocation + 134 - this.adjust);
	        if (this.adjust == 2) {this.sig1 = "00".concat(this.sig1);}
		if (this.adjust == 4) {this.sig1 = "0000".concat(this.sig1);}
		if (this.adjust == 6) {this.sig1 = "000000".concat(this.sig1);}
	    if (this.sig2.length < 64) {
		this.sigCount = 64 - this.sig2.length;
		if (this.sigCount == 2) {this.sig2 = "00".concat(this.sig2);}
		if (this.sigCount == 4) {this.sig2 = "0000".concat(this.sig2);}
		if (this.sigCount == 6) {this.sig2 = "000000".concat(this.sig2);}
	    }
	    if (Number.isInteger(Number(this.array['tfuel'])) == true){
	        this.tfuel = BigInt(this.array['tfuel']) * BigInt(Math.pow(10, 18));
	    }else{
  	    	this.index = String(this.array['tfuel']).indexOf(".");
	    	this.index = String(this.array['tfuel']).slice(this.index).length;
	    	this.tfuel = (BigInt(Math.round(this.array['tfuel']* Math.pow(10, this.index))) * BigInt(Math.pow(10, 18)))/ BigInt(Math.pow(10, this.index));
	    }
	    this.tfuel = this.num2byte(this.tfuel.toString(16));
    	    this.tfuelLength = this.tfuel.length / 2;
	    if (this.tfuel == 0){this.tfuel = 80; this.tfuelLength = 1;}
	    if (Number.isInteger(Number(this.array['gasPrice'])) == true){
		this.gasPrice = BigInt(this.array['gasPrice']) * BigInt(Math.pow(10, 18));
	    }else{
		this.index = String(this.array['gasPrice']).indexOf(".");
		this.index = String(this.array['gasPrice']).slice(this.index).length;
		this.gasPrice = (BigInt(Math.round(this.array['gasPrice']* Math.pow(10, this.index))) * BigInt(Math.pow(10, 18)))/ BigInt(Math.pow(10, this.index));
	    } 
	    this.gasPrice = this.num2byte(this.gasPrice.toString(16));
    	    this.gasPriceLength = this.gasPrice.length / 2;
	    this.gasLimit = Number(this.array["gasLimit"]).toString(16);
	    this.gasLimit = this.num2byte(this.gasLimit);
    	    this.gasLimitLength = this.gasLimit.length / 2;
	    this.data = String(this.array['data']).toLowerCase().slice(2)
	    this.dataLength = this.data.length / 2;
	    this.dataLength2 = (this.dataLength+128).toString(16);
	    this.start = "f8"
	    this.dataLength3 = 0;
	    this.start2 = (52+this.tfuelLength+this.nounceLength-1+this.gasPriceLength+this.gasLimitLength+this.dataLength).toString(16);
	    this.start2Length = this.start2.length;
            if (this.start2Length > 2){
	        this.start = "f9";
		this.countBytes = this.start2Length/2;
		if (Number.isInteger(this.countBytes) == false){
            	    this.number = "0".concat(this.start2);
		}
	    }
	    if (this.dataLength > 55){
		this.dataLengthHex = this.dataLength.toString(16);
		this.dataLengthHexcount = this.dataLengthHex.length / 2;
		if (Number.isInteger(this.dataLengthHexcount) == false){
            	    this.dataLengthHex = "0".concat(this.dataLengthHex);
	  	    this.dataLengthHexcount = this.dataLengthHexcount + .5;
		}
		if (this.dataLengthHexcount == 1){
			this.dataLength2 = "b8".concat(this.dataLengthHex);
			this.dataLength3 = 1;
		}	

		if (this.dataLengthHexcount == 2){
			this.dataLength2 = "b9".concat(this.dataLengthHex);
			this.dataLength3 = 2;
		}
		if (this.dataLengthHexcount == 3){
			this.dataLength2 = "ba".concat(this.dataLengthHex);
			this.dataLength3 = 3;
		}	
	    }
	    this.rawtransaction = "f8".concat((92+this.tfuelLength+this.nounceLength-2).toString(16),"94",this.array['from'].toLowerCase().slice(2),(194+this.tfuelLength-1).toString(16),"80",this.tfuel,this.nounce,"b841",this.sig1,this.sig2,this.sig3,"d894",this.array['to'].toLowerCase().slice(2),"c28080",this.gasLimit,this.gasPrice,this.dataLength2,this.data);
		this.rawlength = ((this.rawtransaction.length ) / 2).toString(16);
		this.rawlengthHex = (this.rawlength.toString()).length / 2;
		if (Number.isInteger(this.rawlengthHex) == false){
            	    this.rawlength = "0".concat(this.rawlength);
	  	    this.rawlengthHex = this.rawlengthHex + .5;
		}
		if (this.rawlengthHex == 1){
			this.rawlength = "f8".concat(this.rawlength);
		}	

		if (this.rawlengthHex == 2){
			this.rawlength = "f9".concat(this.rawlength);
		}
		if (this.rawlengthHex == 3){
			this.rawlength = "fa".concat(this.rawlength);
		}	

		return "0x07".concat((this.rawlength),this.rawtransaction);

	}

    }
    num2byte(number){
	this.count = number.length/2;
	this.number = number;
	if (Number.isInteger(this.count) == false){
            this.number = "0".concat(number);
	    this.count = this.count + .5;
	}
	if (this.count > 1) { 
	    this.location = (128 + this.count).toString(16);
	    return(this.location.concat(this.number));
	}else{ 
	    if (parseInt(this.number,16) > 127 && parseInt(this.number,16) < 256) {  this.number = "81".concat(this.number); }
	    if (number == 0){this.number == 80;}
	    return(this.number);

	}

    }

}

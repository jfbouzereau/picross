var fs = require("fs");

var filename = process.argv[2];
if(!filename) tilt("No filename");

var lines = fs.readFileSync(filename,"utf8").split("\n");

var NROW = lines[0].split(" ")[0]*1;
var NCOL = lines[0].split(" ")[1]*1;

var H = [];
for(var row=0;row<NROW;row++)
	H[row] = lines[row+1].split(" ").map(x=>x*1);

var V = [];
for(var col=0;col<NCOL;col++)
	V[col] = lines[col+NROW+1].split(" ").map(x=>x*1);

var G = [];
for(var row=0;row<NROW;row++)
	G[row]= fill(NCOL,-1);

if(0) {
console.log(NROW,NCOL);
console.log(H);
console.log(V);
}

run(0,0);

function run(row,col) {
	if(row>=NROW+NCOL-1) {
		console.log(G);
		return;
	}	
	if(col<0) {		
		return run(0,row);
	}	
	if(col>=NCOL) {
		return run(row+1,col-1);
	}
	if(row>=NROW) {
		return run(row+1,col-1);
	}	


	G[row][col] = 1;
	if(hcheck(row)) {
		if(vcheck(col)) {
			run(row+1,col-1);
		}
	}

	G[row][col] = 0;
	if(hcheck(row)) {
		if(vcheck(col)) {
			run(row+1,col-1);
		}
	}

	G[row][col] = -1;	
}

function hcheck(row) {
	var irun = -1;
	var lrun = 0;
	var state = 0;  // 0: space    1: mark


	for(var col=0;col<NCOL;col++) {

		if(G[row][col]<0) return true;

		if(state==0) {
			if(G[row][col]==1) {
				state = 1;
				irun++;
				if(irun>=H[row].length) return false;
				lrun=1;
				}
			}
		else if(state==1) {
			if(G[row][col]==1) {
				lrun++;
				if(lrun>H[row][irun]) return false;
				}
			if(G[row][col]==0) {
				if(lrun!=H[row][irun]) return false;
				state =  0;
				}
			}

		}

	if(state==1) {
		if(lrun!=H[row][irun]) return false;
	}

	if(irun!=H[row].length-1) return false;

	return true;
}



function vcheck(col) {
    var irun = -1;
    var lrun = 0;
    var state = 0;  // 0: space    1: mark


	for(var row=0;row<NROW;row++) {

		if(G[row][col]<0) return true;

        if(state==0) {
            if(G[row][col]==1) {
                state = 1;
                irun++;
                if(irun>=V[col].length) return false;
                lrun=1;
                }
            }
        else if(state==1) {
			if(G[row][col]==1) {
				lrun++;	
				if(lrun>V[col][irun]) return false;
			}
            if(G[row][col]==0) {
				if(lrun!=V[col][irun]) return false;
                state =  0;
                }
            }

        }

	if(state==1) {
		if(lrun!=V[col][irun]) return false;
	}

	if(irun!=V[col].length-1) return false;

    return true;
}

function fill(n,v) {
	return "x".repeat(n).split("").map(x=>v);
}

function tilt(msg) {
	console.error(msg);
	process.exit(1);
}



var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);


function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
    try
    {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var result = {};
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    if (query['cmd'] == 'calcDistance')
    {
      result =  calcDistance(query);
     res.write(JSON.stringify(result));

    }
    else if(query['cmd'] == 'calcCost')
    {
    result =  calcCost(query);
    res.write(JSON.stringify(result));
    }
    else if (query['cmd'] == undefined || query['cmd'] != 'calcDistance' || query['cmd'] != 'calcCost')
      throw Error("A  proper command must be specified. The Command " + query['cmd'] + " is not a valid");
    
  
       res.end('');
    }
catch (e)
  {
    var error = {'error' : e.message};
    res.write(JSON.stringify(error));
    res.end('');
  }
    }
  
//==============================================================================
function calcDistance(query)
{

 console.log(query);
 var final ={};

 if(isNaN(query['mpg']) || query['mpg'] <=0)
    throw Error('please enter a valid number for mpg');
 
 if(isNaN(query['fuelCost']) || query['fuelCost'] <=0)
    throw Error('please enter a valid number for fuelCost');
 
 if(isNaN(query['budget']) || query['budget'] <=0)
    throw Error('please enter a valid number for budget');
 
 final = {'distance': (query['mpg']/query['fuelCost'])*query['budget']};
 

 return final;
}

//==========================================================================
function calcCost(query)
{

 console.log(query);
 var final ={};

 if(isNaN(query['mpg']) || query['mpg'] <=0)
    throw Error('please enter a valid number for mpg');
 
 if(isNaN(query['fuelCost']) || query['fuelCost'] <=0)
    throw Error('please enter a valid number for fuelCost');
 
 if(isNaN(query['distance']) || query['distance'] <=0)
    throw Error('please enter a valid number for distance');
 
 final = {'distance': (query['distance']/query['mpg'])*query['fuelCost']};
 
 return final;
}

  













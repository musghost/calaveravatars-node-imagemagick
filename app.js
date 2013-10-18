	var http = require('http'),
		fs = require('fs'),
		im = require('./imagemagick'),
		qs = require('querystring');;

	http.createServer(function(req, res){

		if(req.method=='POST') {

			var body='';

			req.on('data', function (data) {
				body +=data;
			});

			req.on('end',function(){
				var POST =  qs.parse(body),
					colors = [
						"amarilla.png",
						"aqua.png",
						"morada.png",
						"roja.png"
					],
					url = [
						"ema/",
						"ciclista/"
					],
					color = colors[POST.cc],
					type = url[POST.cu],
					path = 'type/' + type + color,
					label = 'label:"' + POST.tx + '"',
					output = 'created/' + new Buffer(POST.cu + POST.cc + label).toString('base64') + ".png",
					response = {};
				im.convert([
						path,
						'(',
						'-gravity', 'center',
						'-pointsize','40',
						'-background', 'transparent',
						'-font', 'font.ttf',
						'-fill', '#dd61d0',
						'-pointsize', '40',
						label,
						'-virtual-pixel', 'transparent',
						'-distort', 'Arc', '30',
						'-geometry', '+50-50', ')',
						'-composite', output
					], 
					function(err, stdout){
						if (err) throw err;
						console.log('out:', output);
						response["success"] = true;
						response["url"] = output;
						res.writeHead(200, {"Content-Type": "text/plain", "Content-Length": JSON.stringify(response).length });
						//res.write("NOMAMEMSM");
						res.write(JSON.stringify(response));
						res.end();
						console.log("end");
						
					}
				);
			});

		}

		/*if(req)
			res.end();*/

	}).listen(3000);
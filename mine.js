var fs = require('fs'),
    im = require('./imagemagick');

var path = __dirname+'/sample-images/calaca.png';
var imdata = fs.readFileSync(path, 'binary');

/*im.convert([path, '(', '-background', 'none', '-font', 'font.ttf', '-fill', '#dd61d0', '-pointsize', '20', '-gravity', 'center', '-annotate', '+50-50', "'La puta que'", '+distort', 'Arc', '120', '-virtual-pixel', 'Background', ')', 'kittens-small.png'], 
  function(err, stdout){
    if (err) throw err;
    console.log('stdout:', stdout);
  }
);
*/
//241.122

im.convert([path, '(', '-gravity', 'center', '-pointsize', '40', '-background', 'transparent', '-font', 'font.ttf', '-fill', '#dd61d0', '-pointsize', '40', 'label:patrick', '-virtual-pixel', 'transparent', '-distort', 'Arc', '30', '-geometry', '+50-50', ')', '-composite', 'front2.png'], 
  function(err, stdout){
    if (err) throw err;
    console.log('stdout:', stdout);
  }
);
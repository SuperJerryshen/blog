var spawn = require('child_process').spawn;

var free = spawn('hexo', ['server', '-p 8083', '-l']);/* 其实就是等于执行hexo server -p 8083 -l*/

free.stdout.on('data', function (data) {

  console.log('standard output:\n' + data);

});

free.stderr.on('data', function (data) {

  console.log('standard error output:\n' + data);

});

free.on('exit', function (code, signal) {

  console.log('child process eixt ,exit:' + code);

});
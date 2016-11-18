var qiniu = require("qiniu");
var glob = require('glob');
var fs = require('fs');

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = '';
qiniu.conf.SECRET_KEY = '';

//要上传的空间 改为你所要的
var bucket = '';

//需要上传的目录和文件
var uploadDir = './public/**/*.{js,css,eot,svg,ttf,woff,png,jpg,jpeg}';

// 文件全局存储，错误时直接重复上传该文件
var globalFiles = [];
var globalIndex = 0;

//读取所需文件并上传
glob(uploadDir, function (err,file) {

    if(err) return err;
    file.forEach(function (f, idx) {
        var filePath = f;
        var key = f.substring(9);
        var token = uptoken(bucket, key);
		globalFiles.push({
			token : token,
			key : key,
			filePath : filePath
		});
		
        uploadFile(token, key, filePath);
    });
});

//获取每个文件返回token
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    return putPolicy.token();
}

//构造上传函数
function uploadFile(uptoken, key, localFile) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if(!err) {
            // 上传成功， 处理返回值
            console.log(ret.hash, ret.key);
			globalIndex++
	
		} else {
            // 上传失败， 处理返回代码
            console.log(err);
			var f = globalFiles[globalIndex];
			uploadFile(f.token,f.key,f.filePath)
        }
    });
}


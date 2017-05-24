const webpack = require("webpack");
const path = require("path");
var jF = path.resolve(__dirname,"js");
var bF = path.resolve(__dirname,"build");

var config={
    entry:{
        "index":jF+"/js1.js",
        "profile":jF+"/js2.js",
        "topic":jF+"/js3.js",
        "chat":jF+"/js4.js"
    },
    output:{
        filename:"[name]bundle.js",
        path:bF
        
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:"jQuery",
            jQuery:"jquery"
        })
    ]
    
    
    
};
module.exports=config;
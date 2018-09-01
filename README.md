# nemv
Node Express Mongo Bootstrap Vue Stack

## config file definition

    **cfg/cfg.js**

    '''javascript

    module.export = {
        db:{
          url : 'mongodb://NEMV:dksflcjs@nemv-shard-00-00-koypz.mongodb.net:27017,nemv-shard-00-01-koypz.mongodb.net:27017,nemv-shard-00-02-koypz.mongodb.net:27017/test?ssl=true&replicaSet=NEMV-shard-0&authSource=admin'
          //url : "mongodb://xxx.com:27170/xxx"
          //url : "mongodb_srv://id:pwd@hard-00-00-koypz.mongodb.net/yyy" // 3.6 avobe
        },    
        web: {
          //new  http, https, port. etc 
        },
    };
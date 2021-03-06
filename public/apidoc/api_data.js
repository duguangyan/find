define({ "api": [
  {
    "type": "get",
    "url": "/api/address/deleteById",
    "title": "根据ID删除地址",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>根据ID删除地址</p>",
    "name": "deleteById",
    "group": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>地址ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",   // 状态码\n    \"data\" : {id:13} // 返回删除的地址ID\n    \"msg\"  :\"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/address/deleteById"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/address.js",
    "groupTitle": "Address"
  },
  {
    "type": "post",
    "url": "/api/address/save",
    "title": "保存地址",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>保存</p>",
    "name": "save",
    "group": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "is_default",
            "defaultValue": "0",
            "description": "<p>是否设为默认</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "city_str",
            "description": "<p>地址字符串</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>省</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>市</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "district",
            "description": "<p>区</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lat",
            "description": "<p>经度</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lng",
            "description": "<p>纬度</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "consignee",
            "description": "<p>收货人</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobile",
            "description": "<p>手机</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "room",
            "description": "<p>详细地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "stall",
            "description": "<p>采购商名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "remark",
            "description": "<p>备注</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\" :\n    {\n\n        \"list\": [\n             {\n                \"id\": 1,                                        // 地址ID\n                   \"is_default\": 0,                                // 是否默认  0、不是 1、是\n                   \"city_str\": \"广东省广州市花都区\",                  // 省市区字符串\n                   \"province\": \"广东省\",                            // 省份\n                   \"city\": \"广州市\",                                // 城市\n                   \"district\": \"花都区\",                            // 区（县）\n                   \"lat\": 12.12,                                   // 经度\n                   \"lng\": 12.32,                                   // 维度\n                   \"consignee\": \"我是收货人\",                        // 收货人名称\n                   \"mobile\": \"15817395555\",                        // 联系电话\n                   \"room\": \"迎宾大道28号\",                           // 街道地址\n                   \"stall\": \"皮多多皮具\",                            // 公司或个人名称\n                   \"remark\": \"找料\",                                // 备注\n                   \"is_del\": 0,                                    // 是否软删除  0、否  1、是\n                   \"create_time\": \"2019-05-16 14:39:59\",           // 创建时间\n                   \"update_time\": \"2019-05-16 14:39:59\"            // 更新时间\n             }\n         ],\n     }\n    \"msg\":\"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/address/save"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/address.js",
    "groupTitle": "Address"
  },
  {
    "type": "get",
    "url": "/api/address/selectById",
    "title": "根据ID查询地址",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>根据ID查询地址</p>",
    "name": "selectById",
    "group": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>地址ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\" :\n    {\n\n        \"list\": [\n             {\n                \"id\": 1,                                        // 地址ID\n                   \"is_default\": 0,                                // 是否默认  0、不是 1、是\n                   \"city_str\": \"广东省广州市花都区\",                  // 省市区字符串\n                   \"province\": \"广东省\",                            // 省份\n                   \"city\": \"广州市\",                                // 城市\n                   \"district\": \"花都区\",                            // 区（县）\n                   \"lat\": 12.12,                                   // 经度\n                   \"lng\": 12.32,                                   // 维度\n                   \"consignee\": \"我是收货人\",                        // 收货人名称\n                   \"mobile\": \"15817395555\",                        // 联系电话\n                   \"room\": \"迎宾大道28号\",                           // 街道地址\n                   \"stall\": \"皮多多皮具\",                            // 公司或个人名称\n                   \"remark\": \"找料\",                                // 备注\n                   \"is_del\": 0,                                    // 是否软删除  0、否  1、是\n                   \"create_time\": \"2019-05-16 14:39:59\",           // 创建时间\n                   \"update_time\": \"2019-05-16 14:39:59\"            // 更新时间\n             }\n         ],\n     }\n    \"msg\":\"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/address/selectById"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/address.js",
    "groupTitle": "Address"
  },
  {
    "type": "get",
    "url": "/api/address/selectByUid",
    "title": "查询当前用户所有地址",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>查询当前用户所有地址</p>",
    "name": "selectByUid",
    "group": "Address",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\" :\n    {\n\n        \"list\": [\n             {\n                \"id\": 1,                                        // 地址ID\n                   \"is_default\": 0,                                // 是否默认  0、不是 1、是\n                   \"city_str\": \"广东省广州市花都区\",                  // 省市区字符串\n                   \"province\": \"广东省\",                            // 省份\n                   \"city\": \"广州市\",                                // 城市\n                   \"district\": \"花都区\",                            // 区（县）\n                   \"lat\": 12.12,                                   // 经度\n                   \"lng\": 12.32,                                   // 维度\n                   \"consignee\": \"我是收货人\",                        // 收货人名称\n                   \"mobile\": \"15817395555\",                        // 联系电话\n                   \"room\": \"迎宾大道28号\",                           // 街道地址\n                   \"stall\": \"皮多多皮具\",                            // 公司或个人名称\n                   \"remark\": \"找料\",                                // 备注\n                   \"is_del\": 0,                                    // 是否软删除  0、否  1、是\n                   \"create_time\": \"2019-05-16 14:39:59\",           // 创建时间\n                   \"update_time\": \"2019-05-16 14:39:59\"            // 更新时间\n             }\n         ],\n     }\n    \"msg\":\"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/address/selectByUid"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/address.js",
    "groupTitle": "Address"
  },
  {
    "type": "get",
    "url": "/api/address/show",
    "title": "查询所有地址",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>查询所有地址</p>",
    "name": "show",
    "group": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>page 第几页</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "size",
            "defaultValue": "10",
            "description": "<p>size 每页数量</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\" :\n    {\n         \"list\": [\n             {\n                \"id\": 1,                                        // 地址ID\n                   \"is_default\": 0,                                // 是否默认  0、不是 1、是\n                   \"city_str\": \"广东省广州市花都区\",                  // 省市区字符串\n                   \"province\": \"广东省\",                            // 省份\n                   \"city\": \"广州市\",                                // 城市\n                   \"district\": \"花都区\",                            // 区（县）\n                   \"lat\": 12.12,                                   // 经度\n                   \"lng\": 12.32,                                   // 维度\n                   \"consignee\": \"我是收货人\",                        // 收货人名称\n                   \"mobile\": \"15817395555\",                        // 联系电话\n                   \"room\": \"迎宾大道28号\",                           // 街道地址\n                   \"stall\": \"皮多多皮具\",                            // 公司或个人名称\n                   \"remark\": \"找料\",                                // 备注\n                   \"is_del\": 0,                                    // 是否软删除  0、否  1、是\n                   \"create_time\": \"2019-05-16 14:39:59\",           // 创建时间\n                   \"update_time\": \"2019-05-16 14:39:59\"            // 更新时间\n             }\n         ],\n         \"total\": 7,     // 总页数\n         \"page\": 1,      // 当前第几页\n         \"size\": 10      // 每页条数\n     }\n    \"msg\":\"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/address/show"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/address.js",
    "groupTitle": "Address"
  },
  {
    "type": "post",
    "url": "/api/address/updateById",
    "title": "根据ID更新地址",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>根据ID更新地址</p>",
    "name": "updateById",
    "group": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "is_default",
            "defaultValue": "0",
            "description": "<p>是否设为默认</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "city_str",
            "description": "<p>地址字符串</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>省</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>市</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "district",
            "description": "<p>区</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lat",
            "description": "<p>经度</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lng",
            "description": "<p>纬度</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "consignee",
            "description": "<p>收货人</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobile",
            "description": "<p>手机</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "room",
            "description": "<p>详细地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "stall",
            "description": "<p>采购商名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "remark",
            "description": "<p>备注</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\" :\n    {\n\n        \"list\": [\n             {\n                \"id\": 1,                                        // 地址ID\n                   \"is_default\": 0,                                // 是否默认  0、不是 1、是\n                   \"city_str\": \"广东省广州市花都区\",                  // 省市区字符串\n                   \"province\": \"广东省\",                            // 省份\n                   \"city\": \"广州市\",                                // 城市\n                   \"district\": \"花都区\",                            // 区（县）\n                   \"lat\": 12.12,                                   // 经度\n                   \"lng\": 12.32,                                   // 维度\n                   \"consignee\": \"我是收货人\",                        // 收货人名称\n                   \"mobile\": \"15817395555\",                        // 联系电话\n                   \"room\": \"迎宾大道28号\",                           // 街道地址\n                   \"stall\": \"皮多多皮具\",                            // 公司或个人名称\n                   \"remark\": \"找料\",                                // 备注\n                   \"is_del\": 0,                                    // 是否软删除  0、否  1、是\n                   \"create_time\": \"2019-05-16 14:39:59\",           // 创建时间\n                   \"update_time\": \"2019-05-16 14:39:59\"            // 更新时间\n             }\n         ],\n     }\n    \"msg\":\"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/address/updateById"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/address.js",
    "groupTitle": "Address"
  },
  {
    "type": "post",
    "url": "/api/address/updateByIsDefault",
    "title": "根据ID设置默认地址",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>根据ID设置默认地址</p>",
    "name": "updateByIsDefault",
    "group": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>地址ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\" : 1     // 修改的地址ID\n    \"msg\":\"成功\"    // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/address/updateByIsDefault"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/address.js",
    "groupTitle": "Address"
  },
  {
    "type": "get",
    "url": "/api/classify/find",
    "title": "获取全部分类",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>获取全部分类</p>",
    "name": "find",
    "group": "Classify",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n     \"data\": {\n       \"id\": 1,\n       \"name\": \"分类\",\n       \"pid\": 0,\n       \"create_time\": \"2019-05-06 10:07:47\",\n       \"update_time\": \"2019-05-06 10:07:49\",\n       \"children\": [\n           {\n               \"id\": 2,\n               \"name\": \"面料\",\n               \"pid\": 1,\n               \"create_time\": \"2019-05-05 15:45:52\",\n               \"update_time\": \"2019-05-05 15:45:54\",\n               \"children\": [\n                   {\n                       \"id\": 3,\n                       \"name\": \"皮料\",\n                       \"pid\": 2,\n                       \"create_time\": \"2019-05-05 15:46:28\",\n                       \"update_time\": \"2019-05-05 15:46:33\",\n                       \"children\": [\n                           {\n                               \"id\": 4,\n                               \"name\": \"羊皮\",\n                               \"pid\": 3,\n                               \"create_time\": \"2019-05-05 15:46:31\",\n                               \"update_time\": \"2019-05-05 15:46:35\",\n                               \"children\": [\n                                   {\n                                       \"id\": 10,\n                                       \"name\": \"1厘米\",\n                                       \"pid\": 4,\n                                       \"create_time\": \"2019-05-06 10:42:30\",\n                                       \"update_time\": \"2019-05-06 10:42:39\",\n                                       \"children\": []\n                                   },\n                                   {\n                                       \"id\": 11,\n                                       \"name\": \"2厘米\",\n                                       \"pid\": 4,\n                                       \"create_time\": \"2019-05-06 10:42:34\",\n                                       \"update_time\": \"2019-05-06 10:42:41\",\n                                       \"children\": []\n                                   },\n                                   {\n                                       \"id\": 12,\n                                       \"name\": \"3厘米\",\n                                       \"pid\": 4,\n                                       \"create_time\": \"2019-05-06 10:42:36\",\n                                       \"update_time\": \"2019-05-06 10:42:43\",\n                                       \"children\": []\n                                   }\n                               ]\n                           }\n                       ]\n                   }\n               ]\n           },\n           {\n               \"id\": 5,\n               \"name\": \"辅料\",\n               \"pid\": 1,\n               \"create_time\": \"2019-05-05 16:17:44\",\n               \"update_time\": \"2019-05-05 16:17:46\",\n               \"children\": [\n                   {\n                       \"id\": 8,\n                       \"name\": \"里布\",\n                       \"pid\": 5,\n                       \"create_time\": \"2019-05-05 17:47:30\",\n                       \"update_time\": \"2019-05-05 17:47:32\",\n                       \"children\": [\n                           {\n                               \"id\": 9,\n                               \"name\": \"色丁\",\n                               \"pid\": 8,\n                               \"create_time\": \"2019-05-05 17:47:34\",\n                               \"update_time\": \"2019-05-05 17:47:36\",\n                               \"children\": []\n                           }\n                       ]\n                   }\n               ]\n           },\n           {\n               \"id\": 6,\n               \"name\": \"五金\",\n               \"pid\": 1,\n               \"create_time\": \"2019-05-05 17:47:21\",\n               \"update_time\": \"2019-05-05 17:47:23\",\n               \"children\": []\n           },\n           {\n               \"id\": 7,\n               \"name\": \"其他\",\n               \"pid\": 1,\n               \"create_time\": \"2019-05-05 17:47:25\",\n               \"update_time\": \"2019-05-05 17:47:27\",\n               \"children\": []\n           }\n       ]\n   },\n    \"msg\"  : \"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/classify/find"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/classify.js",
    "groupTitle": "Classify"
  },
  {
    "type": "post",
    "url": "/api/common/load",
    "title": "图片上传",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>图片上传</p>",
    "name": "load",
    "group": "Common",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "img",
            "description": "<p>图片(必)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\" : \"http://nd.du1888.cn/public/upload/IYjfYFfCewPVusQC1557382532311.jpg\"  // 图片路径\n    \"msg\"  : \"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/common/load"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/load.js",
    "groupTitle": "Common"
  },
  {
    "type": "post",
    "url": "/api/order/delete",
    "title": "根据ID删除订单",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>根据ID删除订单</p>",
    "name": "delete",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>任务ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n     \"data\": [],\n    \"msg\"  : \"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/order/delete"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "/api/order/save",
    "title": "保存订单",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>保存订单</p>",
    "name": "save",
    "version": "1.0.0",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": false,
            "field": "id",
            "description": "<p>任务ids</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "address_id",
            "description": "<p>订单地址</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\": {id:[12132]},  // 返回任务ID\n    \"msg\"  : \"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/order/save"
      }
    ],
    "filename": "routes/api/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "get",
    "url": "/api/order/select",
    "title": "根据ID获取订单",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>根据ID获取订单</p>",
    "name": "select",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>任务ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n     \"data\": [\n           {\n               \"id\": 1,\n               \"uid\": 1,\n               \"cid\": 1，2，3,\n               \"desc\": \"描述描述描述描述描述描述\",\n               \"find_type\": 1,\n               \"task_type\": 1,\n               \"find_type_mode\": 1,\n               \"task_address_id\": 1,\n               \"imgs\": \"http://nd.du1888.cn/public/upload/IYjfYFfCewPVusQC1557382532311.jpg\",\n               \"checkType\": \"面料>皮料>马皮料\"\n           }\n       ],\n    \"msg\"  : \"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/order/select"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "get",
    "url": "/api/order/show",
    "title": "获取订单列表",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>获取订单列表</p>",
    "name": "show",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>第几页</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "size",
            "defaultValue": "10",
            "description": "<p>每页几条</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n     \"data\": [\n           {\n               \"id\": 1,\n               \"uid\": 1,\n               \"cid\": 1，2，3,\n               \"desc\": \"描述描述描述描述描述描述\",\n               \"find_type\": 1,\n               \"task_type\": 1,\n               \"find_type_mode\": 1,\n               \"task_address_id\": 1,\n               \"imgs\": \"http://nd.du1888.cn/public/upload/IYjfYFfCewPVusQC1557382532311.jpg\",\n               \"checkType\": \"面料>皮料>马皮料\"\n           }\n       ],\n    \"msg\"  : \"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/order/show"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "/api/order/updateById",
    "title": "根据ID更新订单",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>根据ID更新订单</p>",
    "name": "updateById",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "task_type",
            "description": "<p>任务类型1、立即找料2、立即取送</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "form_data",
            "description": "<p>任务内容</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "-cid",
            "description": "<p>form_data[i].cid 分类ID 例如: &quot;1,4,26&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "-checkType",
            "description": "<p>form_data[i].checkType 分类分类名称字符串 例如: &quot;面料&gt;皮料&gt;马毛皮&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "-find_type",
            "description": "<p>form_data[i].find_type 找料方式 1、图片找料 2、按样找料3、按描述找料</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "-find_type_mode",
            "description": "<p>form_data[i].find_type_mode 找料方式按样找料 1、上面取样 2、寄送样品</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "-desc",
            "description": "<p>form_data[i].desc 描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "-front_img",
            "description": "<p>form_data[i].front_img 图片集合 例如: [1.jpg,2.jpg]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "-fetch_num",
            "description": "<p>form_data[i].fetch_num 取送数量</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\": {id:[12132]},  // 返回任务ID\n    \"msg\"  : \"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/order/updateById"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "/api/order/updateByStatus",
    "title": "根据ID更新订单状态",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>根据ID更新订单状态</p>",
    "name": "updateByStatus",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>订单状态0、待支付1、待收货2、待评价3、已完成</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",    // 状态码\n    \"data\": 153,     // 返回更新状态后的任务ID\n    \"msg\"  : \"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/order/updateByStatus"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "/api/task/delete",
    "title": "删除任务",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>根据ID删除任务</p>",
    "name": "delete",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>任务ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n     \"data\": [],\n    \"msg\"  : \"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/task/delete"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/task.js",
    "groupTitle": "Task"
  },
  {
    "type": "post",
    "url": "/api/task/save",
    "title": "保存任务",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>保存任务</p>",
    "name": "save",
    "version": "1.0.0",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "task_type",
            "description": "<p>任务类型1、立即找料2、立即取送</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "form_data",
            "description": "<p>任务内容</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "-cid",
            "description": "<p>form_data[i].cid 分类ID 例如: &quot;1,4,26&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "-checkType",
            "description": "<p>form_data[i].checkType 分类分类名称字符串 例如: &quot;面料&gt;皮料&gt;马毛皮&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "-find_type",
            "description": "<p>form_data[i].find_type 找料方式 1、图片找料 2、按样找料3、按描述找料</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "-find_type_mode",
            "description": "<p>form_data[i].find_type_mode 找料方式按样找料 1、上面取样 2、寄送样品</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "-desc",
            "description": "<p>form_data[i].desc 描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "-front_img",
            "description": "<p>form_data[i].front_img 图片集合 例如: [1.jpg,2.jpg]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "-fetch_num",
            "description": "<p>form_data[i].fetch_num 取送数量</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\": {id:[12132]},  // 返回任务ID\n    \"msg\"  : \"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/task/save"
      }
    ],
    "filename": "routes/api/task.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/api/task/select",
    "title": "根据UID获取全部任务",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>根据UID获取全部任务</p>",
    "name": "select",
    "group": "Task",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n     \"data\": [\n           {\n               \"id\": 1,\n               \"uid\": 1,\n               \"cid\": 1，2，3,\n               \"desc\": \"描述描述描述描述描述描述\",\n               \"find_type\": 1,\n               \"task_type\": 1,\n               \"find_type_mode\": 1,\n               \"task_address_id\": 1,\n               \"imgs\": \"http://nd.du1888.cn/public/upload/IYjfYFfCewPVusQC1557382532311.jpg\",\n               \"checkType\": \"面料>皮料>马皮料\"\n           }\n       ],\n    \"msg\"  : \"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/task/select"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/task.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/api/task/show",
    "title": "获取全部任务",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>获取全部任务</p>",
    "name": "show",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>第几页</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "size",
            "defaultValue": "10",
            "description": "<p>每页几条</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n     \"data\": [\n           {\n               \"id\": 1,\n               \"uid\": 1,\n               \"cid\": 1，2，3,\n               \"desc\": \"描述描述描述描述描述描述\",\n               \"find_type\": 1,\n               \"task_type\": 1,\n               \"find_type_mode\": 1,\n               \"task_address_id\": 1,\n               \"imgs\": \"http://nd.du1888.cn/public/upload/IYjfYFfCewPVusQC1557382532311.jpg\",\n               \"checkType\": \"面料>皮料>马皮料\"\n           }\n       ],\n    \"msg\"  : \"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/task/show"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/task.js",
    "groupTitle": "Task"
  },
  {
    "type": "post",
    "url": "/api/task/updateById",
    "title": "根据ID更新任务",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>根据ID更新任务</p>",
    "name": "updateById",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "task_type",
            "description": "<p>任务类型1、立即找料2、立即取送</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "form_data",
            "description": "<p>任务内容</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "-cid",
            "description": "<p>form_data[i].cid 分类ID 例如: &quot;1,4,26&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "-checkType",
            "description": "<p>form_data[i].checkType 分类分类名称字符串 例如: &quot;面料&gt;皮料&gt;马毛皮&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "-find_type",
            "description": "<p>form_data[i].find_type 找料方式 1、图片找料 2、按样找料3、按描述找料</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "-find_type_mode",
            "description": "<p>form_data[i].find_type_mode 找料方式按样找料 1、上面取样 2、寄送样品</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "-desc",
            "description": "<p>form_data[i].desc 描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "-front_img",
            "description": "<p>form_data[i].front_img 图片集合 例如: [1.jpg,2.jpg]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "-fetch_num",
            "description": "<p>form_data[i].fetch_num 取送数量</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\": {id:[12132]},  // 返回任务ID\n    \"msg\"  : \"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/task/updateById"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/task.js",
    "groupTitle": "Task"
  },
  {
    "type": "post",
    "url": "/api/user/delete",
    "title": "根据ID删除用户",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>根据ID删除用户</p>",
    "name": "delete",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>用户ID(必)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\" : null\n    \"msg\":\"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/user/delete"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/user/findByUnce",
    "title": "根据KEY查询用户",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>根据KEY查询用户</p>",
    "name": "findByUnce",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>查询字段名称(必)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>查询字段内容(必)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\" :\n     {\n         \"id\": 154,          // id\n         \"name\": \"杜光焱2\",   // 姓名\n         \"mobile\": \"11\",     // 手机号码\n         \"photo\": \"http://img.52z.com/upload/news/image/20180628/20180628064705_79123.jpg\",      // 头像图片地址\n         \"token\": \"nq7tCaoekrCBUB48FesDy8DsaSu9Cy8tWQZSv8lI1qw2r6HdW6NdlVG9X4C7RGwUWy4nsVa49DdkxKJwA56JNBcYwJoFCqgz1LWKC5gx9fv7\",      // token\n         \"create_time\": \"2019-04-21T02:43:48.000Z\",     // 创建时间\n         \"update_time\": \"2019-04-21T02:45:50.000Z\"      // 更新时间\n     }\n    \"msg\":\"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/user/findByUnce"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/login",
    "title": "用户登录",
    "description": "<p>用户登录</p>",
    "name": "login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>用户名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>登录验证码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\" : {\n        \"id\": 177,                 // id\n         \"name\": \"duguangyan1\",     // 账号名称\n         \"mobile\": \"15817390755\",   // 手机\n         \"photo\": \"http://b-ssl.duitang.com/uploads/item/201706/22/20170622131955_h4eZS.thumb.700_0.jpeg\",  // 头像图片\n         \"token\": \"nGWrMhK582C2HRXZuHGusXMWG5EDqLjmZdAQpltHwdD5FOJ7j9LC9GjqvJejfkxDCiGpNchGAawOMRAzNfPMsbM7hNEKJJG4EfHRRaLpGf59\",   //token\n         \"create_time\": \"2019-04-23 04:48:01\",   // 创建时间\n         \"update_time\": \"2019-04-23 04:48:01\"    // 更新时间\n    }\n    \"msg\":\"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/user/login"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/save",
    "title": "保存用户",
    "description": "<p>保存用户</p>",
    "name": "save",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>名称(必)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码(必)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\" : null\n    \"msg\":\"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/user/save"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/user/show",
    "title": "查询所有用户",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>查询所有用户</p>",
    "name": "show",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>page 第几页</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "size",
            "defaultValue": "10",
            "description": "<p>size 每页数量</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\" :\n    {\n         \"list\": [\n             {\n                 \"id\": 154,          // id\n                 \"name\": \"杜光焱2\",   // 姓名\n                 \"mobile\": \"11\",     // 手机号码\n                 \"photo\": \"http://img.52z.com/upload/news/image/20180628/20180628064705_79123.jpg\",      // 头像图片地址\n                 \"token\": \"nq7tCaoekrCBUB48FesDy8DsaSu9Cy8tWQZSv8lI1qw2r6HdW6NdlVG9X4C7RGwUWy4nsVa49DdkxKJwA56JNBcYwJoFCqgz1LWKC5gx9fv7\",      // token\n                 \"create_time\": \"2019-04-21T02:43:48.000Z\",     // 创建时间\n                 \"update_time\": \"2019-04-21T02:45:50.000Z\"      // 更新时间\n             }\n         ],\n         \"total\": 7,     // 总页数\n         \"page\": 1,      // 当前第几页\n         \"size\": 10      // 每页条数\n     }\n    \"msg\":\"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/user/show"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/update",
    "title": "更新用户信息",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>更新用户信息</p>",
    "name": "update",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>数据库字段名称(必)         例如: name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>修改值(必)             例如: &quot;小白&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "wherekey",
            "description": "<p>数据库字段名称(必)    例如: id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "wherevalue",
            "description": "<p>修改值(必)         例如: 1</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\" : null\n    \"msg\":\"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/user/update"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/updateByPhoto",
    "title": "用户修改头像",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>用户修改头像</p>",
    "name": "updateByName",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>头像地址</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\" : 153   // 修改名称的用户ID\n    \"msg\":\"成功\"    // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://find.du-u.top/api/user/updateByPhoto"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/updateByName",
    "title": "用户修改名称",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>用户修改名称</p>",
    "name": "updateByName",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>名称</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\" : 153   // 修改名称的用户ID\n    \"msg\":\"成功\"    // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://find.du-u.top/api/user/updateByName"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/updateByPassword",
    "title": "用户修改密码",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token验证登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"token\": \"2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS\" }",
          "type": "json"
        }
      ]
    },
    "description": "<p>用户修改密码</p>",
    "name": "updateByPassword",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "resPassword",
            "description": "<p>重复密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>登录验证码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\" : 153   // 修改密码的用户ID\n    \"msg\":\"成功\"    // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://nd.du1888.cn/api/user/updateByPassword"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/captcha/get-img-verify",
    "title": "获取登录验证码",
    "description": "<p>获取登录验证码</p>",
    "name": "get_img_verify",
    "group": "captcha",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "size",
            "defaultValue": "4",
            "description": "<p>验证码长度</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "width",
            "defaultValue": "80",
            "description": "<p>验证码宽度</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "height",
            "defaultValue": "40",
            "description": "<p>验证码高度</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "background",
            "defaultValue": "#f4f3f2",
            "description": "<p>验证码背景</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "noise",
            "defaultValue": "2",
            "description": "<p>验证码干扰线条数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "fontSize",
            "defaultValue": "32",
            "description": "<p>验证码字符大小</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "ignoreChars",
            "defaultValue": "0o1i",
            "description": "<p>验证码字符中排除</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\" : \"0\",  // 状态码\n    \"data\": {\n        img:\"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200>\"   // svg图片\n    },\n    \"msg\"  : \"成功\"   // 提示信息\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost/api/captcha/get-img-verify"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/api/captcha.js",
    "groupTitle": "captcha"
  }
] });

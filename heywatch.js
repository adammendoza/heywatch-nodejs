var assert = require('assert');
var restify = require('restify');
var HEYWATCH_URL = "https://heywatch.com"

module.exports = {

  cli: function(user, passwd) {
    this.jsonClient = this.createJsonClient(user, passwd);
    this.stringClient = this.createStringClient(user, passwd);

    return this;
  },

  account: function(callback) {
    this.request("/account", {method: "get"}, callback);
  },

  info: function(resource, id, callback) {
    this.request("/"+resource+"/"+id, {method: "get"}, callback);
  },

  all: function(resource, callback) {
    this.request("/"+resource, {method: "get"}, callback);
  },

  create: function(resource, params, callback) {
    this.request("/"+resource, {method: "post", params: params}, callback);
  },

  update: function(resource, id, params, callback) {
    this.request("/"+resource+"/"+id, {method: "put", params: params}, callback);
  },

  delete: function(resource, id, callback) {
    this.request("/"+resource+"/"+id, {method: "delete"}, callback);
  },

  request: function(resource, opts, callback) {
    if(opts.method == "get") {
      this.jsonClient.get(resource, function(err, req, res, obj) {
        assert.ifError(err);
        callback(obj);
      });
    } else if(opts.method == "delete") {
      this.jsonClient.del(resource, function(err, req, res, obj) {
        assert.ifError(err);
        callback(true);
      });
    } else if(opts.method == "post") {
      if(typeof(opts.params) == "string") {
        this.stringClient.post(resource, opts.params, function(err, req, res, data) {
          assert.ifError(err);
          callback(JSON.parse(data));
        });
      } else {
        this.jsonClient.post(resource, opts.params, function(err, req, res, obj) {
          assert.ifError(err);
          callback(obj);
        });
      }
    } else if(opts.method == "put") {
      this.jsonClient.put(resource, opts.params, function(err, req, res, obj) {
        assert.ifError(err);
        callback(true)
      });
    }
  },

  createJsonClient: function(user, passwd) {
    var client = restify.createJsonClient({
      url: HEYWATCH_URL
    });

    client.basicAuth(user, passwd);
    return client;
  },

  createStringClient: function(user, passwd) {
    var client = restify.createStringClient({
      url: HEYWATCH_URL,
      accept: "application/json"
    });

    client.basicAuth(user, passwd);
    return client;
  }
}
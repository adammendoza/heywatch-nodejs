# Client Library for encoding Videos with HeyWatch #

HeyWatch is a Video Encoding Web Service.

For more information:

* HeyWatch: http://www.heywatchencoding.com
* API Documentation: http://www.heywatchencoding.com/documentation
* Contact: [heywatch at particle-s.com](mailto:heywatch at particle-s.com)
* Twitter: [@heywatch](http://twitter.com/heywatch) / [@sadikzzz](http://twitter.com/sadikzzz)

## Install ##

``` console
npm install heywatch
```

## Usage ##

```js
var hw = require("heywatch").cli(username, passwd);

// get all your videos
hw.all("video", function(videos) {
  console.log(JSON.stringify(videos));
});

➔ [
    {
      "created_at": "2011-06-15T12:05:25+02:00",
      "title": "d41d8cd98f00b204e9800998ecf8427e",
      "specs": {
        "audio": {
          "sample_rate": 24000,
          "synched": true,
          "stream": 0.1,
          "codec": "aac",
          "bitrate": 0,
          "channels": 2
        },
        "size": 318,
        "thumb": "http://raw-2.heywatch.com/5978aa591569a2e5e47805c8c008b1a2/CGI.29806.0.jpg",
        "mime_type": "video/mp4",
        "video": {
          "stream": 0.0,
          "codec": "mpeg4",
          "container": "mov",
          "aspect": 1.33,
          "bitrate": 501,
          "height": 240,
          "length": 5,
          "fps": 0.0,
          "width": 320
        }
      },
      "updated_at": "2011-06-15T12:05:25+02:00",
      "id": 9662090
  }
]

// get information about a specific video
hw.info("video", 9662090);
```

### Create a download ###

```js
hw.create("download", {url: "http://site.com/yourvideo.mp4", title: "yourtitle"}, function(download) {
  console.log(JSON.stringify(download));
});

➔ {
  "created_at": "2011-06-15T19:00:11+02:00",
  "error_msg": null,
  "title": "yourtitle",
  "video_id": 0,
  "updated_at": "2011-06-15T19:00:11+02:00",
  "url": "http://site.com/yourvideo.mp4",
  "progress": {
    "current_length": 0,
    "speed": 0,
    "percent": 0,
    "time_left": "??"
  },
  "id": 4950011,
  "error_code": null,
  "length": 0,
  "status": "pending"
}
```

### Create a job ###

```js
hw.create("job", {video_id: 9662090, format_id: "ios_720p", ping_url: "http://yoursite.com/ping/heywatch?postid=123434", s3_directive: "s3://accesskey:secretkey@myvideobucket/ios/123434.mp4"}, function(job) {
  console.log(JSON.stringify(job));
});

➔ {
  "ping_url_after_encode": "http://yoursite.com/ping/heywatch?postid=123434",
  "cf_directive": null,
  "error_msg": null,
  "created_at": "2011-06-15T12:13:13+02:00",
  "video_id": 9662090,
  "updated_at": "2011-06-15T12:13:13+02:00",
  "progress": 0,
  "ping_url_if_error": null,
  "s3_directive": "s3://accesskey:secretkey@myvideobucket/flv/123434.flv",
  "format_id": 31,
  "id": 4944088,
  "error_code": null,
  "ftp_directive": null,
  "encoded_video_id": 0,
  "encoding_options": {
    "keep_video_size": true
  },
  "status": "pending",
  "http_upload_directive": null
}
```

### Delete a video ###

```js
hw.delete("video", 9662090, function(ok) {
  console.log("Deleted");
});

➔ Deleted
```

### Generating thumbnails ###

```js
// You'll receive the thumbnails to
// your s3 account and get pinged when it's done
hw.create("preview/thumbnails", {media_id: 9662142, number: 6, s3_directive: "s3://accesskey:secretkey@mybucket/thumbnails/", ping_url: "http://site.com/ping/heywatch/thumbs"}, function(ok) {
  // OK
})

### Errors ###

```js
hw.create("download", {url: "not_a_valid_url"});

assert.js:334
assert.ifError = function(err) { if (err) {throw err;}};
                                                 ^
BadRequestError: {"message":"Url is invalid"}
...


Released under the [MIT license](http://www.opensource.org/licenses/mit-license.php).
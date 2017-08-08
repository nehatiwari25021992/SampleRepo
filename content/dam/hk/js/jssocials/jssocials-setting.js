jsSocials.shares.email = {
   logo: "/content/dam/reference/en/js/jssocials/icons/message-2nd.png",
   shareUrl: "mailto:?subject={text}&body={url}",
   countUrl: ""
};

jsSocials.shares.twitter =  {
   logo: "/content/dam/reference/en/js/jssocials/icons/twitter-2nd.png",
   shareUrl: "https://twitter.com/share?url={url}&text={text}&via={via}&hashtags={hashtags}",
   countUrl: "https://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
   getCount: function(data) {
      return data.count;
   }
};

jsSocials.shares.facebook =  {
   logo: "/content/dam/reference/en/js/jssocials/icons/facebook-2nd.png",
   shareUrl: "https://facebook.com/sharer/sharer.php?u={url}",
   countUrl: function() {
      return "https://graph.facebook.com/fql?q=SELECT total_count FROM link_stat WHERE url='" + window.encodeURIComponent(this.url) + "'";
   },
   getCount: function(data) {
      return (data.data.length && data.data[0].total_count) || 0;
   }
};

jsSocials.shares.googleplus =  {
   logo: "/content/dam/reference/en/js/jssocials/icons/google-2nd.png",
   shareUrl: "https://plus.google.com/share?url={url}",
   countUrl: function() {
      return "https://cors-anywhere.herokuapp.com/https://plusone.google.com/_/+1/fastbutton?url="+ window.encodeURIComponent(this.url);
   },
   getCount: function(data) {
      return parseFloat((data.match(/\{c: ([.0-9E]+)/) || [])[1]);
   }
};

jsSocials.shares.linkedin =  {
   logo: "/content/dam/reference/en/js/jssocials/icons/linkedin-2nd.png",
   shareUrl: "https://www.linkedin.com/shareArticle?url={url}",
   countUrl: "https://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
   getCount: function(data) {
      return data.count;
   }
};


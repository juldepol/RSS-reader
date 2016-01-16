myApp.controller('urlController', ['$scope','FeedService',function($scope, Feed) {
    $scope.urls = [];
    $scope.channelsNum = $scope.urls.length;
    $scope.toggleUrl = {item: -1};
    $scope.toggleFeed = {item: -1};

    function isURL(text) {
      var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      return pattern.test(text);
    }

    function findIfMatch(url) {
      if ($scope.urls.indexOf(url) === -1) {
        return false;
      } else {
        return true;
      }
    }

    function transformText(t) {
      return t.toLowerCase().trim().replace(/ /g, "").replace(/[^a-z ]/g, "");
    }

    function array(t) {
      var alphabet = "abcdefghijklmnopqrstuvwxyz";
      var quantity = [];
      for (var i = 0; i < alphabet.length; i++) {
        quantity[i] = Math.floor((transformText(t).split(alphabet[i]).length - 1));
      }
      return quantity;
    }

    $scope.add = function(url) {
      if (!isURL(url)) {
        alert("URL is not valid!");
        $scope.customUrl = "";
      } else if (findIfMatch(url)) {
        alert("Such URL already exists!");
        $scope.customUrl = "";
      } else {
        $scope.url = url;
        $scope.urls.push(url);
        $scope.channelsNum = $scope.urls.length;
        $scope.customUrl = "";
      }
    };

    $scope.delete = function(url) {
      var urls = $scope.urls;
      urls.splice(urls.indexOf(url), 1);
      $scope.channelsNum = $scope.urls.length;

    };

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    $scope.loadFeed = function(url) {
      Feed.parseFeed(url).then(function(res) {
        $scope.feeds = res.data.responseData.feed.entries;
        var authorArray=[];
        for (var i = 0; i < $scope.feeds.length; i++) {
          authorArray[i]=$scope.feeds[i].author;
        }
        $scope.authorQuant=authorArray.filter(onlyUnique).length;
      });
    };

    $scope.loadMessage = function(feed) {
      var feeds = $scope.feeds;
      $scope.message = feeds[feeds.indexOf(feed)].contentSnippet;
      $scope.len = transformText($scope.message).length;
      google.load("visualization", "1", {packages: ["corechart"]});
      var quantity=array($scope.message);
      var data = google.visualization.arrayToDataTable([
        ['Letter', 'Quantity'],
        ['A', quantity[0]],
        ['B', quantity[1]],
        ['C', quantity[2]],
        ['D', quantity[3]],
        ['E', quantity[4]],
        ['F', quantity[5]],
        ['G', quantity[6]],
        ['H', quantity[7]],
        ['I', quantity[8]],
        ['J', quantity[9]],
        ['K', quantity[10]],
        ['L', quantity[11]],
        ['M', quantity[12]],
        ['N', quantity[13]],
        ['O', quantity[14]],
        ['P', quantity[15]],
        ['Q', quantity[16]],
        ['R', quantity[17]],
        ['S', quantity[18]],
        ['T', quantity[19]],
        ['U', quantity[20]],
        ['V', quantity[21]],
        ['W', quantity[22]],
        ['X', quantity[23]],
        ['Y', quantity[24]],
        ['Z', quantity[25]]
      ]);
      var options = {
        'title': 'Letters',
        'width': 400,
        'height': 250
      };
      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(data, options);
    };
  }
]);

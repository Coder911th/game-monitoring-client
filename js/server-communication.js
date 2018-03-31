/**** Тут всё, что касается коммуникации клиента с сервером  ****/
void function(ns) {
  var router = ns.router;

  ns.socket = events('wss://game-monitoring-server.herokuapp.com', {
    connection: function() {
      return ['getGamesList'];
    },
    close() {
      ns.socket.reconnect();
    },
    recieveGamesList: function(gamesList) {
      console.log(gamesList);
    },
    recieveGameData: function(servers) {
      console.log(servers);
      var markup = '';
      servers.forEach(function(server) {
        if (!server.online) return;
        markup += 
          '<tr>' +
            '<td>' + server.name + '</td>' +
            '<td>' + server.map + '</td>' +
            '<td>' + server.ip + ':' + server.port + '</td>' +
            '<td>' + (server.players + server.bots.length) + ' / ' + server.maxPlayers + '</td>' +
            '<td>' + server.password + '</td>' +
          '</tr>';
      });
      $('.servers-list').html(markup);
    },
    error(message) {
      console.log('[Error]\n', message, '\n[END]');
    }
  });

  // Первичная маршрутизация
  router();
  // Обрабатываем изменение машрута
  window.onhashchange = router;
  
}(monitoringNamespace);
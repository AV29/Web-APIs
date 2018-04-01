function notifyMe() {
  // Проверка поддерживаемости браузером уведомлений
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  }

  // Проверка разрешения на отправку уведомлений
  else if (Notification.permission === 'granted') {
    // Если разрешено то создаем уведомлений
    const options = {
      body: 'Ты сегодня проверял почту?',
      icon: ''
    };
    var notification = new Notification('Hi there!', options);
  }
  // В противном случает мы запрашиваем разрешение
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // Если пользователь разрешил, то создаем уведомление
      if (permission === 'granted') {
        const options = {
          body: 'Ты сегодня проверял почту?'
        };
        var notification = new Notification('Привет!', options);
      }
    });
  }

  notification.onclose = function () {
    this.close();
    const options = {
      body: 'Перестань кликать по мне. Вдруг там что-то важное. Проверь!!!',
      silent: true //Работает только в Chrome + In Chrome 62 and newer you cannot request notification api at all unless the site is https:// secured
    };
    var notification = new Notification('Эй!', options);

    notification.onclose = function () {
      const options = {
        body: 'Перестань закрывать меня. Я чувствую, что не проверил.',
        icon: 'tongueout.gif',
        silent: true //Работает только в Chrome + In Chrome 62 and newer you cannot request notification api at all unless the site is https:// secured
      };
      var notification = new Notification('Эй!', options);
    };
  };
}

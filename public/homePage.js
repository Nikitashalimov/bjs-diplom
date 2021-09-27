'use strict';

// Выход из личного кабинета
let logoutButton = new LogoutButton;
logoutButton.action = () => {
	ApiConnector.logout((response) => {
		if (response.success) {
			location.reload();
		}
	});
};

// Получение информации о пользователе
let current = ApiConnector.current((response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
})

// Получение текущих курсов валюты
let ratesBoard = new RatesBoard;
function getStocks() {
	ApiConnector.getStocks((response) => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	})
}
getStocks();
setInterval(getStocks, 60000);

// Операции с деньгами
let moneyManager = new MoneyManager;
//_Пополнение баланса
moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Баланс пополнен');
		} else {
			moneyManager.setMessage(false, `Ошибка: ${response.error}`);
		}
	});
}
//_Конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Конвертация выполнена успешно');
		} else {
			moneyManager.setMessage(false, `Ошибка: ${response.error}`);
		}
	});
}
//_перевод валюты
moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Перевод выполнен');
		} else {
			moneyManager.setMessage(false, `Ошибка: ${response.error}`);
		}
	});
}

// Работа с избранным
let favoritesWidget = new FavoritesWidget;
//_Запрос начального списка избранного
ApiConnector.getFavorites((response) => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
})
//_Добавление пользователя в список избранных
favoritesWidget.addUserCallback = ((data) => {
	ApiConnector.addUserToFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, 'Пользователь добавлен.');
		} else {
			favoritesWidget.setMessage(false, `Ошибка: ${response.error}`);
		}
	});
});
//_Удаление пользователя из списка избранных
favoritesWidget.removeUserCallback = ((data) => {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, 'Пользователь удален.');
		} else {
			favoritesWidget.setMessage(false, `Ошибка: ${response.error}`);
		}
	});
});
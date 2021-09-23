'use strict';

let form = new UserForm;

form.loginFormCallback = (data) => {
	ApiConnector.login(data, (response) => {
		if (response.ok === true) {
			location.reload();
		}
		else {
			form.setLoginErrorMessage('Возникла ошибка при входе');
		}
	});
}

form.registerFormCallback = (data) => {
	ApiConnector.register(data, (response) => {
		if (response.ok === true) {
			location.reload();
		}
		else {
			form.setRegisterErrorMessage('Возникла ошибка при регистрации нового пользователя');
		}
	});
}
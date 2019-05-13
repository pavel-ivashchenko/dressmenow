
import { currencyArr } from '@app/shared/models';

export const CURRENCY_CONSTANTS = {
	CURRENCY_API: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
	RISK_SURCHARGE: 10,
	DEFAULT_CURRENCY_INDEX: 1,
	DEFAULT_CURRENCY: currencyArr[0].uiValue,
	SNACKBAR_ALERTS: {
		apiNoResponse: 'Вибачте, наразі змінити валютні налаштування неможливо',
		defaultCurrencyIdxChange: 'Вибачте, змінити індекс базової валюти неможливо',
		customCurrencyDeleted: 'Ручні налаштування валютного індексу видалено'
  }
}

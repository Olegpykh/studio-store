const https = require('https');
const querystring = require('querystring');

// ПОДРОБНОЕ ОБЪЯСНЕНИЕ: Твои credentials
const CLIENT_ID = '9d205d04b7529d4b978c814aeaaaa0d9';
const CLIENT_SECRET = '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';
const SHOP = 'sportgear-dev-store';

// ПОДРОБНОЕ ОБЪЯСНЕНИЕ: Данные которые нужно отправить (ИЗ ОФИЦИАЛЬНОЙ ИНСТРУКЦИИ)
const postData = querystring.stringify({
  grant_type: 'client_credentials',
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET
});

// ПОДРОБНОЕ ОБЪЯСНЕНИЕ: Параметры POST запроса
const options = {
  hostname: `${SHOP}.myshopify.com`,
  port: 443,
  path: '/admin/api/2024-01/oauth/access_token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🔍 Отправляю запрос на Shopify...');
console.log('URL:', `https://${SHOP}.myshopify.com/admin/oauth/access_token`);
console.log('Данные:', postData);
console.log('---');

// ПОДРОБНОЕ ОБЪЯСНЕНИЕ: Выполняем POST запрос
const req = https.request(options, (res) => {
  let data = '';

  // ПОДРОБНОЕ ОБЪЯСНЕНИЕ: Собираем ответ по частям
  res.on('data', (chunk) => {
    data += chunk;
  });

  // ПОДРОБНОЕ ОБЪЯСНЕНИЕ: Когда получили весь ответ
  res.on('end', () => {
    console.log('📥 Ответ от Shopify получен!');
    console.log('Status:', res.statusCode);
    console.log('---');
    
    try {
      const jsonData = JSON.parse(data);
      
      // ПОДРОБНОЕ ОБЪЯСНЕНИЕ: Проверяем есть ли токен в ответе
      if (jsonData.access_token) {
        console.log('✅ УСПЕХ! Токен получен!');
        console.log('');
        console.log('Access Token:');
        console.log(jsonData.access_token);
        console.log('');
        console.log('Scope:', jsonData.scope);
        console.log('Expires in:', jsonData.expires_in, 'seconds');
        console.log('');
        console.log('--- КОПИРУЙ ВОТ ЭТОТ ТОКЕН ---');
        console.log(jsonData.access_token);
        console.log('--- В .env.local ---');
        console.log('NEXT_PUBLIC_SHOPIFY_TOKEN=' + jsonData.access_token);
      } else if (jsonData.error) {
        console.log('❌ ОШИБКА от Shopify!');
        console.log('Error:', jsonData.error);
        console.log('Error description:', jsonData.error_description);
      } else {
        console.log('❌ НЕОЖИДАННЫЙ ОТВЕТ!');
        console.log(JSON.stringify(jsonData, null, 2));
      }
    } catch (error) {
      console.log('❌ ОШИБКА: Не могу парсить JSON!');
      console.log('Ответ был:', data);
      console.log('Ошибка:', error.message);
    }
  });
});

// ПОДРОБНОЕ ОБЪЯСНЕНИЕ: Обработка ошибок сети
req.on('error', (error) => {
  console.error('💥 ОШИБКА СЕТИ!');
  console.error(error.message);
});

// ПОДРОБНОЕ ОБЪЯСНЕНИЕ: Отправляем данные
req.write(postData);
req.end();